var accounts = require('../../app/controllers/accounts.server.controller');
	administrators = require('../../app/controllers/administrators.server.controller');

module.exports = function(app){
	app.route('/api/administrators')
		.get(administrators.list)
		.post(accounts.requiresLogin, administrators.create);

	app.route('/api/administrators/:administratorId')
		.get(administrators.read)
		.put(accounts.requiresLogin, accounts.isAdministrator, administrators.update)
		.delete(accounts.requiresLogin, accounts.isAdministrator, administrators.delete);

	app.param('administratorId', administrators.administratorByID);
}