#!/usr/bin/env node
/**
 * Compress raster assets in public/ to WebP with a total budget (default 10 MB).
 * Run: npm run compress-images
 */
import { existsSync, readdirSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(fileURLToPath(import.meta.url), "..", "..");
const publicDir = join(root, "public");
const BUDGET_BYTES = Number(process.env.PUBLIC_RASTER_BUDGET_MB ?? 10) * 1024 * 1024;
const RASTER_EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      walk(path, files);
    } else if (RASTER_EXT.has(extname(entry).toLowerCase())) {
      files.push(path);
    }
  }
  return files;
}

function formatMb(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function totalRasterBytes(files) {
  return files.reduce((sum, file) => sum + statSync(file).size, 0);
}

async function toWebp(input, quality) {
  const output = join(
    dirname(input),
    `${basename(input, extname(input))}.webp`,
  );
  const image = sharp(input, { failOn: "none" });
  const buffer = await image.webp({ quality, effort: 6 }).toBuffer();
  writeFileSync(output, buffer);
  return output;
}

if (!existsSync(publicDir)) {
  console.error("public/ not found");
  process.exit(1);
}

const SKIP_DIRS = new Set(["flow", "use-cases"]);

function isSkippedPath(file) {
  const relative = file.replace(`${publicDir}/`, "");
  const topDir = relative.split("/")[0];
  return SKIP_DIRS.has(topDir);
}

const sources = walk(publicDir).filter((file) => {
  const ext = extname(file).toLowerCase();
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") return false;
  return !isSkippedPath(file);
});

for (const source of sources) {
  const quality = 82;
  const output = await toWebp(source, quality);
  const before = statSync(source).size;
  const after = statSync(output).size;
  unlinkSync(source);
  console.log(
    `${source.replace(`${root}/`, "")} → ${output.replace(`${root}/`, "")} (${formatMb(before)} → ${formatMb(after)})`,
  );
}

let rasterFiles = walk(publicDir);
let total = totalRasterBytes(rasterFiles);
let quality = 80;

while (total > BUDGET_BYTES && quality >= 40) {
  console.log(
    `\nRaster total ${formatMb(total)} exceeds ${formatMb(BUDGET_BYTES)} — recompressing at quality ${quality}…`,
  );
  for (const file of rasterFiles) {
    if (extname(file).toLowerCase() !== ".webp") continue;
    if (isSkippedPath(file)) continue;
    const buffer = await sharp(file).webp({ quality, effort: 6 }).toBuffer();
    writeFileSync(file, buffer);
  }
  rasterFiles = walk(publicDir);
  total = totalRasterBytes(rasterFiles);
  quality -= 10;
}

const manifestPath = join(root, "scripts/public-raster-budget.json");
writeFileSync(
  manifestPath,
  `${JSON.stringify(
    {
      budgetMb: BUDGET_BYTES / (1024 * 1024),
      totalMb: Number((total / (1024 * 1024)).toFixed(3)),
      files: rasterFiles.map((file) => ({
        path: file.replace(`${root}/`, ""),
        bytes: statSync(file).size,
      })),
    },
    null,
    2,
  )}\n`,
);

console.log(`\nRaster total: ${formatMb(total)} / ${formatMb(BUDGET_BYTES)} budget`);
if (total > BUDGET_BYTES) {
  console.error("Budget exceeded after compression.");
  process.exit(1);
}
