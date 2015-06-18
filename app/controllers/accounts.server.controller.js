var Account = require('mongoose').model('Account'),
	passport = require('passport');

var getErrorMessage = function(err){
	var message = '';

	if(err.code){
		switch(err.code){
			case 11000:
			case 11001:
				message = 'Username already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	}else{
		for(var errName in err.errors){
			if(err.errors[errName].message){
				message = err.errors[errName].message;
			}
		}
	}
	
	return message;
};

exports.renderSignIn = function(req, res, next){
	if(!req.account){
		res.render('signin', {
			title: 'Log In',
			messages: req.flash('error') || req.flash('info')
		});
	}else{
		return res.redirect('/');
	}
};

exports.renderSignup = function(req, res, next){
	if(!req.account){
		res.render('signup', {
			title: 'Admin Sign-up',
			messages: req.flash('error')
		});
	}else{
		return res.redirect('/');
	}
};

exports.signup = function(req, res, next){
	if(!req.account){
		var account = new Account(req.body);
		var message = null;

		account.provider = 'local';

		account.save(function(err){
			if(err){
				var mesage = getErrorMessage(err);

				req.flash('error', message);
				return res.redirect('/signup');
			}
			req.login(account, function(err){
				if(err) return next(err);
				return res.redirect('/');
			});
		});
	}else{
		return res.redirect('/');
	}
};

exports.signout = function(req, res){
	req.logout();
	res.redirect('/');
};

exports.create = function(req, res, next){
	var account = new Account(req.body);

	account.save(function(err){
		if(err){
			return next(err);
		} else{
			res.json(account);
		}
	});
};

exports.list = function(req, res, next){
	Account.find({}, function(err, accounts){
		if(err){
			return next(err);
		}else{
			res.json(accounts);
		}
	});
};

exports.read = function(req, res){
	res.json(req.account);
};

exports.userByID = function(req, res, next, id){
	//console.log("Find user: " + id)
	Account.findOne({
		_id: id
	}, function(err, account){
		if(err){
			return next(err);
		}else{
			//console.log("here");
			req.user = account;
			next();
		}
	});
};

exports.update = function(req, res, next){
	Account.findByIdAndUpdate(req.account.id, req.body, function(err, account){
		if(err){
			return next(err);
		}else{
			res.json(account);
		}
	});
};

exports.delete = function(req, res, next){
	req.account.remove(function(err){
		if(err){
			return next(err);
		}else{
			res.json(req.account);
		}
	});
};

exports.requiresLogin = function(req, res, nex){
	if(!req.isAuthenticated()){
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}
	next();
};

exports.isAdministrator = function(req, res, next){
	if(req.user.accountType != 'Administrator'){
		return res.status(403).send({
			message: 'User is not authorised'
		});
	}
	next();
};