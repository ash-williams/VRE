var passport = require('passport'),
	mongoose = require('mongoose');

module.exports = function(){
	var Account = mongoose.model('Account');

	passport.serializeUser(function(account, done){
		done(null, account.id);
	});

	passport.deserializeUser(function(id, done){
		Account.findOne({
			_id: id
		}, '-password -salt', function(err, account){
			done(err, account);
		});
	});

	require('./strategies/local.js')();
};