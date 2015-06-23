var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ClinicianSchema = new Schema({
	specialty: {
		type: String
	},
	account: {
		type: Schema.ObjectId,
		ref: 'Account'
	},
	valid: {
		type: Boolean,
		default: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	creator: {
		type: Schema.ObjectId,
		ref: 'Account'
	}
});

module.exports = mongoose.model('Clinician', ClinicianSchema);