#!/usr/bin/env bash
set -e

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

SRC="$ROOT_DIR/src/index.js"
OUT="$ROOT_DIR/dist/bundle.js"

mkdir -p "$ROOT_DIR/dist"

echo "[*] Using frida-compile"
frida-compile "$SRC" -o "$OUT"

echo "[+] Build done"
