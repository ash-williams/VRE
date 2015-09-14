var accounts = require('../../app/controllers/accounts.server.controller');
	clinpats = require('../../app/controllers/clinicianspatients.server.controller');

module.exports = function(app){
	app.route('/api/clinicianPatient')
		.get(clinpats.list)
		.post(clinpats.create);
		//.post(accounts.requiresLogin, administrators.create);

	app.route('/api/clinicianPatient/:clinpatId')
		.get(clinpats.read)
		.put(accounts.requiresLogin, accounts.isAdministrator, clinpats.update)
		.delete(accounts.requiresLogin, clinpats.delete);

	app.param('clinpatId', clinpats.clinpatById);
}