# Copyright (C) 2019-2022 CZ.NIC z.s.p.o. (https://www.nic.cz/)
#
# This is free software, licensed under the GNU General Public License v3.
# See /LICENSE for more information.

PROJECT="Foris JS"
# Retrieve Foris JS version from package.json 
VERSION= $(shell sed -En "s/.*version['\"]: ['\"](.+)['\"].*/\1/p" package.json)
COPYRIGHT_HOLDER="CZ.NIC, z.s.p.o. (https://www.nic.cz/)"
MSGID_BUGS_ADDRESS="tech.support@turris.cz"

DEV_PYTHON=python3
VENV_NAME?=venv
VENV_BIN=$(shell pwd)/$(VENV_NAME)/bin

.PHONY: all
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


# Preparation

.PHONY: venv
venv: $(VENV_NAME)/bin/activate
$(VENV_NAME)/bin/activate:
	test -d $(VENV_NAME) || $(DEV_PYTHON) -m virtualenv -p $(DEV_PYTHON) $(VENV_NAME)
	$(VENV_BIN)/$(DEV_PYTHON) -m pip install -r requirements.txt
	touch $(VENV_NAME)/bin/activate


# Installation

.PHONY: install-js
install-js: package.json
	npm install --save-dev


# Publishing

.PHONY: collect-files
collect-files:
	sh scripts/collect_files.sh

.PHONY: pack
pack: collect-files
	cd dist && npm pack

.PHONY: publish-beta
publish-beta: collect-files
	sh scripts/publish.sh beta

.PHONY: publish-latest
publish-latest: collect-files
	sh scripts/publish.sh latest


# Linting

.PHONY: lint
lint:
	npm run lint

.PHONY: lint-js-fix
lint-js-fix:
	npm run lint:fix


# Testing

.PHONY: test
test:
	npm test

.PHONY: test-js-watch
test-js-watch:
	cd $(JS_DIR); npm test -- --watch

.PHONY: test-js-update-snapshots
test-js-update-snapshots:
	npm test -- -u


# Translations

.PHONY: create-messages
create-messages: venv
	$(VENV_BIN)/pybabel extract -F babel.cfg -o ./translations/forisjs.pot . --project=$(PROJECT) --version=$(VERSION) --copyright-holder=$(COPYRIGHT_HOLDER) --msgid-bugs-address=$(MSGID_BUGS_ADDRESS)

.PHONY: update-messages
update-messages: venv
	$(VENV_BIN)/pybabel update -i ./translations/forisjs.pot -d ./translations -D forisjs --update-header-comment


# Documentation

.PHONY: docs
docs:
	npm run-script docs

.PHONY: docs-watch
docs-watch:
	npm run-script docs:watch


# Other

.PHONY: clean
clean:
	rm -rf node_modules dist
