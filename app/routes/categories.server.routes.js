var categories = require('../../app/controllers/categories.server.controller'),
	accounts = require('../../app/controllers/accounts.server.controller');

module.exports = function(app){
	app.route('/api/category')
		.get(categories.list)
		.post(categories.create);
		//.post(accounts.requiresLogin, administrators.create);

	app.route('/api/category/:categoryId')
		.get(categories.read)
		.put(accounts.requiresLogin, accounts.isAdministrator, categories.update)
		.delete(accounts.requiresLogin, accounts.isAdministrator, categories.delete);

	app.param('categoryId', categories.categoryById);
}