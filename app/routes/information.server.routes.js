var information = require('../../app/controllers/information.server.controller'),
	accounts = require('../../app/controllers/accounts.server.controller');

module.exports = function(app){
	app.route('/api/information')
		.get(information.list)
		.post(information.create);
		//.post(accounts.requiresLogin, administrators.create);

	app.route('/api/information/:informationId')
		.get(information.read)
		.put(accounts.requiresLogin, information.update)
		.delete(accounts.requiresLogin, information.delete);

	app.param('informationId', information.informationById);
}