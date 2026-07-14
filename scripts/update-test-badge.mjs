#!/usr/bin/env node
/**
 * Update the tests badge in README.md with the current test count.
 *
 * Runs `vitest list` (collect-only, no execution) to count tests,
 * then rewrites the badge URL in README.md.
 *
 * Usage:
 *   node scripts/update-test-badge.mjs
 *   npm run badge
 */

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const README = join(ROOT, "README.md");
const BADGE_PATTERN =
  /https:\/\/img\.shields\.io\/badge\/tests-\d+_passed-brightgreen\.svg/;

function countTests() {
  try {
    const output = execFileSync("npx", ["vitest", "list", "--json"], {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    const start = output.indexOf("[");
    const end = output.lastIndexOf("]");
    if (start === -1 || end === -1) {
      return 0;
    }
    const parsed = JSON.parse(output.slice(start, end + 1));
    return Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    return 0;
  }
}

function updateBadge(count) {
  const content = readFileSync(README, "utf8");
  const newUrl = `https://img.shields.io/badge/tests-${count}_passed-brightgreen.svg`;
  if (!BADGE_PATTERN.test(content)) {
    console.log("Badge pattern not found in README.md — skipping update");
    return false;
  }
  const newContent = content.replace(BADGE_PATTERN, newUrl);
  if (newContent === content) {
    console.log(`Badge already up to date (${count} tests)`);
    return false;
  }
  writeFileSync(README, newContent);
  console.log(`Updated README.md badge -> ${count} tests`);
  return true;
}

const count = countTests();
if (count > 0) {
  updateBadge(count);
} else {
  console.log("Could not count tests — skipping badge update");
  process.exit(1);
}
