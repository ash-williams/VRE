var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var CategorySchema = new Schema({
	name: {
		type: String,
		required: true
	},
	parentCategory: {
		type: Schema.ObjectId,
		ref: 'Category'
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

module.exports = mongoose.model('Category', CategorySchema);