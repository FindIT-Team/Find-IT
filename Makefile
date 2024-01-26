start-dev:
	@docker compose -f docker-compose.dev.yml watch

start:
	@docker compose -f docker-compose.prod.yml up -d --build

test-backend:
	@docker compose -f docker-compose.test.yml run --rm backend npm run build
	@docker compose -f docker-compose.test.yml run --rm backend npm run test
	@docker image prune --filter "label=ENV=test" -f -a

test-frontend:
	@docker compose -f docker-compose.test.yml run --rm frontend npm run build
	@docker image prune --filter "label=ENV=test" -f -a

tests:
	@make test-backend
	@make test-frontend

stop:
	@docker compose -f docker-compose.test.yml -f docker-compose.dev.yml -f docker-compose.prod.yml down --remove-orphans -v

cleanup:
	@docker system prune -a