.PHONY: all create-messages update-messages clean

all:
	@echo "make create-messages"
	@echo "    Create locale messages (.pot)."
	@echo "make update-messages"
	@echo "    Update locale messages from .pot file."
	@echo "make clean"
	@echo "    Remove python artifacts and virtualenv."

create-messages:
	pybabel extract -F babel.cfg -o ./translations/forisjs.pot .
update-messages:
	pybabel update -i translations/forisjs.pot -d translations

clean:
	rm -rf node_modules dist
