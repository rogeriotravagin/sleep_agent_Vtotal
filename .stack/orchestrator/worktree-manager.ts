/**
 * Worktree Manager
 *
 * Manages git worktrees for isolated task execution
 */

import { spawn } from 'child_process';
import * as fs from 'fs/promises';
import * as path from 'path';

export interface WorktreeInfo {
  path: string;
  branch: string;
  taskId: string;
  createdAt: Date;
  isActive: boolean;
}

export interface WorktreeManagerConfig {
  basePath: string;
  nameTemplate: string;
  branchTemplate: string;
  autoCleanup: boolean;
  cleanupAfterSuccess: boolean;
  cleanupAfterFailure: boolean;
  retentionPeriod: number;
  git: {
    user: string;
    email: string;
    signCommits: boolean;
  };
}

export class WorktreeManager {
  private config: WorktreeManagerConfig;
  private repoRoot: string;
  private activeWorktrees: Map<string, WorktreeInfo> = new Map();

  constructor(config: WorktreeManagerConfig, repoRoot: string) {
    this.config = config;
    this.repoRoot = repoRoot;
  }

  /**
   * Create a new worktree for a task
   */
  async create(taskId: string, baseBranch?: string): Promise<WorktreeInfo> {
    const timestamp = Date.now();
    const worktreeName = this.config.nameTemplate
      .replace('{taskId}', taskId)
      .replace('{timestamp}', String(timestamp));

    const branchName = this.config.branchTemplate.replace('{taskId}', taskId);
    const worktreePath = path.join(this.config.basePath, worktreeName);

    // Ensure base path exists
    await fs.mkdir(this.config.basePath, { recursive: true });

    // Create the worktree
    const base = baseBranch || 'main';
    await this.execGit(['worktree', 'add', '-b', branchName, worktreePath, base]);

    const info: WorktreeInfo = {
      path: worktreePath,
      branch: branchName,
      taskId,
      createdAt: new Date(),
      isActive: true,
    };

    this.activeWorktrees.set(taskId, info);
    return info;
  }

  /**
   * Get worktree info for a task
   */
  get(taskId: string): WorktreeInfo | undefined {
    return this.activeWorktrees.get(taskId);
  }

  /**
   * List all worktrees
   */
  async list(): Promise<WorktreeInfo[]> {
    const output = await this.execGit(['worktree', 'list', '--porcelain']);
    const worktrees: WorktreeInfo[] = [];

    const blocks = output.split('\n\n').filter((b) => b.trim());

    for (const block of blocks) {
      const lines = block.split('\n');
      const pathLine = lines.find((l) => l.startsWith('worktree '));
      const branchLine = lines.find((l) => l.startsWith('branch '));

      if (pathLine && branchLine) {
        const worktreePath = pathLine.replace('worktree ', '');
        const branch = branchLine.replace('branch refs/heads/', '');

        // Extract taskId from branch name
        const taskIdMatch = branch.match(/auto-claude\/(.+)/);
        const taskId = taskIdMatch ? taskIdMatch[1] : branch;

        // Check if it's in our base path
        if (worktreePath.startsWith(this.config.basePath)) {
          worktrees.push({
            path: worktreePath,
            branch,
            taskId,
            createdAt: new Date(), // Would need to read from fs for accurate time
            isActive: true,
          });
        }
      }
    }

    return worktrees;
  }

  /**
   * Remove a worktree
   */
  async remove(taskId: string, force = false): Promise<boolean> {
    const info = this.activeWorktrees.get(taskId);
    if (!info) {
      // Try to find by scanning
      const worktrees = await this.list();
      const found = worktrees.find((w) => w.taskId === taskId);
      if (!found) {
        return false;
      }
      return this.removeByPath(found.path, found.branch, force);
    }

    return this.removeByPath(info.path, info.branch, force);
  }

  /**
   * Remove worktree by path
   */
  private async removeByPath(worktreePath: string, branch: string, force = false): Promise<boolean> {
    try {
      // Remove worktree
      const args = ['worktree', 'remove'];
      if (force) args.push('--force');
      args.push(worktreePath);

      await this.execGit(args);

      // Delete branch
      await this.execGit(['branch', '-D', branch]).catch(() => {
        // Branch might not exist or be protected
      });

      // Remove from active map
      for (const [taskId, info] of this.activeWorktrees) {
        if (info.path === worktreePath) {
          this.activeWorktrees.delete(taskId);
          break;
        }
      }

      return true;
    } catch (error) {
      console.error(`Failed to remove worktree at ${worktreePath}:`, error);
      return false;
    }
  }

  /**
   * Cleanup old worktrees based on retention policy
   */
  async cleanup(): Promise<number> {
    const worktrees = await this.list();
    const now = Date.now();
    let removed = 0;

    for (const wt of worktrees) {
      const age = now - wt.createdAt.getTime();

      if (age > this.config.retentionPeriod) {
        const success = await this.remove(wt.taskId, true);
        if (success) removed++;
      }
    }

    // Also prune stale worktrees
    await this.execGit(['worktree', 'prune']).catch(() => {
      // Ignore prune errors
    });

    return removed;
  }

  /**
   * Check if a worktree exists for a task
   */
  async exists(taskId: string): Promise<boolean> {
    if (this.activeWorktrees.has(taskId)) {
      return true;
    }

    const worktrees = await this.list();
    return worktrees.some((w) => w.taskId === taskId);
  }

  /**
   * Get the path to a worktree
   */
  async getPath(taskId: string): Promise<string | null> {
    const info = this.get(taskId);
    if (info) return info.path;

    const worktrees = await this.list();
    const found = worktrees.find((w) => w.taskId === taskId);
    return found?.path || null;
  }

  /**
   * Merge worktree changes back to base branch
   */
  async merge(taskId: string, targetBranch = 'main', deleteAfter = true): Promise<boolean> {
    const info = this.get(taskId);
    if (!info) {
      throw new Error(`No worktree found for task: ${taskId}`);
    }

    try {
      // Switch to target branch in main repo
      await this.execGit(['checkout', targetBranch]);

      // Merge the task branch
      await this.execGit(['merge', info.branch, '--no-ff', '-m', `Merge ${info.branch}`]);

      // Clean up if requested
      if (deleteAfter) {
        await this.remove(taskId, true);
      }

      return true;
    } catch (error) {
      console.error(`Failed to merge worktree for task ${taskId}:`, error);
      return false;
    }
  }

  /**
   * Get status of worktree (has uncommitted changes, etc.)
   */
  async getStatus(taskId: string): Promise<{
    hasChanges: boolean;
    ahead: number;
    behind: number;
  }> {
    const info = this.get(taskId);
    if (!info) {
      throw new Error(`No worktree found for task: ${taskId}`);
    }

    // Check for uncommitted changes
    const statusOutput = await this.execGitInWorktree(info.path, ['status', '--porcelain']);
    const hasChanges = statusOutput.trim().length > 0;

    // Get ahead/behind count
    let ahead = 0;
    let behind = 0;

    try {
      const revList = await this.execGitInWorktree(info.path, [
        'rev-list',
        '--left-right',
        '--count',
        `origin/main...${info.branch}`,
      ]);
      const [behindStr, aheadStr] = revList.trim().split(/\s+/);
      behind = parseInt(behindStr, 10) || 0;
      ahead = parseInt(aheadStr, 10) || 0;
    } catch {
      // Origin might not exist
    }

    return { hasChanges, ahead, behind };
  }

  // ============================================
  // Git Helpers
  // ============================================

  private execGit(args: string[]): Promise<string> {
    return this.execGitInDir(this.repoRoot, args);
  }

  private execGitInWorktree(worktreePath: string, args: string[]): Promise<string> {
    return this.execGitInDir(worktreePath, args);
  }

  private execGitInDir(cwd: string, args: string[]): Promise<string> {
    return new Promise((resolve, reject) => {
      const proc = spawn('git', args, { cwd, shell: process.platform === 'win32' });

      let stdout = '';
      let stderr = '';

      proc.stdout?.on('data', (data) => {
        stdout += data.toString();
      });

      proc.stderr?.on('data', (data) => {
        stderr += data.toString();
      });

      proc.on('close', (code) => {
        if (code === 0) {
          resolve(stdout);
        } else {
          reject(new Error(`Git command failed: git ${args.join(' ')}\n${stderr}`));
        }
      });

      proc.on('error', reject);
    });
  }
}

export default WorktreeManager;
