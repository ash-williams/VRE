var goals = require('../../app/controllers/goals.server.controller'),
	accounts = require('../../app/controllers/accounts.server.controller');

module.exports = function(app){
	app.route('/api/goal')
		.get(goals.list)
		.post(goals.create);
		//.post(accounts.requiresLogin, administrators.create);

	app.route('/api/goal/:goalId')
		.get(goals.read)
		.put(accounts.requiresLogin, goals.update)
		.delete(accounts.requiresLogin, goals.delete);

	app.param('goalId', goals.goalById);
}