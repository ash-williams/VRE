var accounts = require('../../app/controllers/accounts.server.controller');
	administrators = require('../../app/controllers/administrators.server.controller');

module.exports = function(app){
	app.route('/api/administrator')
		.get(administrators.list)
		.post(administrators.create);
		//.post(accounts.requiresLogin, administrators.create);

	app.route('/api/administrator/:administratorId')
		.get(administrators.read)
		.put(accounts.requiresLogin, accounts.isAdministrator, administrators.update)
		.delete(accounts.requiresLogin, accounts.isAdministrator, administrators.delete);

	app.param('administratorId', administrators.administratorByID);
}