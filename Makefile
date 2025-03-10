ifneq (,$(wildcard .env))
    include .env
    export
endif

# Comandos do Prisma
MIGRATE=npx prisma migrate
GENERATE=npx prisma generate
STUDIO=npx prisma studio
DB_PUSH=npx prisma db push
SEED=npx node prisma/seed.js
FORMAT=npx prisma format

# Alvos principais
.PHONY: migrate generate studio db-push seed format

migrate:
	$(MIGRATE) dev

migrate-prod:
	$(MIGRATE) deploy

generate:
	$(GENERATE)

studio:
	$(STUDIO)

db-push:
	$(DB_PUSH)

seed:
	$(SEED)

format:
	$(FORMAT)
