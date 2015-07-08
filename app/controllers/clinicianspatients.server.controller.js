var CliniciansPatients = require('mongoose').model('CliniciansPatients');
var mongoose = require('mongoose');

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
	var clinpat = new CliniciansPatients(req.body);
	clinpat.creator = req.user;
	
	clinpat.save(function(err){
		if(err){
			return next(err);
		} else{
			res.json(clinpat);
		}
	});
};

exports.list = function(req, res){
	CliniciansPatients.find({clinician: req.user._id})
	.populate('clinician')
	.populate('patient')
	.exec(function(err, clinpat){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(clinpat);
		}
	});

};

exports.clinpatById = function(req, res, next, id){
	CliniciansPatients.findOne({
		_id: id
	}, function(err, clinpat){
		if(err){
			return next(err);
		}else{
			//console.log("here");
			req.clinpat = clinpat;
			next();
		}
	});
};

exports.read = function(req, res){
	res.json(req.clinpat);
};

exports.update = function(req, res){
	var clinpat = req.clinpat;

	clinpat.valid = req.body.valid;

	clinpat.save(function(err){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(clinpat);
		}
	});
};

exports.delete = function(req, res){
	req.clinpat.remove(function(err){
		if(err){
			return next(err);
		}else{
			res.json(req.clinpat);
		}
	});
};




