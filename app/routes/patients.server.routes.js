var accounts = require('../../app/controllers/accounts.server.controller');
	patients = require('../../app/controllers/patients.server.controller');

module.exports = function(app){
	app.route('/api/patient')
		.get(patients.list)
		.post(patients.create);
		//.post(accounts.requiresLogin, administrators.create);

	app.route('/api/patient/:patientId')
		.get(patients.read)
		.put(accounts.requiresLogin, patients.update)
		.delete(accounts.requiresLogin, accounts.isAdministrator, patients.delete);

	app.param('patientId', patients.patientById);
}