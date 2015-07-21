var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var GoalSchema = new Schema({
	description: {
		type: String,
		required: true
	},
	term: {
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

mongoose.model('Goal', GoalSchema);