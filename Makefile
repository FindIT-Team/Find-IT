start-dev:
	@docker-compose -f docker-compose.dev.yml -p findit build --no-cache --quiet
	@docker-compose -f docker-compose.dev.yml -p findit watch --quiet

start-prod:
	@docker-compose -f docker-compose.prod.yml -p findit up -d

start-test:
	@docker-compose -f docker-compose.test.yml -p findit-test build --no-cache --quiet
	@docker-compose -f docker-compose.test.yml -p findit-test run backend npm run test --detectOpenHandles
	@docker-compose -p findit-test down --remove-orphans -v
	@docker image prune --filter "label=env=test" -f -a

stop:
	@docker-compose -p findit down --remove-orphans -v

cleanup:
	@docker system prune -a