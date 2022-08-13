run: ## Run container on port configured in `config.env`
	@echo "Database is up"
	@docker run -itd --name picking-postgres -e POSTGRES_DB=picking -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 54321:5432  postgres
	@ultil docker exec picking-postgres pg_isready; do sleep 1; done
	@echo "Database is running"

