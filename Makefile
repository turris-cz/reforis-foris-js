.PHONY: all install-js watch-js build-js lint-js test-js create-messages update-messages docs clean

all:
	@echo "make install-js"
	@echo "    Install dependencies"
	@echo "make watch-js"
	@echo "    Compile JS in watch mode."
	@echo "make build-js"
	@echo "    Compile JS."
	@echo "make lint-js"
	@echo "    Run linter"
	@echo "make test-js"
	@echo "    Run tests"
	@echo "make create-messages"
	@echo "    Create locale messages (.pot)."
	@echo "make update-messages"
	@echo "    Update locale messages from .pot file."
	@echo "make docs"
	@echo "    Build project documentation."
	@echo "make docs-watch"
	@echo "    Start styleguidist server."
	@echo "make clean"
	@echo "    Remove python artifacts and virtualenv."

install-js: package.json
	npm install --save-dev

watch-js:
	npm run build:watch
build-js:
	npm run build

lint:
	npm run lint

test:
	npm test

create-messages:
	pybabel extract -F babel.cfg -o ./translations/forisjs.pot .
update-messages:
	pybabel update -i translations/forisjs.pot -d translations

docs:
	npm run-script docs
docs-watch:
	npm run-script docs:watch

clean:
	rm -rf node_modules dist
