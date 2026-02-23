.PHONY: help dev build build-web clean ts_lint py_lint lint

help:
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@echo "Available targets:"
	@echo "  dev              Run Vite and Flask dev server"
	@echo "  build            Build Docker image for production"
	@echo "  build-web        Build and deploy frontend to Cloudflare Pages"
	@echo "  clean            Remove Docker images"
	@echo "  ts_lint          Run TypeScript linter"
	@echo "  py_lint          Run Python linter"
	@echo "  lint             Run both TypeScript and Python linters"
	@echo ""

dev:
	bash scripts/start-dev.sh

build:
	docker compose build

build-web:
	cd frontend && npm install && npm run deploy

clean:
	docker image rm convpress-frontend:latest convpress-backend:latest || true

ts_lint:
	cd frontend && npm run lint
	@echo "TypeScript Linting completed.\n"

py_lint:
	cd backend && ruff check .
	@echo "Python Linting completed.\n"

lint: ts_lint py_lint
