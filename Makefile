install: install-deps

run:
	npx babel-node src/bin/gendiff.js

install-deps:
	yarn install

build:
	rm -rf dist
	yarn run build

test:
	yarn test

lint:
	npx eslint .

publish:
	npm publish

publish-dry:
	npm publish --dry-run

.PHONY: test
