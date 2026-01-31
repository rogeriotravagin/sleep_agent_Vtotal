/**
 * Pipeline Controller
 *
 * Orchestrates the full AIOS → Auto-Claude → Ralph pipeline
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { parse as parseYaml } from 'yaml';

import { AdapterFactory } from '../adapters/index.js';
import { RalphExecutor, RalphExecutorConfig } from '../adapters/ralph-executor.js';
import { WorktreeManager, WorktreeManagerConfig } from './worktree-manager.js';
import { RateLimiter, RateLimiterConfig } from './rate-limiter.js';
import type {
  IUnifiedTask,
  TaskStatus,
  IExecutionResult,
  IAiosStory,
} from '../adapters/interfaces/index.js';

export interface PipelineConfig {
  mode: 'sequential' | 'parallel' | 'hybrid';
  batchSize: number;
  batchDelay: number;
  retries: {
    maxAttempts: number;
    delay: number;
    exponentialBackoff: boolean;
  };
  validateBeforeExecution: boolean;
  validateAfterExecution: boolean;
  notifications: {
    onStart: boolean;
    onComplete: boolean;
    onError: boolean;
  };
}

export interface StackConfig {
  version: string;
  name: string;
  paths: {
    root: string;
    stack: string;
    aiosCore: string;
    autoClaude: string;
    ralph: string;
    worktrees: string;
    logs: string;
  };
  aios: {
    enabled: boolean;
    storiesPath: string;
    executableStatuses: string[];
  };
  autoClaude: {
    enabled: boolean;
    maxParallelAgents: number;
  };
  ralph: {
    enabled: boolean;
    scriptsPath: string;
    maxIterations: number;
    timeout: number;
  };
  rateLimiting: RateLimiterConfig;
  worktrees: WorktreeManagerConfig;
  pipeline: PipelineConfig;
}

export interface PipelineResult {
  taskId: string;
  success: boolean;
  phase: 'aios' | 'auto-claude' | 'ralph' | 'complete' | 'failed';
  execution?: IExecutionResult;
  error?: Error;
  duration: number;
}

type PipelineEventType = 'start' | 'phase' | 'progress' | 'complete' | 'error';

interface PipelineEvent {
  type: PipelineEventType;
  taskId?: string;
  phase?: string;
  message: string;
  data?: unknown;
}

type PipelineEventCallback = (event: PipelineEvent) => void;

export class Pipeline {
  private config: StackConfig;
  private adapters: AdapterFactory;
  private worktreeManager: WorktreeManager;
  private rateLimiter: RateLimiter;
  private executor: RalphExecutor;
  private eventCallbacks: PipelineEventCallback[] = [];
  private runningTasks: Map<string, IUnifiedTask> = new Map();

  constructor(config: StackConfig, repoRoot: string) {
    this.config = config;
    this.adapters = new AdapterFactory();

    // Initialize worktree manager
    this.worktreeManager = new WorktreeManager(config.worktrees, repoRoot);

    // Initialize rate limiter
    this.rateLimiter = new RateLimiter(config.rateLimiting);

    // Initialize Ralph executor
    const executorConfig: RalphExecutorConfig = {
      ralphDir: path.resolve(repoRoot, config.paths.ralph),
      scriptsPath: path.resolve(repoRoot, config.ralph.scriptsPath),
      defaultMaxIterations: config.ralph.maxIterations,
      defaultTimeout: config.ralph.timeout,
    };
    this.executor = new RalphExecutor(executorConfig);

    // Wire up executor progress to pipeline events
    this.executor.onProgress((progress) => {
      this.emit({
        type: 'progress',
        taskId: progress.taskId,
        phase: progress.phase,
        message: progress.message,
        data: progress,
      });
    });
  }

  /**
   * Load configuration from YAML file
   */
  static async loadConfig(configPath: string): Promise<StackConfig> {
    const content = await fs.readFile(configPath, 'utf-8');
    return parseYaml(content) as StackConfig;
  }

  /**
   * Process a single AIOS story through the pipeline
   */
  async processStory(storyPath: string): Promise<PipelineResult> {
    const startTime = Date.now();
    let taskId = '';

    try {
      this.emit({
        type: 'start',
        message: `Starting pipeline for story: ${storyPath}`,
      });

      // 1. Parse AIOS story
      this.emit({ type: 'phase', phase: 'aios', message: 'Parsing AIOS story' });
      const aiosAdapter = this.adapters.getAiosToSpec();
      const story = await aiosAdapter.parseStoryFile(storyPath);

      // Validate story
      if (this.config.pipeline.validateBeforeExecution) {
        const validation = await aiosAdapter.validate(story);
        if (!validation.valid) {
          throw new Error(`Story validation failed: ${validation.errors.map((e) => e.message).join(', ')}`);
        }
      }

      // 2. Convert to unified task
      const task = this.storyToTask(story, storyPath);
      taskId = task.id;
      this.runningTasks.set(taskId, task);

      this.emit({
        type: 'phase',
        taskId,
        phase: 'auto-claude',
        message: 'Creating worktree and PRD',
      });

      // 3. Create worktree
      const worktree = await this.worktreeManager.create(taskId);

      // 4. Generate PRD in worktree
      const prdAdapter = this.adapters.getAiosToPrd();
      const prd = await prdAdapter.convert(story);
      await prdAdapter.writePrd(prd, worktree.path);

      // 5. Acquire rate limit slot
      const rateResult = await this.rateLimiter.waitForSlot(taskId);
      if (!rateResult.allowed) {
        throw new Error(`Rate limit exceeded: ${rateResult.reason}`);
      }

      // 6. Execute with Ralph
      this.emit({
        type: 'phase',
        taskId,
        phase: 'ralph',
        message: 'Starting Ralph execution',
      });

      const execution = await this.executor.execute(task, worktree.path, {
        maxIterations: this.config.ralph.maxIterations,
        timeout: this.config.ralph.timeout,
      });

      // Report success/failure to rate limiter
      if (execution.success) {
        this.rateLimiter.reportSuccess(taskId);
      } else {
        this.rateLimiter.reportFailure(taskId);
      }

      // 7. Handle result
      const result: PipelineResult = {
        taskId,
        success: execution.success,
        phase: execution.success ? 'complete' : 'failed',
        execution,
        duration: Date.now() - startTime,
      };

      this.emit({
        type: 'complete',
        taskId,
        message: execution.success ? 'Pipeline completed successfully' : 'Pipeline failed',
        data: result,
      });

      this.runningTasks.delete(taskId);
      return result;
    } catch (error) {
      const result: PipelineResult = {
        taskId,
        success: false,
        phase: 'failed',
        error: error instanceof Error ? error : new Error(String(error)),
        duration: Date.now() - startTime,
      };

      this.emit({
        type: 'error',
        taskId,
        message: `Pipeline error: ${result.error?.message}`,
        data: result,
      });

      if (taskId) {
        this.runningTasks.delete(taskId);
        this.rateLimiter.reportFailure(taskId);
      }

      return result;
    }
  }

  /**
   * Process multiple stories
   */
  async processBatch(storyPaths: string[]): Promise<PipelineResult[]> {
    const results: PipelineResult[] = [];

    if (this.config.pipeline.mode === 'sequential') {
      // Sequential processing
      for (const storyPath of storyPaths) {
        const result = await this.processStory(storyPath);
        results.push(result);

        // Delay between tasks
        if (this.config.pipeline.batchDelay > 0) {
          await this.sleep(this.config.pipeline.batchDelay);
        }
      }
    } else {
      // Parallel processing with batch size limit
      const batches = this.chunkArray(storyPaths, this.config.pipeline.batchSize);

      for (const batch of batches) {
        const batchResults = await Promise.all(batch.map((path) => this.processStory(path)));
        results.push(...batchResults);

        // Delay between batches
        if (this.config.pipeline.batchDelay > 0) {
          await this.sleep(this.config.pipeline.batchDelay);
        }
      }
    }

    return results;
  }

  /**
   * Get pipeline status
   */
  getStatus(): {
    running: number;
    tasks: Array<{ id: string; status: TaskStatus }>;
    rateLimits: ReturnType<RateLimiter['getStatus']>;
  } {
    return {
      running: this.runningTasks.size,
      tasks: Array.from(this.runningTasks.values()).map((t) => ({
        id: t.id,
        status: t.status,
      })),
      rateLimits: this.rateLimiter.getStatus(),
    };
  }

  /**
   * Stop a running task
   */
  async stopTask(taskId: string): Promise<boolean> {
    const cancelled = await this.executor.cancel(taskId);
    if (cancelled) {
      this.runningTasks.delete(taskId);
    }
    return cancelled;
  }

  /**
   * Stop all running tasks
   */
  async stopAll(): Promise<number> {
    let stopped = 0;

    for (const taskId of this.runningTasks.keys()) {
      if (await this.stopTask(taskId)) {
        stopped++;
      }
    }

    return stopped;
  }

  /**
   * Register event callback
   */
  onEvent(callback: PipelineEventCallback): void {
    this.eventCallbacks.push(callback);
  }

  /**
   * Health check for all components
   */
  async healthCheck(): Promise<{
    healthy: boolean;
    components: Record<string, boolean>;
  }> {
    const components: Record<string, boolean> = {
      executor: await this.executor.healthCheck(),
      aiosPath: await this.pathExists(this.config.paths.aiosCore),
      ralphPath: await this.pathExists(this.config.paths.ralph),
      worktreesPath: await this.pathExists(this.config.paths.worktrees),
    };

    return {
      healthy: Object.values(components).every((v) => v),
      components,
    };
  }

  // ============================================
  // Private Methods
  // ============================================

  private storyToTask(story: IAiosStory, sourcePath: string): IUnifiedTask {
    const id = this.generateTaskId(story, sourcePath);

    return {
      id,
      title: story.story.action || 'Untitled Task',
      description: `As a ${story.story.role}, I want ${story.story.action} so that ${story.story.benefit}`,
      acceptanceCriteria: story.acceptanceCriteria.map((ac, i) => ({
        id: `AC-${i + 1}`,
        description: ac,
        passed: false,
      })),
      status: 'pending',
      source: 'aios',
      priority: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      aiosStoryPath: sourcePath,
      aiosStatus: story.status,
    };
  }

  private generateTaskId(_story: IAiosStory, sourcePath: string): string {
    // Try to extract from path
    const match = sourcePath.match(/(\d+)\.(\d+)\.story\.md$/i);
    if (match) {
      return `task-${match[1]}-${match[2]}`;
    }

    // Generate from timestamp
    return `task-${Date.now().toString(36)}`;
  }

  private emit(event: PipelineEvent): void {
    for (const callback of this.eventCallbacks) {
      try {
        callback(event);
      } catch (error) {
        console.error('Error in pipeline event callback:', error);
      }
    }
  }

  private async pathExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export default Pipeline;
