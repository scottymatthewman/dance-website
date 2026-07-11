#!/bin/sh
# Auto-install git hooks when inside a git repo (runs via npm prepare).
set -e

if ! git rev-parse --git-dir >/dev/null 2>&1; then
  exit 0
fi

chmod +x .githooks/pre-commit
git config core.hooksPath .githooks
