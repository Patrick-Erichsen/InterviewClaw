const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const os = require('os');

const { createWorkspace } = require('../skills/interviewclaw-init/scripts/create-workspace');

function tmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'iclaw-test-'));
}

test('creates all expected directories', () => {
  const tmp = tmpDir();
  try {
    createWorkspace(tmp);
    const expected = [
      'job-search',
      'job-search/results',
      'companies',
      'practice',
      'practice/scaffolds',
      'practice/problems',
      'roadmap',
      'roadmap/archive',
    ];
    for (const dir of expected) {
      const full = path.join(tmp, dir);
      assert.ok(fs.existsSync(full), `missing: ${dir}`);
      assert.ok(fs.statSync(full).isDirectory(), `not a directory: ${dir}`);
    }
  } finally {
    fs.rmSync(tmp, { recursive: true });
  }
});

test('creates seen-jobs.json with empty array', () => {
  const tmp = tmpDir();
  try {
    createWorkspace(tmp);
    const seenJobs = path.join(tmp, 'job-search', 'seen-jobs.json');
    assert.ok(fs.existsSync(seenJobs), 'seen-jobs.json missing');
    assert.deepStrictEqual(JSON.parse(fs.readFileSync(seenJobs, 'utf8')), []);
  } finally {
    fs.rmSync(tmp, { recursive: true });
  }
});

test('is idempotent — running twice does not throw', () => {
  const tmp = tmpDir();
  try {
    createWorkspace(tmp);
    assert.doesNotThrow(() => createWorkspace(tmp));
  } finally {
    fs.rmSync(tmp, { recursive: true });
  }
});

test('does not overwrite existing seen-jobs.json', () => {
  const tmp = tmpDir();
  try {
    createWorkspace(tmp);
    const seenJobs = path.join(tmp, 'job-search', 'seen-jobs.json');
    const prior = JSON.stringify([{ company: 'Stripe', title: 'Software Engineer', url: 'https://stripe.com/jobs/1', date_found: '2025-01-01' }]);
    fs.writeFileSync(seenJobs, prior, 'utf8');
    createWorkspace(tmp);
    assert.strictEqual(fs.readFileSync(seenJobs, 'utf8'), prior);
  } finally {
    fs.rmSync(tmp, { recursive: true });
  }
});
