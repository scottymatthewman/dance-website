#!/usr/bin/env node
/**
 * Dev server with live font-subset sync when copy files change.
 * Usage: node scripts/dev.mjs [--webpack]
 */
import { spawn, spawnSync } from "node:child_process";
import { existsSync, readdirSync, statSync, utimesSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { SCAN_DIRS, SCAN_EXT } from "./font-glyphs.mjs";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const useWebpack = process.argv.includes("--webpack");
const layoutPath = join(root, "app/layout.tsx");

let debounceTimer;
let running = false;
let queued = false;

function walkCopyFiles(dir, files = []) {
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      if (entry === "node_modules" || entry === ".next" || entry === "fonts") continue;
      walkCopyFiles(path, files);
    } else if (SCAN_EXT.has(entry.slice(entry.lastIndexOf(".")))) {
      files.push(path);
    }
  }
  return files;
}

function touchLayout() {
  const now = new Date();
  utimesSync(layoutPath, now, now);
}

function runEnsure() {
  const result = spawnSync("node", ["scripts/ensure-font-subset.mjs", "--quiet"], {
    cwd: root,
    stdio: "pipe",
    encoding: "utf8",
  });

  if (result.status === 1) {
    process.stderr.write(result.stderr || result.stdout || "Font subset check failed.\n");
    return;
  }

  if (result.status === 2) {
    console.log("Font subset: updated — reloading fonts…");
    touchLayout();
  }
}

function scheduleEnsure() {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    debounceTimer = null;
    if (running) {
      queued = true;
      return;
    }
    running = true;
    runEnsure();
    running = false;
    if (queued) {
      queued = false;
      scheduleEnsure();
    }
  }, 400);
}

function watchCopyTree() {
  for (const dir of SCAN_DIRS) {
    const abs = join(root, dir);
    if (!existsSync(abs)) continue;

    for (const file of walkCopyFiles(abs)) {
      let lastMtime = statSync(file).mtimeMs;

      const interval = setInterval(() => {
        if (!existsSync(file)) return;
        const mtime = statSync(file).mtimeMs;
        if (mtime !== lastMtime) {
          lastMtime = mtime;
          scheduleEnsure();
        }
      }, 500);

      process.on("exit", () => clearInterval(interval));
    }
  }
}

// Initial sync before dev server starts.
spawnSync("node", ["scripts/ensure-font-subset.mjs", "--quiet"], {
  cwd: root,
  stdio: "inherit",
});

const nextArgs = useWebpack ? ["dev", "--webpack"] : ["dev"];
const next = spawn("npx", ["next", ...nextArgs], {
  cwd: root,
  stdio: "inherit",
  env: process.env,
});

watchCopyTree();

next.on("exit", (code) => {
  process.exit(code ?? 0);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => next.kill(signal));
}
