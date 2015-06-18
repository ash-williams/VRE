exports.render = function(req, res){

	if(req.session.lastVisit){
		console.log(req.session.lastVisit);
	}

	req.session.lastVisit = new Date();
	console.log(req.user);
	res.render('index', {
		title: 'VRE',
		user: JSON.stringify(req.user)
	});
};