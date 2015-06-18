var config = require('./config'),
	mongoose = require('mongoose');

module.exports = function(){
	var db = mongoose.connect(config.db);

	require('../app/models/account.server.model');
	require('../app/models/administrator.server.model');
	//require('../app/models/patient.server.model');
	//require('../app/models/clinician.server.model');

	return db;
}