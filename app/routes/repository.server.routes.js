var accounts = require('../../app/controllers/accounts.server.controller');
	repository = require('../../app/controllers/repository.server.controller');

module.exports = function(app){
	app.route('/api/repository')
		.get(repository.list)
		.post(accounts.requiresLogin, repository.upload);
		//.post(accounts.requiresLogin, administrators.create);

	app.route('/api/repository/:repositoryId')
		.get(repository.read)
		.put(accounts.requiresLogin, accounts.isAdministrator, repository.update)
		.delete(accounts.requiresLogin, accounts.isAdministrator, repository.delete);

	app.param('repositoryId', repository.repositoryById);
}