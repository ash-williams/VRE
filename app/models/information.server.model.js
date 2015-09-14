var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var InformationSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	details: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	completed: {
		type: Boolean
	},
	patient: {
		type: Schema.ObjectId,
		ref: 'Patient'
	}, 
	setBy: {
		type: Schema.ObjectId,
		ref: 'Account'
	}
});

mongoose.model('Information', InformationSchema);