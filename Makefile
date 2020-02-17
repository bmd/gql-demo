install:
	npm install
	docker pull genschsa/mysql-employees
	chmod +x run_db.sh

lint:
	npx standard --fix

start-db:
	./run_db.sh

debug: lint start-db
	npm run transpile
	npm run start:watch
