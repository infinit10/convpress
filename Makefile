.PHONY: help dev build build-web clean ts_lint py_lint lint

help:
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@echo "Development:"
	@echo "  dev                       Run Vite and Flask dev server"
	@echo ""
	@echo "Build:"
	@echo "  build-local               Build Docker image for local development"
	@echo "  build-web                 Build frontend for production"
	@echo ""
	@echo "Deploy:"
	@echo "  deploy-web                Deploy frontend to Cloudflare Pages"
	@echo ""
	@echo "Dependencies:"
	@echo "  install-web-dependencies  Install frontend npm dependencies"
	@echo ""
	@echo "Linting:"
	@echo "  ts_lint                   Run TypeScript linter"
	@echo "  py_lint                   Run Python linter"
	@echo "  lint                      Run all linters"
	@echo ""
	@echo "Cleanup:"
	@echo "  clean                     Remove Docker images"
	@echo ""

dev:
	bash scripts/start-dev.sh

build-local:
	docker compose build

install-web-dependencies:
	cd frontend && npm install

install-server-dependencies:
	cd backend && pip install -r requirements.txt

build-web:
	cd frontend && npm run build

deploy-web:
	cd frontend && npm run deploy

clean:
	docker image rm convpress-frontend:latest convpress-backend:latest || true

ts_lint:
	cd frontend && npm run lint
	@echo "TypeScript Linting completed.\n"

py_lint:
	cd backend && ruff check .
	@echo "Python Linting completed.\n"

lint: ts_lint py_lint
