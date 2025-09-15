include .env

IMAGE_NAME = otus-qa-js

test_build:
	docker build -t $(IMAGE_NAME) -f docker/Dockerfile .

test_shell:
	docker run --rm -v "$(PWD):/app" -v /app/node_modules -it $(IMAGE_NAME) bash

test_run:
	docker run \
		-e BOOKSTORE_API_URL="$(BOOKSTORE_API_URL)" \
		--rm \
		--memory=2G \
		--cpus=4 \
		$(IMAGE_NAME) \
		sh -c "NODE_OPTIONS=\"--max-old-space-size=2048\" npx jest"
