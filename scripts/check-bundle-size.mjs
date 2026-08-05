#!/usr/bin/env node
/**
 * Bundle-size budget guard. Runs after `vite build` and fails the build when
 * the produced assets regress past the budgets below.
 *
 * Budgets are gzipped sizes in kilobytes.
 */
import { gzipSync } from "node:zlib";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const DIST = path.resolve("dist");

const BUDGETS_KB = {
  totalJs: 600,
  totalCss: 120,
  largestJsChunk: 480,
};

const walk = (dir) =>
  readdirSync(dir).flatMap((entry) => {
    const full = path.join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

const gzipKb = (file) => gzipSync(readFileSync(file)).length / 1024;

const files = walk(DIST);
const js = files.filter((f) => f.endsWith(".js"));
const css = files.filter((f) => f.endsWith(".css"));

const jsSizes = js.map((f) => ({ file: path.relative(DIST, f), kb: gzipKb(f) }));
const cssSizes = css.map((f) => ({ file: path.relative(DIST, f), kb: gzipKb(f) }));

const sum = (rows) => rows.reduce((acc, r) => acc + r.kb, 0);
const totalJs = sum(jsSizes);
const totalCss = sum(cssSizes);
const largestJsChunk = jsSizes.reduce((max, r) => Math.max(max, r.kb), 0);

const fmt = (n) => `${n.toFixed(1)} kB`;

console.log("Bundle report (gzipped):");
for (const row of [...jsSizes, ...cssSizes].sort((a, b) => b.kb - a.kb)) {
  console.log(`  ${row.file.padEnd(48)} ${fmt(row.kb)}`);
}

const checks = [
  ["total JS", totalJs, BUDGETS_KB.totalJs],
  ["total CSS", totalCss, BUDGETS_KB.totalCss],
  ["largest JS chunk", largestJsChunk, BUDGETS_KB.largestJsChunk],
];

let failed = false;
console.log("\nBudgets:");
for (const [label, actual, budget] of checks) {
  const ok = actual <= budget;
  if (!ok) failed = true;
  console.log(
    `  ${ok ? "PASS" : "FAIL"}  ${label}: ${fmt(actual)} (budget ${fmt(budget)})`
  );
}

if (failed) {
  console.error("\nBundle size budget exceeded — build failed.");
  process.exit(1);
}
console.log("\nAll bundle budgets met.");
