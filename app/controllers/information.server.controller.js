var Information = require('mongoose').model('Information');

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
	var inf = new Information(req.body);
	inf.setBy = req.user;
	
	inf.save(function(err){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else{
			res.json(inf);
		}
	});
};

exports.list = function(req, res){
	Information.find()
	.sort('-created')
	.exec(function(err, information){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(information);
		}
	});
};

exports.informationById = function(req, res, next, id){
	Information.findOne({
		_id: id
	}, function(err, information){
		if(err){
			return next(err);
		}else{
			//console.log("here");
			req.information = information;
			next();
		}
	});
};

exports.read = function(req, res){
	res.json(req.information);
};

exports.update = function(req, res){
	var inf = req.body;
	//console.log(account);
	Information.findByIdAndUpdate(req.information.id, inf, function(err, inf){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(inf);
		}
	});
};

exports.delete = function(req, res){
	req.information.remove(function(err){
		if(err){
			return next(err);
		}else{
			res.json(req.information);
		}
	});
};




