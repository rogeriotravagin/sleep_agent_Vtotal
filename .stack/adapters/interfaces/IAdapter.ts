/**
 * Interface para adaptadores entre formatos de dados
 * Converte entre AIOS Story, Auto-Claude Spec e Ralph PRD
 */

import { IUnifiedTask } from './ITask.js';

// ============================================
// AIOS Story Format (13 seções)
// ============================================

export interface IAiosStory {
  // Metadata
  status: 'Draft' | 'Ready' | 'Approved' | 'In Progress' | 'Done' | 'Blocked';
  lastModified?: string;
  assignee?: string;

  // Core Story
  story: {
    role: string;
    action: string;
    benefit: string;
  };

  // Requirements
  acceptanceCriteria: string[];
  constraints?: string[];
  outOfScope?: string[];

  // Technical
  technicalNotes?: string;
  dependencies?: string[];
  affectedComponents?: string[];

  // Tasks
  tasksSubtasks?: IAiosTask[];

  // Metadata adicional
  devNotes?: string;
  testingNotes?: string;

  // Path do arquivo original
  _sourcePath?: string;
}

export interface IAiosTask {
  id: string;
  title: string;
  status: 'pending' | 'done';
  subtasks?: IAiosSubtask[];
}

export interface IAiosSubtask {
  id: string;
  title: string;
  status: 'pending' | 'done';
}

// ============================================
// Auto-Claude Spec Format
// ============================================

export interface IAutoClaudeSpec {
  id: string;
  title: string;
  description: string;
  requirements: IAutoClaudeRequirement[];
  context?: string;
  constraints?: string[];
  priority: 'high' | 'medium' | 'low';
  estimatedComplexity?: 'simple' | 'moderate' | 'complex';
}

export interface IAutoClaudeRequirement {
  id: string;
  description: string;
  type: 'functional' | 'non-functional' | 'constraint';
  priority: number;
  testable: boolean;
}

// ============================================
// Ralph PRD Format
// ============================================

export interface IRalphPrd {
  project: string;
  description?: string;
  gitEnabled: boolean;
  branchName: string;
  userStories: IRalphUserStory[];
}

export interface IRalphUserStory {
  id: string;
  title: string;
  description: string;
  acceptanceCriteria: string[];
  priority: number;
  passes: boolean;
  notes: string;
}

// ============================================
// Adapter Interfaces
// ============================================

export interface IAdapter<TInput, TOutput> {
  readonly name: string;
  readonly inputFormat: string;
  readonly outputFormat: string;

  /**
   * Converte do formato de entrada para o formato de saída
   */
  convert(input: TInput): Promise<TOutput>;

  /**
   * Valida se o input é válido para conversão
   */
  validate(input: TInput): Promise<IValidationResult>;
}

export interface IValidationResult {
  valid: boolean;
  errors: IValidationError[];
  warnings: IValidationWarning[];
}

export interface IValidationError {
  field: string;
  message: string;
  code: string;
}

export interface IValidationWarning {
  field: string;
  message: string;
  suggestion?: string;
}

// ============================================
// Specific Adapter Types
// ============================================

export interface IAiosToSpecAdapter extends IAdapter<IAiosStory, IAutoClaudeSpec> {
  readonly name: 'aios-to-spec';
  readonly inputFormat: 'aios-story';
  readonly outputFormat: 'auto-claude-spec';
}

export interface ISpecToPrdAdapter extends IAdapter<IAutoClaudeSpec, IRalphPrd> {
  readonly name: 'spec-to-prd';
  readonly inputFormat: 'auto-claude-spec';
  readonly outputFormat: 'ralph-prd';
}

export interface IAiosToPrdAdapter extends IAdapter<IAiosStory, IRalphPrd> {
  readonly name: 'aios-to-prd';
  readonly inputFormat: 'aios-story';
  readonly outputFormat: 'ralph-prd';
}

export interface IUnifiedTaskAdapter extends IAdapter<IAiosStory | IAutoClaudeSpec | IRalphPrd, IUnifiedTask> {
  readonly name: 'unified-task';
  detectFormat(input: unknown): 'aios-story' | 'auto-claude-spec' | 'ralph-prd' | 'unknown';
}

// ============================================
// Adapter Factory
// ============================================

export interface IAdapterFactory {
  getAiosToSpec(): IAiosToSpecAdapter;
  getSpecToPrd(): ISpecToPrdAdapter;
  getAiosToPrd(): IAiosToPrdAdapter;
  getUnifiedTask(): IUnifiedTaskAdapter;
}
