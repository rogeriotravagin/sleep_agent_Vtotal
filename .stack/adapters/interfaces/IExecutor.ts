/**
 * Interface para executores de tarefas
 * Abstrai a execução entre diferentes sistemas (Ralph, Auto-Claude agents)
 */

import type { IUnifiedTask, TaskStatus } from './ITask.js';

export type ExecutorType = 'ralph' | 'auto-claude-agent' | 'direct-claude-cli';

export interface IExecutionResult {
  success: boolean;
  taskId: string;
  exitCode: number;
  output: string;
  stderr?: string;
  duration: number; // ms
  iterations?: number;
  finalStatus: TaskStatus;
  artifacts?: IExecutionArtifact[];
  error?: IExecutionError;
}

export interface IExecutionArtifact {
  type: 'commit' | 'file' | 'branch' | 'log';
  path: string;
  description?: string;
  createdAt: Date;
}

export interface IExecutionError {
  code: string;
  message: string;
  recoverable: boolean;
  suggestedAction?: string;
  stack?: string;
}

export interface IExecutorOptions {
  timeout?: number; // ms, default 3600000 (1 hour)
  maxIterations?: number; // Ralph specific, default 30
  dryRun?: boolean;
  verbose?: boolean;
  env?: Record<string, string>;
}

export interface IExecutionProgress {
  taskId: string;
  currentIteration?: number;
  maxIterations?: number;
  phase: 'initializing' | 'running' | 'validating' | 'finalizing';
  message: string;
  percentage?: number;
  updatedAt: Date;
}

export type ProgressCallback = (progress: IExecutionProgress) => void;

export interface IExecutor {
  readonly name: string;
  readonly type: ExecutorType;

  /**
   * Executa uma tarefa em um worktree específico
   */
  execute(
    task: IUnifiedTask,
    worktreePath: string,
    options?: IExecutorOptions
  ): Promise<IExecutionResult>;

  /**
   * Verifica se o executor está disponível e configurado corretamente
   */
  healthCheck(): Promise<boolean>;

  /**
   * Retorna capacidade atual (slots disponíveis para execução)
   */
  getCapacity(): Promise<number>;

  /**
   * Cancela uma execução em andamento
   */
  cancel(taskId: string): Promise<boolean>;

  /**
   * Registra callback para progresso
   */
  onProgress(callback: ProgressCallback): void;
}

export interface IExecutorFactory {
  create(type: ExecutorType): IExecutor;
  getAvailableTypes(): ExecutorType[];
}
