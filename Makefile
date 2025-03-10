install:
		npm ci
build:
		npm run build
publish:
		npm publish --dry-run
lint:
		npx eslint --fix src/*.js