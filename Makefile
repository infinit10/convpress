
.PHONY: help
help:
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@echo "Available targets:"
	@echo "  dev              Run Vite and flask dev server"
	@echo "  build     				Build Docker image for production"
	@echo "  clean            Remove dist/ and Docker images/containers"
	@echo ""

dev:
	bash scripts/start-dev.sh

build:
	docker compose build

clean:
	docker image rm convpress-frontend:latest convpress-backend:latest