var treatmentcontent = require('../../app/controllers/treatmentcontent.server.controller'),
	accounts = require('../../app/controllers/accounts.server.controller');

module.exports = function(app){
	app.route('/api/treatmentcontent')
		.get(treatmentcontent.list)
		.post(treatmentcontent.create);
		//.post(accounts.requiresLogin, administrators.create);

	app.route('/api/treatmentcontent/:treatmentcontentId')
		.get(treatmentcontent.read)
		.put(accounts.requiresLogin, treatmentcontent.update)
		.delete(accounts.requiresLogin, treatmentcontent.delete);

	app.param('treatmentcontentId', treatmentcontent.treatmentContentById);
}