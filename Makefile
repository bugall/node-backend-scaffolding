online:
	git fetch && git reset --hard && git checkout origin/master && npm install --production && pm2 startOrRestart pm2.json
development:
	git fetch && git reset --hard && git checkout origin/master && npm install --development && pm2 startOrRestart pm2.json
test:
	npm test