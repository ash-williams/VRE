var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TreatmentContentSchema = new Schema({
	details: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	treatment: {
		type: Schema.ObjectId,
		ref: 'Treatment'
	}, 
	content: {
		type: Schema.ObjectId,
		ref: 'Content'
	}, 
	setBy: {
		type: Schema.ObjectId,
		ref: 'Account'
	}
});

mongoose.model('TreatmentContent', TreatmentContentSchema);