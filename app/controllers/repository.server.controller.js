var Content = require('mongoose').model('Content');
var config = require('../../config/config');
var fs = require('fs.extra');

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

exports.upload = function(req, res, next){
	var file = req.files.file;
	var content = JSON.parse(req.body.data);
	var tmpPath = file.path;

    //move file to repository
    var path = tmpPath.split('\\');
    var uniqueFileName = path[path.length - 1];

    console.log(uniqueFileName);
    var newPath = config.VRE_GLOBAL_REPOSITORY + "\\" + uniqueFileName
    console.log(newPath);
    fs.move(tmpPath, newPath, function(err){
    	if(err){
    		console.log(err);
    	}else{
    		//console.log("success");
    		var con = new Content();
    		con.name = content.name;
    		con.type = file.type;
    		con.patient_description = content.pat_desc;
    		con.clinician_description = content.clin_desc;
    		con.category = content.category;
    		con.path = newPath;
    		con.creator = req.user;

    		con.save(function(err){
    			if(err){
    				return next(err);
    			}else{
    				res.json(con);
    			}
    		});
    	}
    });
};

exports.list = function(req, res){
	Content.find()
	.sort('-created')
	.exec(function(err, cont){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(cont);
		}
	});
};

exports.repositoryById = function(req, res, next, id){
	Content.findOne({
		_id: id
	}, function(err, con){
		if(err){
			return next(err);
		}else{
			//console.log("here");
			req.content = con;
			next();
		}
	});
};

exports.read = function(req, res){
	res.json(req.content);
};

exports.update = function(req, res){
	var cont = req.body;

	Content.findByIdAndUpdate(req.content.id, cont, function(err, cont){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(cont);
		}
	});
};

exports.delete = function(req, res){
	req.content.remove(function(err){
		if(err){
			return next(err);
		}else{
			var tmpPath = req.content.path;
			var path = tmpPath.split('\\');
    		var uniqueFileName = path[path.length - 1];

		    console.log(uniqueFileName);
		    var newPath = config.VRE_GLOBAL_REPOSITORY + "\\Archive\\" + uniqueFileName
		    console.log(newPath);
		    fs.move(tmpPath, newPath, function(err){
		    	if(err){
		    		console.log(err);
		    	}else{
		    		res.json(req.content);
		    	}
		    });	
		}
	});
};




