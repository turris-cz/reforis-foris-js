.PHONY: all install-js watch-js build-js collect-files pack publish-beta publish-latest lint test test-js-update-snapshots create-messages update-messages docs docs-watch clean

DEV_PYTHON=python3.7
VENV_NAME?=venv
VENV_BIN=$(shell pwd)/$(VENV_NAME)/bin

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

venv: $(VENV_NAME)/bin/activate
$(VENV_NAME)/bin/activate:
	test -d $(VENV_NAME) || $(DEV_PYTHON) -m virtualenv -p $(DEV_PYTHON) $(VENV_NAME)
	$(VENV_BIN)/$(DEV_PYTHON) -m pip install -r requirements.txt
	touch $(VENV_NAME)/bin/activate

install-js: package.json
	npm install --save-dev

collect-files:
	sh scripts/collect_files.sh
pack: collect-files
	cd dist && npm pack
publish-beta: collect-files
	sh scripts/publish.sh beta
publish-latest: collect-files
	sh scripts/publish.sh latest

lint:
	npm run lint
lint-js-fix:
	npm run lint:fix

test:
	npm test
test-js-update-snapshots:
	npm test -- -u

create-messages: venv
	$(VENV_BIN)/pybabel extract -F babel.cfg -o ./translations/forisjs.pot .
update-messages: venv
	$(VENV_BIN)/pybabel update -i ./translations/forisjs.pot -d ./translations -D forisjs

docs:
	npm run-script docs
docs-watch:
	npm run-script docs:watch

clean:
	rm -rf node_modules dist
