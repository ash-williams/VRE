var mongoose = require('mongoose');

var ClinicianSchema = new mongoose.Schema({
	specialty: {
		type: String
	},
	account: {
		type: Schema.ObjectId,
		ref: 'Account'
	},
	created: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Clinician', ClinicianSchema);