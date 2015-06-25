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
	var admin = new Administrator(req.body);
	admin.creator = req.user;
	
	admin.save(function(err){
		if(err){
			return next(err);
		} else{
			res.json(admin);
		}
	});
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
	// Administrator.findById(id)
	// .populate('account', 'title firstName lastName fullName email username')
	// .exec(function(err, administrator){
	// 	if(err){
	// 		return next(err);
	// 	}

	// 	if(!administrator){
	// 		return next(new Error('Failed to load administrator ' + id));

	// 		req.administrator = administrator;
	// 		next();
	// 	}
	// });
	//console.log("retruning admin");
	Administrator.findOne({
		_id: id
	}, function(err, administrator){
		if(err){
			return next(err);
		}else{
			//console.log("here");
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
	//console.log("Hittting delete");
	req.administrator.remove(function(err){
		if(err){
			return next(err);
		}else{
			res.json(req.administrator);
		}
	});
};




