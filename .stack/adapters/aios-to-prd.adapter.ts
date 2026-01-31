/**
 * AIOS Story → Ralph PRD Direct Adapter
 *
 * Converts AIOS Story format directly to Ralph prd.json format
 * Bypasses Auto-Claude Spec for simpler workflows
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import {
  IAiosStory,
  IRalphPrd,
  IRalphUserStory,
  IAiosToPrdAdapter,
  IValidationResult,
  IValidationError,
  IValidationWarning,
} from './interfaces/index.js';
import { AiosToSpecAdapter } from './aios-to-spec.adapter.js';

export class AiosToPrdAdapter implements IAiosToPrdAdapter {
  readonly name = 'aios-to-prd' as const;
  readonly inputFormat = 'aios-story' as const;
  readonly outputFormat = 'ralph-prd' as const;

  private storyParser: AiosToSpecAdapter;

  constructor() {
    this.storyParser = new AiosToSpecAdapter();
  }

  /**
   * Parse AIOS Story file and convert to PRD
   */
  async parseAndConvert(storyPath: string): Promise<IRalphPrd> {
    const story = await this.storyParser.parseStoryFile(storyPath);
    return this.convert(story);
  }

  /**
   * Convert AIOS Story to Ralph PRD
   */
  async convert(input: IAiosStory): Promise<IRalphPrd> {
    const userStories: IRalphUserStory[] = [];

    // If story has tasks/subtasks, convert each task to a user story
    if (input.tasksSubtasks && input.tasksSubtasks.length > 0) {
      input.tasksSubtasks.forEach((task, index) => {
        const story: IRalphUserStory = {
          id: `US-${String(index + 1).padStart(3, '0')}`,
          title: task.title,
          description: this.buildTaskDescription(task, input),
          acceptanceCriteria: this.buildTaskAcceptanceCriteria(task, input, index),
          priority: index + 1,
          passes: task.status === 'done',
          notes: '',
        };
        userStories.push(story);
      });
    } else {
      // Single story from the AIOS story itself
      userStories.push({
        id: 'US-001',
        title: this.buildStoryTitle(input.story),
        description: this.buildStoryDescription(input),
        acceptanceCriteria: this.prepareAcceptanceCriteria(input.acceptanceCriteria),
        priority: 1,
        passes: input.status === 'Done',
        notes: input.technicalNotes || '',
      });
    }

    const storyId = this.extractStoryId(input);

    const prd: IRalphPrd = {
      project: this.buildStoryTitle(input.story),
      description: this.buildStoryDescription(input),
      gitEnabled: true,
      branchName: `auto-claude/${storyId}`,
      userStories,
    };

    return prd;
  }

  /**
   * Validate AIOS Story input
   */
  async validate(input: IAiosStory): Promise<IValidationResult> {
    const errors: IValidationError[] = [];
    const warnings: IValidationWarning[] = [];

    // Required fields
    if (!input.story.action) {
      errors.push({
        field: 'story.action',
        message: 'Story action is required',
        code: 'MISSING_ACTION',
      });
    }

    if (!input.acceptanceCriteria || input.acceptanceCriteria.length === 0) {
      errors.push({
        field: 'acceptanceCriteria',
        message: 'At least one acceptance criterion is required',
        code: 'MISSING_AC',
      });
    }

    // Validate status
    const validStatuses = ['Draft', 'Ready', 'Approved', 'In Progress', 'Done', 'Blocked'];
    if (!validStatuses.includes(input.status)) {
      warnings.push({
        field: 'status',
        message: `Invalid status: ${input.status}`,
        suggestion: `Use one of: ${validStatuses.join(', ')}`,
      });
    }

    // Warnings for better quality
    if (input.status === 'Draft') {
      warnings.push({
        field: 'status',
        message: 'Story is still in Draft status',
        suggestion: 'Update to Ready or Approved before execution',
      });
    }

    if (!input.technicalNotes) {
      warnings.push({
        field: 'technicalNotes',
        message: 'No technical notes provided',
        suggestion: 'Add Dev Notes for better execution context',
      });
    }

    if (!input.tasksSubtasks || input.tasksSubtasks.length === 0) {
      warnings.push({
        field: 'tasksSubtasks',
        message: 'No tasks defined',
        suggestion: 'Breaking into tasks improves parallel execution',
      });
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Write PRD to project directory
   */
  async writePrd(prd: IRalphPrd, targetDir: string): Promise<string> {
    await fs.mkdir(targetDir, { recursive: true });

    const prdPath = path.join(targetDir, 'prd.json');
    await fs.writeFile(prdPath, JSON.stringify(prd, null, 2));

    // Create progress.txt
    const progressPath = path.join(targetDir, 'progress.txt');
    await fs.writeFile(progressPath, this.generateProgressFile(prd));

    return prdPath;
  }

  // ============================================
  // Helper Methods
  // ============================================

  private buildStoryTitle(storyData: IAiosStory['story']): string {
    if (storyData.action) {
      // Capitalize first letter
      return storyData.action.charAt(0).toUpperCase() + storyData.action.slice(1);
    }
    return 'Untitled Story';
  }

  private buildStoryDescription(story: IAiosStory): string {
    const parts: string[] = [];

    // Story statement
    if (story.story.role || story.story.action || story.story.benefit) {
      parts.push(
        `As a ${story.story.role || 'user'}, I want ${story.story.action || 'to do something'} so that ${story.story.benefit || 'I get value'}.`
      );
    }

    // Add constraints if present
    if (story.constraints && story.constraints.length > 0) {
      parts.push('\n\nConstraints:');
      story.constraints.forEach((c) => parts.push(`- ${c}`));
    }

    return parts.join('');
  }

  private buildTaskDescription(
    task: NonNullable<IAiosStory['tasksSubtasks']>[0],
    story: IAiosStory
  ): string {
    const parts: string[] = [task.title];

    // Add subtasks as part of description
    if (task.subtasks && task.subtasks.length > 0) {
      parts.push('\n\nSubtasks:');
      task.subtasks.forEach((st) => {
        const checkbox = st.status === 'done' ? '[x]' : '[ ]';
        parts.push(`- ${checkbox} ${st.title}`);
      });
    }

    // Add relevant technical notes
    if (story.technicalNotes) {
      parts.push(`\n\nContext:\n${story.technicalNotes}`);
    }

    return parts.join('');
  }

  private buildTaskAcceptanceCriteria(
    task: NonNullable<IAiosStory['tasksSubtasks']>[0],
    story: IAiosStory,
    taskIndex: number
  ): string[] {
    const criteria: string[] = [];

    // Add task completion as criterion
    criteria.push(`${task.title} is complete`);

    // Add relevant ACs from story (based on task index or all if only one task)
    if (story.acceptanceCriteria.length > 0) {
      if (story.acceptanceCriteria.length === 1 || story.tasksSubtasks?.length === 1) {
        // Single AC or single task - include all
        criteria.push(...story.acceptanceCriteria);
      } else {
        // Multiple - try to map by index or include relevant ones
        const relatedAc = story.acceptanceCriteria[taskIndex];
        if (relatedAc) {
          criteria.push(relatedAc);
        }
      }
    }

    // Add subtask completion if present
    if (task.subtasks && task.subtasks.length > 0) {
      criteria.push(`All ${task.subtasks.length} subtasks completed`);
    }

    // Always add typecheck
    criteria.push('typecheck passes');

    return [...new Set(criteria)]; // Remove duplicates
  }

  private prepareAcceptanceCriteria(criteria: string[]): string[] {
    const prepared = [...criteria];

    // Ensure typecheck is included
    if (!prepared.some((c) => c.toLowerCase().includes('typecheck'))) {
      prepared.push('typecheck passes');
    }

    return prepared;
  }

  private extractStoryId(story: IAiosStory): string {
    // Try to extract from source path
    if (story._sourcePath) {
      const match = story._sourcePath.match(/(\d+)\.(\d+)\.story\.md$/i);
      if (match) {
        return `${match[1]}.${match[2]}`;
      }

      // Try filename
      const filenameMatch = story._sourcePath.match(/([^/\\]+)\.(?:story\.)?md$/i);
      if (filenameMatch) {
        return this.slugify(filenameMatch[1]);
      }
    }

    // Fallback to action-based slug
    return this.slugify(story.story.action || `story-${Date.now()}`);
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 30);
  }

  private generateProgressFile(prd: IRalphPrd): string {
    const lines = [
      `# Progress: ${prd.project}`,
      `Started: ${new Date().toISOString().split('T')[0]}`,
      `Branch: ${prd.branchName}`,
      '',
      '## Status Overview',
      '',
      `Total Stories: ${prd.userStories.length}`,
      `Completed: ${prd.userStories.filter((s) => s.passes).length}`,
      `Remaining: ${prd.userStories.filter((s) => !s.passes).length}`,
      '',
      '## User Stories',
      '',
    ];

    for (const story of prd.userStories) {
      const status = story.passes ? '✅ PASSED' : '⏳ Pending';
      lines.push(`### ${story.id}: ${story.title}`);
      lines.push(`Status: ${status}`);
      lines.push('');
      lines.push('Acceptance Criteria:');
      for (const ac of story.acceptanceCriteria) {
        const checkbox = story.passes ? '[x]' : '[ ]';
        lines.push(`- ${checkbox} ${ac}`);
      }
      lines.push('');
    }

    lines.push('## Session Log');
    lines.push('');
    lines.push(`[${new Date().toISOString()}] Project initialized via AIOS-to-PRD adapter`);
    lines.push('');

    return lines.join('\n');
  }
}

export default AiosToPrdAdapter;
