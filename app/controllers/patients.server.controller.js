var Patient = require('mongoose').model('Patient');

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
	var pat = new Patient(req.body);
	pat.creator = req.user;
	
	pat.save(function(err){
		if(err){
			return next(err);
		} else{
			res.json(pat);
		}
	});
};

exports.list = function(req, res){
	Patient.find()
	.sort('-created').populate('account','title firstName lastName fullName email username')
	.exec(function(err, patients){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(patients);
		}
	});
};

exports.patientById = function(req, res, next, id){
	// Patient.findById(id)
	// .populate('account', 'title firstName lastName fullName email username')
	// .exec(function(err, patient){
	// 	if(err){
	// 		return next(err);
	// 	}

	// 	if(!patient){
	// 		return next(new Error('Failed to load patient ' + id));

	// 		req.patient = patient;
	// 		next();
	// 	}
	// });

Patient.findOne({
		_id: id
	}, function(err, patient){
		if(err){
			return next(err);
		}else{
			//console.log("here");
			req.patient = patient;
			next();
		}
	});
};

exports.read = function(req, res){
	res.json(req.patient);
};

exports.update = function(req, res){
	var patient = req.patient;

	patient.valid = req.body.valid;

	patient.save(function(err){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(patient);
		}
	});
};

exports.delete = function(req, res){
	// var patient = req.user;
	// console.log(patient);
	// patient.remove(function(err){
	// 	if(err){
	// 		return res.status(400).send({
	// 			message: getErrorMessage(err)
	// 		});
	// 	}else{
	// 		res.json(patient);
	// 	}
	// });
	req.patient.remove(function(err){
		if(err){
			return next(err);
		}else{
			res.json(req.patient);
		}
	});
};




