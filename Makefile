run: ## Run container on port configured in `config.env`
	@echo "Database is up"
	@docker run -itd --name picking-postgres-v1 -e POSTGRES_DB=picking-v1 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 54321:5432  postgres
	@ultil docker exec picking-postgres-v1 pg_isready; do sleep 1; done
	@echo "Database is running"

run: ## Run container on port configured in `config.env`
	@echo "Database is up"
	@docker run -itd --name picking-postgres-testing -e POSTGRES_DB=testing -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5431:5432  postgres
	@ultil docker exec picking-postgres-testing pg_isready; do sleep 1; done
	@echo "Database is running"

