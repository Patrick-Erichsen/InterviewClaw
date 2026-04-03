#!/usr/bin/env node
// Creates the InterviewClaw workspace folder structure at the given path.
// Usage: node create-workspace.js <path>
// Cross-platform: works on macOS, Linux, and Windows.

const fs = require('fs');
const path = require('path');

const DIRS = [
  'job-search/results',
  'companies',
  'practice/scaffolds',
  'practice/problems',
  'roadmap/archive',
];

function createWorkspace(workspacePath) {
  for (const dir of DIRS) {
    fs.mkdirSync(path.join(workspacePath, dir), { recursive: true });
  }

  const seenJobsPath = path.join(workspacePath, 'job-search', 'seen-jobs.json');
  if (!fs.existsSync(seenJobsPath)) {
    fs.writeFileSync(seenJobsPath, '[]', 'utf8');
  }
}

if (require.main === module) {
  const workspacePath = process.argv[2];
  if (!workspacePath) {
    console.error('Usage: node create-workspace.js <path>');
    process.exit(1);
  }
  createWorkspace(path.resolve(workspacePath));
  console.log(`Workspace created at ${path.resolve(workspacePath)}`);
}

module.exports = { createWorkspace };
