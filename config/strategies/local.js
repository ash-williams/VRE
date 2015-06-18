var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	Account = require('mongoose').model('Account');

module.exports = function(){
	passport.use(new LocalStrategy(function(username, password, done){
		Account.findOne({
			username: username
		}, function(err, account){
			if(err){
				return done(err);
			}

			if(!account) {
				return done(null, false, {
					message: 'Unknown user'
				});
			}

			if(!account.authenticate(password)){
				return done(null, false, {
					message: 'Invalid password'
				});
			}

			return done(null, account);
		});
	}));
};