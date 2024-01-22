start-dev:
	docker-compose -f docker-compose.dev.yml -p findit up -d --build

start-prod:
	docker-compose -f docker-compose.prod.yml -p findit up -d --build

start-test:
	docker-compose -f docker-compose.test.yml -p findit-test run --rm backend npm run test --detectOpenHandles
	docker-compose -p findit-test down --remove-orphans -v

cleanup:
	docker system prune -a