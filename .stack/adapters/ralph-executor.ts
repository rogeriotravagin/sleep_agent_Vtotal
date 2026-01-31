/**
 * Ralph Executor
 *
 * Executes Ralph loop in isolated worktrees
 * Wraps the ralph.sh script for the stack integration
 */

import { spawn, ChildProcess } from 'child_process';
import * as fs from 'fs/promises';
import * as path from 'path';
import {
  IExecutor,
  IExecutionResult,
  IExecutorOptions,
  IExecutionProgress,
  ProgressCallback,
  ExecutorType,
  IExecutionArtifact,
  IUnifiedTask,
} from './interfaces/index.js';
import { IRalphPrd, IRalphUserStory } from './interfaces/IAdapter.js';

export interface RalphExecutorConfig {
  ralphDir: string;
  scriptsPath: string;
  defaultMaxIterations: number;
  defaultTimeout: number;
}

export class RalphExecutor implements IExecutor {
  readonly name = 'ralph-executor';
  readonly type: ExecutorType = 'ralph';

  private config: RalphExecutorConfig;
  private progressCallbacks: ProgressCallback[] = [];
  private runningProcesses: Map<string, ChildProcess> = new Map();

  constructor(config: RalphExecutorConfig) {
    this.config = config;
  }

  /**
   * Execute a task using Ralph loop
   */
  async execute(
    task: IUnifiedTask,
    worktreePath: string,
    options?: IExecutorOptions
  ): Promise<IExecutionResult> {
    const startTime = Date.now();
    const maxIterations = options?.maxIterations || this.config.defaultMaxIterations;
    const timeout = options?.timeout || this.config.defaultTimeout;

    try {
      // 1. Generate prd.json in worktree
      const prd = this.taskToPrd(task);
      const prdPath = path.join(worktreePath, 'prd.json');
      await fs.writeFile(prdPath, JSON.stringify(prd, null, 2));

      // 2. Generate progress.txt
      const progressPath = path.join(worktreePath, 'progress.txt');
      const progressContent = this.generateInitialProgress(task, prd);
      await fs.writeFile(progressPath, progressContent);

      // 3. Emit starting progress
      this.emitProgress({
        taskId: task.id,
        phase: 'initializing',
        message: 'Starting Ralph execution',
        updatedAt: new Date(),
      });

      // 4. Execute ralph.sh
      const result = await this.runRalphScript(
        worktreePath,
        maxIterations,
        timeout,
        task.id,
        options?.dryRun
      );

      // 5. Collect artifacts
      const artifacts = await this.collectArtifacts(worktreePath, prd.branchName);

      // 6. Determine success
      const success = this.determineSuccess(result.output);

      return {
        success,
        taskId: task.id,
        exitCode: result.exitCode,
        output: result.output,
        stderr: result.stderr,
        duration: Date.now() - startTime,
        iterations: this.extractIterationCount(result.output),
        finalStatus: success ? 'completed' : 'failed',
        artifacts,
      };
    } catch (error) {
      return {
        success: false,
        taskId: task.id,
        exitCode: 1,
        output: '',
        duration: Date.now() - startTime,
        finalStatus: 'failed',
        error: {
          code: 'RALPH_EXECUTION_ERROR',
          message: error instanceof Error ? error.message : String(error),
          recoverable: true,
          suggestedAction: 'Check ralph.sh script and prd.json validity',
        },
      };
    }
  }

  /**
   * Check if Ralph is available and configured
   */
  async healthCheck(): Promise<boolean> {
    try {
      const scriptPath = path.join(this.config.scriptsPath, 'ralph.sh');
      await fs.access(scriptPath, fs.constants.X_OK);

      // Check if claude CLI is available
      const claudeCheck = spawn('claude', ['--version'], { shell: true });
      return new Promise((resolve) => {
        claudeCheck.on('close', (code) => resolve(code === 0));
        claudeCheck.on('error', () => resolve(false));
      });
    } catch {
      return false;
    }
  }

  /**
   * Get current capacity (always 1 for sequential Ralph)
   */
  async getCapacity(): Promise<number> {
    // Ralph runs sequentially, capacity is based on running processes
    return this.runningProcesses.size === 0 ? 1 : 0;
  }

  /**
   * Cancel a running execution
   */
  async cancel(taskId: string): Promise<boolean> {
    const process = this.runningProcesses.get(taskId);
    if (process) {
      process.kill('SIGTERM');
      this.runningProcesses.delete(taskId);
      return true;
    }
    return false;
  }

  /**
   * Register progress callback
   */
  onProgress(callback: ProgressCallback): void {
    this.progressCallbacks.push(callback);
  }

  // ============================================
  // Private Methods
  // ============================================

  /**
   * Convert unified task to Ralph PRD format
   */
  private taskToPrd(task: IUnifiedTask): IRalphPrd {
    const userStories: IRalphUserStory[] = [];

    // Convert acceptance criteria to user story
    const story: IRalphUserStory = {
      id: 'US-001',
      title: task.title,
      description: task.description,
      acceptanceCriteria: task.acceptanceCriteria.map((ac) => ac.description),
      priority: task.priority,
      passes: false,
      notes: task.notes || '',
    };

    userStories.push(story);

    return {
      project: task.title,
      description: task.description,
      gitEnabled: true,
      branchName: task.branchName || `auto-claude/${task.id}`,
      userStories,
    };
  }

  /**
   * Generate initial progress.txt content
   */
  private generateInitialProgress(task: IUnifiedTask, prd: IRalphPrd): string {
    const lines = [
      `# Progress: ${prd.project}`,
      `Started: ${new Date().toISOString().split('T')[0]}`,
      `Task ID: ${task.id}`,
      `Branch: ${prd.branchName}`,
      '',
      '## User Stories',
      '',
    ];

    for (const story of prd.userStories) {
      lines.push(`### ${story.id}: ${story.title}`);
      lines.push('Status: ⏳ Pending');
      lines.push('');
      lines.push('Acceptance Criteria:');
      for (const ac of story.acceptanceCriteria) {
        lines.push(`- [ ] ${ac}`);
      }
      lines.push('');
    }

    lines.push('## Session Log');
    lines.push('');
    lines.push(`[${new Date().toISOString()}] Ralph execution started`);
    lines.push('');

    return lines.join('\n');
  }

  /**
   * Run the ralph.sh script
   */
  private runRalphScript(
    worktreePath: string,
    maxIterations: number,
    timeout: number,
    taskId: string,
    dryRun?: boolean
  ): Promise<{ exitCode: number; output: string; stderr: string }> {
    return new Promise((resolve, reject) => {
      const scriptPath = path.join(this.config.scriptsPath, 'ralph.sh');

      // On Windows, run through bash
      const isWindows = process.platform === 'win32';
      const command = isWindows ? 'bash' : scriptPath;
      const args = isWindows
        ? [scriptPath, worktreePath, String(maxIterations)]
        : [worktreePath, String(maxIterations)];

      if (dryRun) {
        resolve({
          exitCode: 0,
          output: '[DRY RUN] Would execute Ralph with above configuration',
          stderr: '',
        });
        return;
      }

      const proc = spawn(command, args, {
        cwd: this.config.ralphDir,
        shell: isWindows,
        env: {
          ...process.env,
          RALPH_TASK_ID: taskId,
        },
      });

      this.runningProcesses.set(taskId, proc);

      let output = '';
      let stderr = '';
      let iterationCount = 0;

      proc.stdout?.on('data', (data) => {
        const chunk = data.toString();
        output += chunk;

        // Parse iteration progress
        const iterMatch = chunk.match(/Iteration (\d+)/i);
        if (iterMatch) {
          iterationCount = parseInt(iterMatch[1], 10);
          this.emitProgress({
            taskId,
            currentIteration: iterationCount,
            maxIterations,
            phase: 'running',
            message: `Running iteration ${iterationCount}/${maxIterations}`,
            percentage: (iterationCount / maxIterations) * 100,
            updatedAt: new Date(),
          });
        }

        // Check for completion signal
        if (chunk.includes('<promise>COMPLETE</promise>')) {
          this.emitProgress({
            taskId,
            phase: 'finalizing',
            message: 'Task completed successfully',
            percentage: 100,
            updatedAt: new Date(),
          });
        }
      });

      proc.stderr?.on('data', (data) => {
        stderr += data.toString();
      });

      // Timeout handling
      const timeoutId = setTimeout(() => {
        proc.kill('SIGTERM');
        reject(new Error(`Ralph execution timed out after ${timeout}ms`));
      }, timeout);

      proc.on('close', (code) => {
        clearTimeout(timeoutId);
        this.runningProcesses.delete(taskId);
        resolve({
          exitCode: code ?? 1,
          output,
          stderr,
        });
      });

      proc.on('error', (error) => {
        clearTimeout(timeoutId);
        this.runningProcesses.delete(taskId);
        reject(error);
      });
    });
  }

  /**
   * Collect artifacts from the worktree
   */
  private async collectArtifacts(
    worktreePath: string,
    branchName: string
  ): Promise<IExecutionArtifact[]> {
    const artifacts: IExecutionArtifact[] = [];

    // Check for progress.txt updates
    const progressPath = path.join(worktreePath, 'progress.txt');
    try {
      await fs.access(progressPath);
      artifacts.push({
        type: 'log',
        path: progressPath,
        description: 'Ralph progress log',
        createdAt: new Date(),
      });
    } catch {
      // File doesn't exist
    }

    // Check for handoff.md
    const handoffPath = path.join(worktreePath, 'handoff.md');
    try {
      await fs.access(handoffPath);
      artifacts.push({
        type: 'file',
        path: handoffPath,
        description: 'Task handoff document',
        createdAt: new Date(),
      });
    } catch {
      // File doesn't exist
    }

    // Add branch as artifact
    artifacts.push({
      type: 'branch',
      path: branchName,
      description: 'Git branch with changes',
      createdAt: new Date(),
    });

    return artifacts;
  }

  /**
   * Determine if execution was successful
   */
  private determineSuccess(output: string): boolean {
    // Look for Ralph's completion signal
    if (output.includes('<promise>COMPLETE</promise>')) {
      return true;
    }

    // Look for all stories passing
    if (output.includes('All stories passed!')) {
      return true;
    }

    // Look for explicit failure indicators
    if (
      output.includes('FAILED') ||
      output.includes('Error:') ||
      output.includes('Max iterations reached')
    ) {
      return false;
    }

    return false;
  }

  /**
   * Extract iteration count from output
   */
  private extractIterationCount(output: string): number {
    const matches = output.matchAll(/Iteration (\d+)/gi);
    let max = 0;
    for (const match of matches) {
      const num = parseInt(match[1], 10);
      if (num > max) max = num;
    }
    return max;
  }

  /**
   * Emit progress to all registered callbacks
   */
  private emitProgress(progress: IExecutionProgress): void {
    for (const callback of this.progressCallbacks) {
      try {
        callback(progress);
      } catch (error) {
        console.error('Error in progress callback:', error);
      }
    }
  }
}

export default RalphExecutor;
