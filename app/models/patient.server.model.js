var mongoose = require('mongoose');

var PatientSchema = new mongoose.Schema({
	account: {
		type: Schema.ObjectId,
		ref: 'Account'
	},
	created: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Patient', PatientSchema);