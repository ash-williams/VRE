var accounts = require('../../app/controllers/accounts.server.controller'),
	passport = require('passport');

module.exports = function(app){
	app.route('/signup')
		.get(accounts.renderSignup)
		.post(accounts.signup);

	app.route('/signin')
		.get(accounts.renderSignIn)
		.post(passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/signin',
			failureFlash: true
		}));
		

		//}), function(req, res){
		//	req.account = accounts.;
		//});

	app.get('/signout', accounts.signout);

	app.route('/api/accounts')
		.post(accounts.create)
		.get(accounts.list);

	app.route('/api/accounts/:accountId')
		.get(accounts.read)
		.put(accounts.update)
		.delete(accounts.delete);


	app.param('accountId', accounts.userByID);
};