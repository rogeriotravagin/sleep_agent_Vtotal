/**
 * Auto-Claude Spec → Ralph PRD Adapter
 *
 * Converts Auto-Claude Spec format to Ralph prd.json format
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import {
  IAutoClaudeSpec,
  IRalphPrd,
  IRalphUserStory,
  ISpecToPrdAdapter,
  IValidationResult,
  IValidationError,
  IValidationWarning,
} from './interfaces/index.js';

export class SpecToPrdAdapter implements ISpecToPrdAdapter {
  readonly name = 'spec-to-prd' as const;
  readonly inputFormat = 'auto-claude-spec' as const;
  readonly outputFormat = 'ralph-prd' as const;

  /**
   * Convert Auto-Claude Spec to Ralph PRD
   */
  async convert(input: IAutoClaudeSpec): Promise<IRalphPrd> {
    const userStories: IRalphUserStory[] = [];

    // Group requirements into user stories
    // Each functional requirement becomes a user story
    const functionalReqs = input.requirements.filter(r => r.type === 'functional');
    const nonFunctionalReqs = input.requirements.filter(r => r.type !== 'functional');

    functionalReqs.forEach((req, index) => {
      const story: IRalphUserStory = {
        id: `US-${String(index + 1).padStart(3, '0')}`,
        title: this.extractTitle(req.description),
        description: req.description,
        acceptanceCriteria: this.buildAcceptanceCriteria(req, nonFunctionalReqs),
        priority: req.priority,
        passes: false,
        notes: '',
      };
      userStories.push(story);
    });

    // If no functional requirements, create a single story from the spec
    if (userStories.length === 0) {
      userStories.push({
        id: 'US-001',
        title: input.title,
        description: input.description,
        acceptanceCriteria: input.requirements.map(r => r.description),
        priority: 1,
        passes: false,
        notes: '',
      });
    }

    const prd: IRalphPrd = {
      project: input.title,
      description: input.description,
      gitEnabled: true,
      branchName: `auto-claude/${input.id}`,
      userStories,
    };

    return prd;
  }

  /**
   * Validate Auto-Claude Spec input
   */
  async validate(input: IAutoClaudeSpec): Promise<IValidationResult> {
    const errors: IValidationError[] = [];
    const warnings: IValidationWarning[] = [];

    if (!input.id) {
      errors.push({
        field: 'id',
        message: 'Spec ID is required',
        code: 'MISSING_ID',
      });
    }

    if (!input.title) {
      errors.push({
        field: 'title',
        message: 'Spec title is required',
        code: 'MISSING_TITLE',
      });
    }

    if (!input.requirements || input.requirements.length === 0) {
      errors.push({
        field: 'requirements',
        message: 'At least one requirement is required',
        code: 'MISSING_REQUIREMENTS',
      });
    }

    if (!input.description) {
      warnings.push({
        field: 'description',
        message: 'Spec description is empty',
        suggestion: 'Add a detailed description for better context',
      });
    }

    if (input.priority === 'low') {
      warnings.push({
        field: 'priority',
        message: 'Spec has low priority',
        suggestion: 'Consider if this should be executed now',
      });
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Write PRD to a directory
   */
  async writePrd(prd: IRalphPrd, targetDir: string): Promise<string> {
    await fs.mkdir(targetDir, { recursive: true });

    const prdPath = path.join(targetDir, 'prd.json');
    await fs.writeFile(prdPath, JSON.stringify(prd, null, 2));

    // Create progress.txt template
    const progressPath = path.join(targetDir, 'progress.txt');
    const progressContent = this.generateProgressTemplate(prd);
    await fs.writeFile(progressPath, progressContent);

    return prdPath;
  }

  // ============================================
  // Helper Methods
  // ============================================

  private extractTitle(description: string): string {
    // Take first sentence or first 50 chars
    const firstSentence = description.split(/[.!?]/)[0];
    if (firstSentence.length <= 60) {
      return firstSentence.trim();
    }
    return firstSentence.slice(0, 57).trim() + '...';
  }

  private buildAcceptanceCriteria(
    mainReq: IAutoClaudeSpec['requirements'][0],
    nonFunctional: IAutoClaudeSpec['requirements']
  ): string[] {
    const criteria: string[] = [mainReq.description];

    // Add relevant non-functional requirements
    for (const nfr of nonFunctional) {
      if (nfr.priority <= mainReq.priority) {
        criteria.push(nfr.description);
      }
    }

    // Always add typecheck as final criterion
    criteria.push('typecheck passes');

    return criteria;
  }

  private generateProgressTemplate(prd: IRalphPrd): string {
    const lines = [
      `# Progress: ${prd.project}`,
      `Started: ${new Date().toISOString().split('T')[0]}`,
      `Branch: ${prd.branchName}`,
      '',
      '## User Stories',
      '',
    ];

    for (const story of prd.userStories) {
      lines.push(`### ${story.id}: ${story.title}`);
      lines.push(`Status: ${story.passes ? '✅ PASSED' : '⏳ Pending'}`);
      lines.push('');
    }

    lines.push('## Session Log');
    lines.push('');
    lines.push(`[${new Date().toISOString()}] Project initialized`);
    lines.push('');

    return lines.join('\n');
  }
}

export default SpecToPrdAdapter;
