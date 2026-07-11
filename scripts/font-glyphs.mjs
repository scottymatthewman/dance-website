import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

export const MANIFEST_PATH = join(root, "scripts/font-glyph-manifest.txt");

export const SCAN_DIRS = ["app", "components", "lib", "hooks"];
export const SCAN_EXT = new Set([".ts", ".tsx"]);

/** Punctuation always included in the subset beyond scanned source. */
export const BASELINE_CHARS =
  " \n\t·–—…''\"@#$%&*+=<>[](){}|\\/:;!?.,-_0123456789";

export function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      if (entry === "node_modules" || entry === ".next" || entry === "fonts") {
        continue;
      }
      walk(path, files);
    } else if (SCAN_EXT.has(entry.slice(entry.lastIndexOf(".")))) {
      files.push(path);
    }
  }
  return files;
}

export function charsFromText(text) {
  const chars = new Set();
  for (const char of text) {
    const code = char.codePointAt(0);
    if (code === undefined || code < 32) continue;
    chars.add(char);
  }
  return chars;
}

export function collectGlyphsFromSource() {
  const chars = charsFromText(BASELINE_CHARS);
  for (const dir of SCAN_DIRS) {
    const abs = join(root, dir);
    if (!existsSync(abs)) continue;
    for (const file of walk(abs)) {
      for (const char of charsFromText(readFileSync(file, "utf8"))) {
        chars.add(char);
      }
    }
  }
  return [...chars].sort((a, b) => a.codePointAt(0) - b.codePointAt(0));
}

export function writeManifest(glyphs) {
  writeFileSync(MANIFEST_PATH, glyphs.join(""), "utf8");
}

export function readManifest() {
  if (!existsSync(MANIFEST_PATH)) {
    throw new Error(
      `Missing ${MANIFEST_PATH}. Run: npm run subset-fonts`,
    );
  }
  return charsFromText(readFileSync(MANIFEST_PATH, "utf8"));
}

export function formatChar(char) {
  const code = char.codePointAt(0);
  if (code === undefined) return "?";
  if (char === "\n") return "\\n";
  if (char === "\t") return "\\t";
  if (char === " ") return "space";
  if (code < 128 && char >= " ") return `'${char}'`;
  return `'${char}' (U+${code.toString(16).toUpperCase().padStart(4, "0")})`;
}
