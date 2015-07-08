var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var CliniciansPatientsSchema = new Schema({
	clinician: {
		type: Schema.ObjectId,
		ref: 'Account'
	},
	patient: {
		type: Schema.ObjectId,
		ref: 'Account'
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

module.exports = mongoose.model('CliniciansPatients', CliniciansPatientsSchema);