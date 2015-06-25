var Clinician = require('mongoose').model('Clinician');

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
	var clin = new Clinician(req.body);
	clin.creator = req.user;
	
	clin.save(function(err){
		if(err){
			return next(err);
		} else{
			res.json(clin);
		}
	});
};

exports.list = function(req, res){
	Clinician.find()
	.sort('-created').populate('account','title firstName lastName fullName email username')
	.exec(function(err, clinicians){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(clinicians);
		}
	});
};

exports.clinicianById = function(req, res, next, id){
	// Clinician.findById(id)
	// .populate('account', 'title firstName lastName fullName email username')
	// .exec(function(err, clinician){
	// 	if(err){
	// 		return next(err);
	// 	}

	// 	if(!clinician){
	// 		return next(new Error('Failed to load clinician ' + id));

	// 		req.clinician = clinician;
	// 		next();
	// 	}
	// });
	Clinician.findOne({
		_id: id
	}, function(err, clinician){
		if(err){
			return next(err);
		}else{
			//console.log("here");
			req.clinician = clinician;
			next();
		}
	});
};

exports.read = function(req, res){
	res.json(req.clinician);
};

exports.update = function(req, res){
	var clinician = req.clinician;

	clinician.valid = req.body.valid;

	clinician.save(function(err){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(clinician);
		}
	});
};

exports.delete = function(req, res){
	// var clinician = req.clinician;

	// clinician.remove(function(err){
	// 	if(err){
	// 		return res.status(400).send({
	// 			message: getErrorMessage(err)
	// 		});
	// 	}else{
	// 		res.json(clinician);
	// 	}
	// });
	req.clinician.remove(function(err){
		if(err){
			return next(err);
		}else{
			res.json(req.clinician);
		}
	});
};




