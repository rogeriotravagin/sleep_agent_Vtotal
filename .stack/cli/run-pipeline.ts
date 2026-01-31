#!/usr/bin/env node
/**
 * CLI Runner for Stack Pipeline
 *
 * Usage:
 *   npx tsx cli/run-pipeline.ts --story path/to/story.md
 *   npx tsx cli/run-pipeline.ts --batch path/to/stories/ --parallel 3
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { Pipeline } from '../orchestrator/pipeline.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface CliArgs {
  story?: string;
  batch?: string;
  parallel: number;
  maxIter: number;
  dryRun: boolean;
  verbose: boolean;
  help: boolean;
}

function parseArgs(): CliArgs {
  const args: CliArgs = {
    parallel: 1,
    maxIter: 30,
    dryRun: false,
    verbose: false,
    help: false,
  };

  const argv = process.argv.slice(2);

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const next = argv[i + 1];

    switch (arg) {
      case '--story':
      case '-s':
        args.story = next;
        i++;
        break;
      case '--batch':
      case '-b':
        args.batch = next;
        i++;
        break;
      case '--parallel':
      case '-p':
        args.parallel = parseInt(next, 10) || 1;
        i++;
        break;
      case '--max-iter':
      case '-m':
        args.maxIter = parseInt(next, 10) || 30;
        i++;
        break;
      case '--dry-run':
      case '-d':
        args.dryRun = true;
        break;
      case '--verbose':
      case '-v':
        args.verbose = true;
        break;
      case '--help':
      case '-h':
        args.help = true;
        break;
    }
  }

  return args;
}

function printUsage(): void {
  console.log(`
Stack Pipeline CLI

Usage:
  npx tsx cli/run-pipeline.ts [OPTIONS]

Options:
  -s, --story PATH      Process a single story file
  -b, --batch DIR       Process all .story.md files in directory
  -p, --parallel N      Number of parallel executions (default: 1)
  -m, --max-iter N      Maximum Ralph iterations (default: 30)
  -d, --dry-run         Simulate execution without running Ralph
  -v, --verbose         Verbose output
  -h, --help            Show this help

Examples:
  npx tsx cli/run-pipeline.ts --story docs/stories/1.1.story.md
  npx tsx cli/run-pipeline.ts --batch docs/stories/ --parallel 3
  npx tsx cli/run-pipeline.ts --story story.md --dry-run --verbose
`);
}

async function findStories(dir: string): Promise<string[]> {
  const stories: string[] = [];

  async function scan(currentDir: string): Promise<void> {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        await scan(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.story.md')) {
        stories.push(fullPath);
      }
    }
  }

  await scan(dir);
  return stories.sort();
}

async function main(): Promise<void> {
  const args = parseArgs();

  if (args.help) {
    printUsage();
    process.exit(0);
  }

  if (!args.story && !args.batch) {
    console.error('Error: Either --story or --batch must be specified');
    printUsage();
    process.exit(1);
  }

  // Resolve paths
  const stackDir = path.resolve(__dirname, '..');
  const projectRoot = path.resolve(stackDir, '..');
  const configPath = path.join(stackDir, 'config', 'stack-config.yaml');

  // Load config
  console.log('Loading stack configuration...');
  const config = await Pipeline.loadConfig(configPath);

  // Override config with CLI args
  config.ralph.maxIterations = args.maxIter;
  config.pipeline.batchSize = args.parallel;

  if (args.parallel > 1) {
    config.pipeline.mode = 'parallel';
  }

  // Create pipeline
  const pipeline = new Pipeline(config, projectRoot);

  // Register event handlers
  pipeline.onEvent((event) => {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];

    switch (event.type) {
      case 'start':
        console.log(`\n[${timestamp}] 🚀 ${event.message}`);
        break;
      case 'phase':
        console.log(`[${timestamp}] 📍 Phase: ${event.phase} - ${event.message}`);
        break;
      case 'progress':
        if (args.verbose) {
          console.log(`[${timestamp}] ⏳ ${event.message}`);
        }
        break;
      case 'complete':
        console.log(`[${timestamp}] ✅ ${event.message}`);
        break;
      case 'error':
        console.error(`[${timestamp}] ❌ ${event.message}`);
        break;
    }
  });

  // Health check
  console.log('Running health check...');
  const health = await pipeline.healthCheck();

  if (!health.healthy) {
    console.error('Health check failed:');
    for (const [component, ok] of Object.entries(health.components)) {
      console.error(`  ${ok ? '✓' : '✗'} ${component}`);
    }
    process.exit(1);
  }

  console.log('All components healthy ✓\n');

  // Collect stories to process
  let storyPaths: string[] = [];

  if (args.story) {
    const storyPath = path.resolve(args.story);
    try {
      await fs.access(storyPath);
      storyPaths = [storyPath];
    } catch {
      console.error(`Story file not found: ${storyPath}`);
      process.exit(1);
    }
  } else if (args.batch) {
    const batchDir = path.resolve(args.batch);
    try {
      storyPaths = await findStories(batchDir);
      console.log(`Found ${storyPaths.length} stories in ${batchDir}`);
    } catch (error) {
      console.error(`Failed to scan directory: ${batchDir}`);
      process.exit(1);
    }
  }

  if (storyPaths.length === 0) {
    console.error('No stories to process');
    process.exit(1);
  }

  // Dry run mode
  if (args.dryRun) {
    console.log('\n=== DRY RUN MODE ===\n');
    console.log('Would process the following stories:');
    storyPaths.forEach((p, i) => console.log(`  ${i + 1}. ${path.relative(projectRoot, p)}`));
    console.log('\nConfiguration:');
    console.log(`  Max iterations: ${args.maxIter}`);
    console.log(`  Parallel: ${args.parallel}`);
    console.log(`  Mode: ${config.pipeline.mode}`);
    process.exit(0);
  }

  // Process stories
  console.log(`Processing ${storyPaths.length} stories...`);
  console.log(`Mode: ${config.pipeline.mode}, Parallel: ${args.parallel}\n`);

  const startTime = Date.now();
  const results = await pipeline.processBatch(storyPaths);
  const duration = Date.now() - startTime;

  // Summary
  const succeeded = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success).length;

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('                      EXECUTION SUMMARY');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`  Total:     ${results.length}`);
  console.log(`  Succeeded: ${succeeded}`);
  console.log(`  Failed:    ${failed}`);
  console.log(`  Duration:  ${(duration / 1000).toFixed(1)}s`);
  console.log('═══════════════════════════════════════════════════════════════\n');

  // Show failed tasks
  if (failed > 0) {
    console.log('Failed tasks:');
    results
      .filter((r) => !r.success)
      .forEach((r) => {
        console.log(`  ✗ ${r.taskId}: ${r.error?.message || 'Unknown error'}`);
      });
  }

  process.exit(failed > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
