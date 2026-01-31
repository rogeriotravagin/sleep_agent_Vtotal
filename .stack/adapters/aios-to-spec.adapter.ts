/**
 * AIOS Story → Auto-Claude Spec Adapter
 *
 * Converts AIOS Story format (13 sections) to Auto-Claude Spec format
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import {
  IAiosStory,
  IAutoClaudeSpec,
  IAutoClaudeRequirement,
  IAiosToSpecAdapter,
  IValidationResult,
  IValidationError,
  IValidationWarning,
} from './interfaces/index.js';

export class AiosToSpecAdapter implements IAiosToSpecAdapter {
  readonly name = 'aios-to-spec' as const;
  readonly inputFormat = 'aios-story' as const;
  readonly outputFormat = 'auto-claude-spec' as const;

  /**
   * Parse AIOS Story markdown file into structured object
   */
  async parseStoryFile(filePath: string): Promise<IAiosStory> {
    const content = await fs.readFile(filePath, 'utf-8');
    return this.parseStoryContent(content, filePath);
  }

  /**
   * Parse AIOS Story content (markdown/yaml format)
   */
  parseStoryContent(content: string, sourcePath?: string): IAiosStory {
    const story: IAiosStory = {
      status: 'Draft',
      story: { role: '', action: '', benefit: '' },
      acceptanceCriteria: [],
      _sourcePath: sourcePath,
    };

    // Extract frontmatter if present
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      story.status = this.extractYamlValue(frontmatter, 'status') as IAiosStory['status'] || 'Draft';
      story.lastModified = this.extractYamlValue(frontmatter, 'lastModified') || this.extractYamlValue(frontmatter, 'last_modified');
      story.assignee = this.extractYamlValue(frontmatter, 'assignee');
    }

    // Extract story statement (As a... I want... So that...)
    const storyMatch = content.match(/As a\s+([^,]+),?\s+I want\s+([^,]+),?\s+so that\s+(.+?)(?:\.|$)/i);
    if (storyMatch) {
      story.story = {
        role: storyMatch[1].trim(),
        action: storyMatch[2].trim(),
        benefit: storyMatch[3].trim(),
      };
    }

    // Extract acceptance criteria
    const acSection = this.extractSection(content, 'Acceptance Criteria');
    if (acSection) {
      story.acceptanceCriteria = this.extractListItems(acSection);
    }

    // Extract constraints
    const constraintsSection = this.extractSection(content, 'Constraints');
    if (constraintsSection) {
      story.constraints = this.extractListItems(constraintsSection);
    }

    // Extract out of scope
    const oosSection = this.extractSection(content, 'Out of Scope');
    if (oosSection) {
      story.outOfScope = this.extractListItems(oosSection);
    }

    // Extract technical notes
    const techSection = this.extractSection(content, 'Technical Notes') || this.extractSection(content, 'Dev Notes');
    if (techSection) {
      story.technicalNotes = techSection;
    }

    // Extract dependencies
    const depsSection = this.extractSection(content, 'Dependencies');
    if (depsSection) {
      story.dependencies = this.extractListItems(depsSection);
    }

    // Extract tasks/subtasks
    const tasksSection = this.extractSection(content, 'Tasks') || this.extractSection(content, 'Subtasks');
    if (tasksSection) {
      story.tasksSubtasks = this.extractTasks(tasksSection);
    }

    return story;
  }

  /**
   * Convert AIOS Story to Auto-Claude Spec
   */
  async convert(input: IAiosStory): Promise<IAutoClaudeSpec> {
    const id = this.generateSpecId(input);

    const requirements: IAutoClaudeRequirement[] = [];

    // Convert acceptance criteria to requirements
    input.acceptanceCriteria.forEach((ac, index) => {
      requirements.push({
        id: `REQ-${String(index + 1).padStart(3, '0')}`,
        description: ac,
        type: 'functional',
        priority: 1,
        testable: true,
      });
    });

    // Add constraints as non-functional requirements
    input.constraints?.forEach((constraint, index) => {
      requirements.push({
        id: `NFR-${String(index + 1).padStart(3, '0')}`,
        description: constraint,
        type: 'non-functional',
        priority: 2,
        testable: false,
      });
    });

    const spec: IAutoClaudeSpec = {
      id,
      title: this.buildTitle(input.story),
      description: this.buildDescription(input),
      requirements,
      context: input.technicalNotes,
      constraints: input.outOfScope,
      priority: this.determinePriority(input),
      estimatedComplexity: this.estimateComplexity(input),
    };

    return spec;
  }

  /**
   * Validate AIOS Story input
   */
  async validate(input: IAiosStory): Promise<IValidationResult> {
    const errors: IValidationError[] = [];
    const warnings: IValidationWarning[] = [];

    // Required fields
    if (!input.story.role || !input.story.action) {
      errors.push({
        field: 'story',
        message: 'Story must have role and action defined',
        code: 'MISSING_STORY_CORE',
      });
    }

    if (!input.acceptanceCriteria || input.acceptanceCriteria.length === 0) {
      errors.push({
        field: 'acceptanceCriteria',
        message: 'At least one acceptance criterion is required',
        code: 'MISSING_AC',
      });
    }

    // Warnings
    if (!input.story.benefit) {
      warnings.push({
        field: 'story.benefit',
        message: 'Story benefit is not defined',
        suggestion: 'Add a "so that [benefit]" clause to the story',
      });
    }

    if (!input.technicalNotes) {
      warnings.push({
        field: 'technicalNotes',
        message: 'No technical notes provided',
        suggestion: 'Add Dev Notes section with implementation details',
      });
    }

    if (input.status === 'Draft') {
      warnings.push({
        field: 'status',
        message: 'Story is still in Draft status',
        suggestion: 'Update status to Ready or Approved before execution',
      });
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Write spec to Auto-Claude specs directory
   */
  async writeSpec(spec: IAutoClaudeSpec, specsDir: string): Promise<string> {
    const specDir = path.join(specsDir, `${spec.id}-${this.slugify(spec.title)}`);
    await fs.mkdir(specDir, { recursive: true });

    // Write spec.md
    const specMd = this.generateSpecMarkdown(spec);
    await fs.writeFile(path.join(specDir, 'spec.md'), specMd);

    // Write requirements.json
    await fs.writeFile(
      path.join(specDir, 'requirements.json'),
      JSON.stringify(spec.requirements, null, 2)
    );

    return specDir;
  }

  // ============================================
  // Helper Methods
  // ============================================

  private extractYamlValue(yaml: string, key: string): string | undefined {
    const match = yaml.match(new RegExp(`^${key}:\\s*(.+)$`, 'mi'));
    return match ? match[1].trim().replace(/^["']|["']$/g, '') : undefined;
  }

  private extractSection(content: string, sectionName: string): string | undefined {
    const pattern = new RegExp(`##\\s*${sectionName}[\\s\\S]*?(?=##|$)`, 'i');
    const match = content.match(pattern);
    if (match) {
      return match[0].replace(new RegExp(`##\\s*${sectionName}`, 'i'), '').trim();
    }
    return undefined;
  }

  private extractListItems(section: string): string[] {
    const items: string[] = [];
    const lines = section.split('\n');

    for (const line of lines) {
      const match = line.match(/^\s*[-*]\s*\[?\s*[x ]?\s*\]?\s*(.+)/i);
      if (match) {
        items.push(match[1].trim());
      }
    }

    return items;
  }

  private extractTasks(section: string): IAiosStory['tasksSubtasks'] {
    const tasks: NonNullable<IAiosStory['tasksSubtasks']> = [];
    const lines = section.split('\n');
    let currentTask: NonNullable<IAiosStory['tasksSubtasks']>[0] | null = null;

    for (const line of lines) {
      // Main task (- or * with checkbox)
      const taskMatch = line.match(/^[-*]\s*\[([x ])\]\s*(.+)/i);
      if (taskMatch && !line.startsWith('  ')) {
        if (currentTask) tasks.push(currentTask);
        currentTask = {
          id: `T-${tasks.length + 1}`,
          title: taskMatch[2].trim(),
          status: taskMatch[1].toLowerCase() === 'x' ? 'done' : 'pending',
          subtasks: [],
        };
        continue;
      }

      // Subtask (indented)
      const subtaskMatch = line.match(/^\s+[-*]\s*\[([x ])\]\s*(.+)/i);
      if (subtaskMatch && currentTask) {
        currentTask.subtasks = currentTask.subtasks || [];
        currentTask.subtasks.push({
          id: `${currentTask.id}.${currentTask.subtasks.length + 1}`,
          title: subtaskMatch[2].trim(),
          status: subtaskMatch[1].toLowerCase() === 'x' ? 'done' : 'pending',
        });
      }
    }

    if (currentTask) tasks.push(currentTask);
    return tasks;
  }

  private generateSpecId(story: IAiosStory): string {
    // Try to extract from path (e.g., 1.2.story.md -> 001-002)
    if (story._sourcePath) {
      const match = story._sourcePath.match(/(\d+)\.(\d+)\.story\.md$/i);
      if (match) {
        return `${match[1].padStart(3, '0')}-${match[2].padStart(3, '0')}`;
      }
    }
    // Generate timestamp-based ID
    return String(Date.now()).slice(-6);
  }

  private buildTitle(storyData: IAiosStory['story']): string {
    if (storyData.action) {
      return storyData.action.charAt(0).toUpperCase() + storyData.action.slice(1);
    }
    return 'Untitled Story';
  }

  private buildDescription(story: IAiosStory): string {
    const parts: string[] = [];

    if (story.story.role || story.story.action || story.story.benefit) {
      parts.push(`As a ${story.story.role}, I want ${story.story.action} so that ${story.story.benefit}.`);
    }

    if (story.technicalNotes) {
      parts.push(`\n\n## Technical Context\n${story.technicalNotes}`);
    }

    return parts.join('');
  }

  private determinePriority(story: IAiosStory): IAutoClaudeSpec['priority'] {
    if (story.status === 'Approved' || story.status === 'In Progress') {
      return 'high';
    }
    if (story.status === 'Ready') {
      return 'medium';
    }
    return 'low';
  }

  private estimateComplexity(story: IAiosStory): IAutoClaudeSpec['estimatedComplexity'] {
    const acCount = story.acceptanceCriteria.length;
    const taskCount = story.tasksSubtasks?.length || 0;
    const hasSubtasks = story.tasksSubtasks?.some(t => t.subtasks && t.subtasks.length > 0);

    if (acCount > 5 || taskCount > 5 || hasSubtasks) {
      return 'complex';
    }
    if (acCount > 2 || taskCount > 2) {
      return 'moderate';
    }
    return 'simple';
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 50);
  }

  private generateSpecMarkdown(spec: IAutoClaudeSpec): string {
    const lines: string[] = [
      `# ${spec.title}`,
      '',
      `**ID:** ${spec.id}`,
      `**Priority:** ${spec.priority}`,
      `**Complexity:** ${spec.estimatedComplexity || 'unknown'}`,
      '',
      '## Description',
      '',
      spec.description,
      '',
      '## Requirements',
      '',
    ];

    for (const req of spec.requirements) {
      lines.push(`### ${req.id}: ${req.description}`);
      lines.push(`- Type: ${req.type}`);
      lines.push(`- Priority: ${req.priority}`);
      lines.push(`- Testable: ${req.testable ? 'Yes' : 'No'}`);
      lines.push('');
    }

    if (spec.context) {
      lines.push('## Context');
      lines.push('');
      lines.push(spec.context);
      lines.push('');
    }

    if (spec.constraints && spec.constraints.length > 0) {
      lines.push('## Out of Scope');
      lines.push('');
      for (const constraint of spec.constraints) {
        lines.push(`- ${constraint}`);
      }
      lines.push('');
    }

    return lines.join('\n');
  }
}

export default AiosToSpecAdapter;
