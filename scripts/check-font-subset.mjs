#!/usr/bin/env node
/**
 * Check whether staged copy changes introduce glyphs outside the font subset.
 * Exit 0 = OK. Exit 1 = run npm run subset-fonts.
 *
 * Usage:
 *   node scripts/check-font-subset.mjs          # staged changes (default)
 *   node scripts/check-font-subset.mjs --all    # full source vs manifest (audit)
 */
import { execSync } from "node:child_process";
import {
  MANIFEST_PATH,
  SCAN_DIRS,
  charsFromText,
  collectGlyphsFromSource,
  formatChar,
  readManifest,
} from "./font-glyphs.mjs";

const mode = process.argv.includes("--all") ? "all" : "staged";

function getStagedAddedText() {
  try {
    const paths = SCAN_DIRS.join(" ");
    const diff = execSync(`git diff --cached --no-color -- ${paths}`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    if (!diff.trim()) return "";

    return diff
      .split("\n")
      .filter((line) => line.startsWith("+") && !line.startsWith("+++"))
      .map((line) => line.slice(1))
      .join("\n");
  } catch {
    return "";
  }
}

function findMissing(manifest, text) {
  const missing = new Set();
  for (const char of charsFromText(text)) {
    if (!manifest.has(char)) missing.add(char);
  }
  return [...missing].sort((a, b) => a.codePointAt(0) - b.codePointAt(0));
}

const manifest = readManifest();

if (mode === "all") {
  const sourceGlyphs = collectGlyphsFromSource();
  const missing = sourceGlyphs.filter((char) => !manifest.has(char));
  if (missing.length === 0) {
    console.log(
      `Font subset manifest is up to date (${manifest.size} glyphs in ${MANIFEST_PATH}).`,
    );
    process.exit(0);
  }
  console.error("Source uses glyphs missing from the font subset manifest:\n");
  for (const char of missing) {
    console.error(`  - ${formatChar(char)}`);
  }
  console.error("\nRun: npm run subset-fonts");
  process.exit(1);
}

const stagedText = getStagedAddedText();
if (!stagedText) {
  console.log("No staged copy changes in app/, components/, lib/, or hooks/.");
  process.exit(0);
}

const missing = findMissing(manifest, stagedText);
if (missing.length === 0) {
  console.log(
    `Staged copy changes only use glyphs already in the font subset (${manifest.size} glyphs).`,
  );
  process.exit(0);
}

console.error(
  "Staged copy changes introduce glyphs not in the current font subset:\n",
);
for (const char of missing) {
  console.error(`  - ${formatChar(char)}`);
}
console.error("\nRun: npm run subset-fonts");
console.error("Then stage the updated .woff2 files and scripts/font-glyph-manifest.txt");
process.exit(1);
