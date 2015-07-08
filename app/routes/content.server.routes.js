var allContent = require('../../app/controllers/content.server.controller'),
	accounts = require('../../app/controllers/accounts.server.controller');

module.exports = function(app){
	app.route('/api/content')
		.get(allContent.list)
		.post(allContent.create);
		//.post(accounts.requiresLogin, administrators.create);

	app.route('/api/content/:contentId')
		.get(allContent.read)
		.put(accounts.requiresLogin, accounts.isAdministrator, allContent.update)
		.delete(accounts.requiresLogin, accounts.isAdministrator, allContent.delete);

	app.param('contentId', allContent.contentById);
}