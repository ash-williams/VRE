var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ContentSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	patient_description: {
		type: String
	},
	clinician_description: {
		type: String
	},
	category: {
		type: Schema.ObjectId,
		ref: 'Category',
		required: true
	},
	path: {
		type: String,
		unique: true,
		required: true
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

module.exports = mongoose.model('Content', ContentSchema);