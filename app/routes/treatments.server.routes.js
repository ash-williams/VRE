var treatments = require('../../app/controllers/treatments.server.controller'),
	accounts = require('../../app/controllers/accounts.server.controller');

module.exports = function(app){
	app.route('/api/treatment')
		.get(treatments.list)
		.post(treatments.create);
		//.post(accounts.requiresLogin, administrators.create);

	app.route('/api/treatment/:treatmentId')
		.get(treatments.read)
		.put(accounts.requiresLogin, treatments.update)
		.delete(accounts.requiresLogin, treatments.delete);

	app.param('treatmentId', treatments.treatmentById);
}