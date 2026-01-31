/**
 * Interface unificada para tarefas entre sistemas
 * AIOS Story → Auto-Claude Spec → Ralph PRD
 */

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'failed' | 'blocked';
export type TaskSource = 'aios' | 'auto-claude' | 'ralph' | 'manual';
export type TaskPriority = 1 | 2 | 3 | 4 | 5; // 1 = highest

export interface IAcceptanceCriterion {
  id: string;
  description: string;
  passed: boolean;
  testedAt?: Date;
}

export interface IUnifiedTask {
  // Identificação
  id: string;
  externalId?: string; // ID no sistema de origem

  // Conteúdo
  title: string;
  description: string;
  acceptanceCriteria: IAcceptanceCriterion[];

  // Metadata
  status: TaskStatus;
  source: TaskSource;
  priority: TaskPriority;

  // Atribuição
  assignedAgent?: string;
  worktreePath?: string;
  branchName?: string;

  // Rastreamento
  createdAt: Date;
  updatedAt: Date;
  startedAt?: Date;
  completedAt?: Date;

  // Relacionamentos
  parentTaskId?: string;
  dependsOn?: string[];
  blocks?: string[];

  // AIOS-specific
  aiosStoryPath?: string;
  aiosStatus?: string;

  // Ralph-specific
  ralphIterations?: number;
  ralphMaxIterations?: number;

  // Notas e logs
  notes?: string;
  logs?: ITaskLog[];
}

export interface ITaskLog {
  timestamp: Date;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  source: TaskSource;
  metadata?: Record<string, unknown>;
}

export interface ITaskCreateInput {
  title: string;
  description: string;
  acceptanceCriteria: string[];
  priority?: TaskPriority;
  source?: TaskSource;
  dependsOn?: string[];
  aiosStoryPath?: string;
}

export interface ITaskUpdateInput {
  id: string;
  status?: TaskStatus;
  assignedAgent?: string;
  worktreePath?: string;
  branchName?: string;
  notes?: string;
  acceptanceCriteria?: IAcceptanceCriterion[];
}

export interface ITaskFilter {
  status?: TaskStatus | TaskStatus[];
  source?: TaskSource | TaskSource[];
  priority?: TaskPriority | TaskPriority[];
  assignedAgent?: string;
  hasWorktree?: boolean;
}

export interface ITaskRepository {
  create(input: ITaskCreateInput): Promise<IUnifiedTask>;
  findById(id: string): Promise<IUnifiedTask | null>;
  findAll(filter?: ITaskFilter): Promise<IUnifiedTask[]>;
  update(input: ITaskUpdateInput): Promise<IUnifiedTask>;
  delete(id: string): Promise<boolean>;
  addLog(taskId: string, log: Omit<ITaskLog, 'timestamp'>): Promise<void>;
}
