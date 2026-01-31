/**
 * Adapters Module
 *
 * Exports all adapters for format conversion between systems
 */

export * from './interfaces/index.js';

export { AiosToSpecAdapter } from './aios-to-spec.adapter.js';
export { SpecToPrdAdapter } from './spec-to-prd.adapter.js';
export { AiosToPrdAdapter } from './aios-to-prd.adapter.js';
export { RalphExecutor, type RalphExecutorConfig } from './ralph-executor.js';

import { AiosToSpecAdapter } from './aios-to-spec.adapter.js';
import { SpecToPrdAdapter } from './spec-to-prd.adapter.js';
import { AiosToPrdAdapter } from './aios-to-prd.adapter.js';
import type { IAdapterFactory } from './interfaces/index.js';

/**
 * Adapter Factory
 * Creates and provides access to all adapters
 */
export class AdapterFactory implements IAdapterFactory {
  private aiosToSpec: AiosToSpecAdapter | null = null;
  private specToPrd: SpecToPrdAdapter | null = null;
  private aiosToPrd: AiosToPrdAdapter | null = null;

  getAiosToSpec(): AiosToSpecAdapter {
    if (!this.aiosToSpec) {
      this.aiosToSpec = new AiosToSpecAdapter();
    }
    return this.aiosToSpec;
  }

  getSpecToPrd(): SpecToPrdAdapter {
    if (!this.specToPrd) {
      this.specToPrd = new SpecToPrdAdapter();
    }
    return this.specToPrd;
  }

  getAiosToPrd(): AiosToPrdAdapter {
    if (!this.aiosToPrd) {
      this.aiosToPrd = new AiosToPrdAdapter();
    }
    return this.aiosToPrd;
  }

  getUnifiedTask(): never {
    // Unified task adapter delegates to specific adapters based on input detection
    throw new Error('UnifiedTaskAdapter not yet implemented');
  }
}

export default AdapterFactory;
