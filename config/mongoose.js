var config = require('./config'),
	mongoose = require('mongoose');

module.exports = function(){
	var db = mongoose.connect(config.db);

	require('../app/models/account.server.model');
	require('../app/models/administrator.server.model');
	require('../app/models/patient.server.model');
	require('../app/models/clinician.server.model');
	require('../app/models/clinicianspatients.server.model');
	require('../app/models/category.server.model');
	require('../app/models/content.server.model');
	require('../app/models/goal.server.model');
	require('../app/models/treatment.server.model');
	require('../app/models/information.server.model');
	require('../app/models/treatmentcontent.server.model');


	return db;
}