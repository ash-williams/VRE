var Category = require('mongoose').model('Category');

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
	var cat = new Category(req.body);
	cat.creator = req.user;
	
	cat.save(function(err){
		if(err){
			return next(err);
		} else{
			res.json(cat);
		}
	});
};

exports.list = function(req, res){
	Category.find()
	.sort('-created').populate('parentCategory','name parentCategory created creator')
	.exec(function(err, categories){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(categories);
		}
	});
};

exports.categoryById = function(req, res, next, id){
	Category.findOne({
		_id: id
	}, function(err, category){
		if(err){
			return next(err);
		}else{
			//console.log("here");
			req.category = category;
			next();
		}
	});
};

exports.read = function(req, res){
	res.json(req.category);
};

exports.update = function(req, res){
	var cat = req.body;
	//console.log(account);
	Category.findByIdAndUpdate(req.category.id, cat, function(err, cat){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(cat);
		}
	});
};

exports.delete = function(req, res){
	req.category.remove(function(err){
		if(err){
			return next(err);
		}else{
			res.json(req.category);
		}
	});
};




