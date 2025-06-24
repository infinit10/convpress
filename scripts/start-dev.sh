#!/bin/bash
set -e

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