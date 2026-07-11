#!/usr/bin/env node
/**
 * Sync font subset to all copy on disk (staged or not).
 * Regenerates WOFF2 when source uses glyphs missing from the manifest.
 *
 * Usage:
 *   node scripts/ensure-font-subset.mjs           # dev/build — update locally
 *   node scripts/ensure-font-subset.mjs --stage     # pre-commit — update + git add
 *   node scripts/ensure-font-subset.mjs --quiet     # suppress success output
 */
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import {
  collectGlyphsFromSource,
  formatChar,
  readManifest,
} from "./font-glyphs.mjs";

const quiet = process.argv.includes("--quiet");
const stage = process.argv.includes("--stage");

function log(message) {
  if (!quiet) console.log(message);
}

function canAutoSubset() {
  if (!existsSync("app/fonts/gen-interface-jp/_source/GenInterfaceJP-Regular.ttf")) {
    return false;
  }
  try {
    execSync('python3 -c "import fontTools"', { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function getMissingGlyphs() {
  const manifest = readManifest();
  const sourceGlyphs = collectGlyphsFromSource();
  return sourceGlyphs.filter((char) => !manifest.has(char));
}

function fail(missing) {
  console.error("Copy on disk uses glyphs missing from the font subset:\n");
  for (const char of missing) {
    console.error(`  - ${formatChar(char)}`);
  }
  console.error("\nRestore TTF files to app/fonts/*/_source/ and install fonttools:");
  console.error("  pip3 install --break-system-packages fonttools brotli");
  process.exit(1);
}

let missing;
let needsInit = false;
try {
  missing = getMissingGlyphs();
} catch {
  if (!canAutoSubset()) {
    console.error("Missing scripts/font-glyph-manifest.txt. Run: npm run subset-fonts");
    process.exit(1);
  }
  needsInit = true;
  missing = [];
}

if (!needsInit && missing.length === 0) {
  process.exit(0);
}

if (!canAutoSubset()) {
  fail(missing);
}

log("Font subset: new glyphs detected — regenerating WOFF2 files...");
execSync("node scripts/subset-fonts.mjs", {
  stdio: quiet ? "ignore" : "inherit",
});

if (stage) {
  execSync(
    "git add app/fonts/gen-interface-jp/*.woff2 app/fonts/gen-interface-jp-display/*.woff2 scripts/font-glyph-manifest.txt",
    { stdio: "ignore" },
  );
  log("Font subset: updated and staged for commit.");
} else {
  log("Font subset: updated locally.");
}

// Verify the regeneration worked.
const stillMissing = getMissingGlyphs();
if (stillMissing.length > 0) {
  fail(stillMissing);
}

// Exit 2 when fonts were regenerated locally (dev watcher uses this).
if (!stage) {
  process.exit(2);
}
