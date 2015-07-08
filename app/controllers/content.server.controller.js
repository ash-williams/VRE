var Content = require('mongoose').model('Content');

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
	var con = new Content(req.body);
	con.creator = req.user;
	
	con.save(function(err){
		if(err){
			return next(err);
		} else{
			res.json(con);
		}
	});
};

exports.list = function(req, res){
	Content.find()
	.sort('-created').populate('category','name parentCategory created creator')
	.exec(function(err, allContent){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(allContent);
		}
	});
};

exports.contentById = function(req, res, next, id){
	Content.findOne({
		_id: id
	}, function(err, content){
		if(err){
			return next(err);
		}else{
			//console.log("here");
			req.content = content;
			next();
		}
	});
};

exports.read = function(req, res){
	res.json(req.content);
};

exports.update = function(req, res){
	var con = req.body;
	//console.log(account);
	Content.findByIdAndUpdate(req.content.id, con, function(err, con){
		if(err){
			return next(err);
		}else{
			res.json(con);
		}
	});
};

exports.delete = function(req, res){
	req.content.remove(function(err){
		if(err){
			return next(err);
		}else{
			res.json(req.content);
		}
	});
};




