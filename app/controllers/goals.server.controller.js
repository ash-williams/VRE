var Goal = require('mongoose').model('Goal');

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
	var gol = new Goal(req.body);
	gol.setBy = req.user;
	
	gol.save(function(err){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else{
			res.json(gol);
		}
	});
};

exports.list = function(req, res){
	Goal.find()
	.sort('-created')
	.exec(function(err, goals){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(goals);
		}
	});
};

exports.goalById = function(req, res, next, id){
	Goal.findOne({
		_id: id
	}, function(err, goal){
		if(err){
			return next(err);
		}else{
			//console.log("here");
			req.goal = goal;
			next();
		}
	});
};

exports.read = function(req, res){
	res.json(req.goal);
};

exports.update = function(req, res){
	var gol = req.body;
	//console.log(account);
	Goal.findByIdAndUpdate(req.goal.id, gol, function(err, gol){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(gol);
		}
	});
};

exports.delete = function(req, res){
	req.goal.remove(function(err){
		if(err){
			return next(err);
		}else{
			res.json(req.goal);
		}
	});
};




