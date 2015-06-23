var accounts = require('../../app/controllers/accounts.server.controller');
	clinicians = require('../../app/controllers/clinicians.server.controller');

module.exports = function(app){
	app.route('/api/clinician')
		.get(clinicians.list)
		.post(clinicians.create);
		//.post(accounts.requiresLogin, administrators.create);

	app.route('/api/clinician/:clinicianId')
		.get(clinicians.read)
		.put(accounts.requiresLogin, accounts.isAdministrator, clinicians.update)
		.delete(accounts.requiresLogin, accounts.isAdministrator, clinicians.delete);

	app.param('clinicianId', clinicians.clinicianById);
}