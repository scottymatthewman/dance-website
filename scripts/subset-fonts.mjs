#!/usr/bin/env node
/**
 * Subset Gen Interface JP fonts to glyphs used on the marketing site.
 * Run: npm run subset-fonts
 */
import { execFileSync } from "node:child_process";
import { statSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  collectGlyphsFromSource,
  writeManifest,
} from "./font-glyphs.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fontsDir = join(root, "app/fonts");

const FONT_JOBS = [
  {
    dir: "gen-interface-jp",
    weights: [
      {
        src: "_source/GenInterfaceJP-Regular.ttf",
        out: "GenInterfaceJP-Regular.woff2",
      },
      {
        src: "_source/GenInterfaceJP-Medium.ttf",
        out: "GenInterfaceJP-Medium.woff2",
      },
    ],
  },
  {
    dir: "gen-interface-jp-display",
    weights: [
      {
        src: "_source/GenInterfaceJPDisplay-Regular.ttf",
        out: "GenInterfaceJPDisplay-Regular.woff2",
      },
      {
        src: "_source/GenInterfaceJPDisplay-Medium.ttf",
        out: "GenInterfaceJPDisplay-Medium.woff2",
      },
    ],
  },
];

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

const glyphs = collectGlyphsFromSource();
const unicodesPath = join(root, "scripts/.font-glyphs.txt");
writeFileSync(unicodesPath, glyphs.join(""), "utf8");
writeManifest(glyphs);

console.log(`Collected ${glyphs.length} unique glyphs from source files.`);

let totalBefore = 0;
let totalAfter = 0;

for (const job of FONT_JOBS) {
  const familyDir = join(fontsDir, job.dir);
  for (const { src, out } of job.weights) {
    const input = join(familyDir, src);
    const output = join(familyDir, out);
    const before = statSync(input).size;
    totalBefore += before;

    execFileSync(
      "python3",
      [
        "-m",
        "fontTools.subset",
        input,
        `--text-file=${unicodesPath}`,
        `--output-file=${output}`,
        "--flavor=woff2",
        "--layout-features=*",
        "--glyph-names",
        "--symbol-cmap",
        "--legacy-cmap",
        "--notdef-glyph",
        "--notdef-outline",
        "--recommended-glyphs",
      ],
      { stdio: "inherit" },
    );

    const after = statSync(output).size;
    totalAfter += after;
    const savings = ((1 - after / before) * 100).toFixed(1);
    console.log(
      `${job.dir}/${out}: ${formatSize(before)} → ${formatSize(after)} (${savings}% smaller)`,
    );
  }
}

console.log(
  `\nTotal: ${formatSize(totalBefore)} → ${formatSize(totalAfter)} (${((1 - totalAfter / totalBefore) * 100).toFixed(1)}% smaller)`,
);
console.log(`Updated manifest: scripts/font-glyph-manifest.txt`);
