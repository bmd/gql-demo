install:
	npm install
	docker pull genschsa/mysql-employees

lint:
	npx standard --fix

start:
	npm run transpile
	npm run start

watch:
	npm run transpile
	npm run start:watch
