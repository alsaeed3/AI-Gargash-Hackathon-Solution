#!/usr/bin/env node

// Simple script to build Next.js app without type checking
const { spawnSync } = require('child_process');

console.log('Building Next.js app without type checking...');

// Set environment variable to disable type checking
process.env.NEXT_DISABLE_TYPECHECK = 'true';

// Run Next.js build with linting disabled
const result = spawnSync('npx', ['next', 'build', '--no-lint'], {
  stdio: 'inherit',
  env: { ...process.env }
});

process.exit(result.status);