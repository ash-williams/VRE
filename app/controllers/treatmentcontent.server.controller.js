var TreatmentContent = require('mongoose').model('TreatmentContent');

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
	var tc = new TreatmentContent(req.body);
	tc.setBy = req.user;
	
	tc.save(function(err){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else{
			res.json(tc);
		}
	});
};

exports.list = function(req, res){
	TreatmentContent.find()
	.sort('-created')
	.exec(function(err, treatmentcontent){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(treatmentcontent);
		}
	});
};

exports.treatmentContentById = function(req, res, next, id){
	TreatmentContent.findOne({
		_id: id
	}, function(err, treatmentcontent){
		if(err){
			return next(err);
		}else{
			//console.log("here");
			req.treatmentcontent = treatmentcontent;
			next();
		}
	});
};

exports.read = function(req, res){
	res.json(req.treatmentcontent);
};

exports.update = function(req, res){
	var tc = req.body;
	//console.log(account);
	TreatmentContent.findByIdAndUpdate(req.treatmentcontent.id, tc, function(err, tc){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(tc);
		}
	});
};

exports.delete = function(req, res){
	req.treatmentcontent.remove(function(err){
		if(err){
			return next(err);
		}else{
			res.json(req.treatmentcontent);
		}
	});
};




