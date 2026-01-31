/**
 * AIOS + Auto-Claude + Ralph Stack
 *
 * Main entry point for the integrated stack
 */

// Re-export adapters
export * from './adapters/index.js';

// Re-export orchestration
export * from './orchestrator/index.js';

// Version info
export const VERSION = '1.0.0';
export const STACK_NAME = 'aios-ralph-autoclaude-stack';
