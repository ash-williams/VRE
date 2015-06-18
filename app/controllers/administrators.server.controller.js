var Administrator = require('mongoose').model('Administrator');

var getErrorMessage = function(err){
	if(err.errors){
		for(var errName in err.errors){
			if(err.errors[errName].message){
				return err.errors[errName].message;
			}
		}
	}else{
		return 'Unknown server error';
	}
};

exports.create = function(req, res){
	//break up req.body
	var body = req.body;
	//create account
	var accountJSON = {
		title: body.title,
		firstName: body.firstName,
		lastName: body.lastName,
		email: body.email,
		username: body.username,
		password: body.password,
		accountType: 'Administrator'
	};

	//save account
	var flag = true;
	var account = new Account(accountJSON);
	account.save(function(err){
		if(err){
			flag = false;
			return next(err);
		} else{
			res.json(account);
		}
	});

	if(flag === true){
		//get account id
		Account.findOne({
			username: body.username
		}, function(err, account){
			if(err){
				return next(err);
			}else{
				//console.log("here");
				var savedAccount = account;
			}
		});
		//create administrator
		var administrator = {
			account: savedAccount._id
		};

		//add creator
		administrator.creator = req.user;
		//save admin
		administrator.save(function(err){
			if(err){
				return res.status(400).send({
					message: getErrorMessage(err)
				});
			}else{
				res.json(administrator);
			}
		});
	}
};

exports.list = function(req, res){
	Administrator.find()
	.sort('-created').populate('account','title firstName lastName fullName email username')
	.exec(function(err, administrators){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(administrators);
		}
	});
};

exports.administratorByID = function(req, res, next, id){
	Administrator.findById(id)
	.populate('account', 'title firstName lastName fullName email username')
	.exec(function(err, administrator){
		if(err){
			return next(err);
		}

		if(!administrator){
			return next(new Error('Failed to load administrator ' + id));

			req.administrator = administrator;
			next();
		}
	});
};

exports.read = function(req, res){
	res.json(req.administrator);
};

exports.update = function(req, res){
	var administrator = req.administrator;

	administrator.valid = req.body.valid;

	administrator.save(function(err){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(administrator);
		}
	});
};

exports.delete = function(req, res){
	var administrator = req.administrator;

	administrator.remove(function(err){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(administrator);
		}
	});
};




