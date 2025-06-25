#!/bin/bash
set -e

if ! command -v gs &> /dev/null; then
  echo "gs command not found. Installing Ghostscript...."

  if [[ "$OSTYPE" == "darwin"* ]]; then
    brew install ghostscript
  elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    sudo apt-get update && sudo apt-get install -y ghostscript
  else
    echo "For windows, please install Ghostscript manually."
    echo "Download from: https://www.ghostscript.com/download/gsdnld.html"
    exit 1
  fi
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

if [[ $(pwd) != "$PROJECT_ROOT" ]]; then
  echo "Changing directory to project root: $PROJECT_ROOT"
  cd "$PROJECT_ROOT"
fi

# Start backend
(cd backend && flask --app=main.py run) &

# Start frontend
(cd frontend && npm run dev) &

# Wait for both processes
wait