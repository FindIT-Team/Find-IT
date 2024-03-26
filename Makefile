migrate-dev:
	@make database-dev-start
	@make migrate-dev-build-run
	@make migrate-dev-copy
	@make migrate-dev-cleanup
	@make database-dev-cleanup

reset-dev:
	@make database-dev-start
	@make reset-dev-build-run
	@make reset-dev-copy
	@make reset-dev-cleanup
	@make database-dev-cleanup

migrate-dev-build-run:
	@echo "Building migrate..."
	@docker build --target migrate-development -t migrate-development --build-arg ENV=development -q .
	@echo "Running migrate..."
	@docker run -it --network=findit-development_default --name=migrate-dev migrate-development

migrate-dev-copy:
	@echo "Copying migrations..."
	@docker cp -q migrate-dev:/project/apps/backend/prisma ./applications/backend/
	@docker cp -q migrate-dev:/project/apps/backend/node_modules/.prisma/client ./node_modules/.prisma/

migrate-dev-cleanup:
	@echo "Removing migrate..."
	@docker rm migrate-dev
	@echo "Removing migrate image..."
	@docker rmi migrate-development

reset-dev-build-run:
	@echo "Building reset..."
	@docker build --target reset-development -t reset-development --build-arg ENV=development -q .
	@echo "Running reset..."
	@docker run -it --network=findit-development_default --name=reset-dev reset-development

reset-dev-copy:
	@echo "Copying migrations..."
	@docker cp -q reset-dev:/project/apps/backend/prisma ./applications/backend/
	@docker cp -q reset-dev:/project/apps/backend/node_modules/.prisma/client ./node_modules/.prisma/

reset-dev-cleanup:
	@echo "Removing reset..."
	@docker rm reset-dev
	@echo "Removing reset image..."
	@docker rmi reset-development

database-dev-start:
	@echo "Starting database..."
	@docker compose -f docker-compose.dev.yml --progress quiet up -d database

database-dev-cleanup:
	@echo "Removing database..."
	@docker compose -f docker-compose.dev.yml --progress quiet down
	@echo "Removing volumes..."
	@docker volume prune -f

start-dev:
	@echo "Starting development environment..."
	@docker compose -f docker-compose.dev.yml --progress tty watch

stop-dev:
	@echo "Copying OpenAPI..."
	@docker cp findit-development-backend-1:/project/apps/backend/openapi.json ./applications/backend/openapi.json
	@echo "Downing development environment..."
	@docker compose -f docker-compose.dev.yml --progress quiet down

