var Treatment = require('mongoose').model('Treatment');

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
	var tre = new Treatment(req.body);
	tre.setBy = req.user;
	
	tre.save(function(err){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else{
			res.json(tre);
		}
	});
};

exports.list = function(req, res){
	Treatment.find()
	.sort('-created')
	.exec(function(err, treatments){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(treatments);
		}
	});
};

exports.treatmentById = function(req, res, next, id){
	Treatment.findOne({
		_id: id
	}, function(err, treatment){
		if(err){
			return next(err);
		}else{
			//console.log("here");
			req.treatment = treatment;
			next();
		}
	});
};

exports.read = function(req, res){
	res.json(req.treatment);
};

exports.update = function(req, res){
	var tre = req.body;
	//console.log(account);
	Treatment.findByIdAndUpdate(req.treatment.id, tre, function(err, tre){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(tre);
		}
	});
};

exports.delete = function(req, res){
	req.treatment.remove(function(err){
		if(err){
			return next(err);
		}else{
			res.json(req.treatment);
		}
	});
};




