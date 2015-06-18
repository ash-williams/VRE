var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

var AccountSchema = new Schema({
	title: {
		type: String,
		required: true,
		enum: ['Mr','Mrs','Miss','Dr','Rev','Ms','Other'],
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true,
		match: [/.+\@.+\..+/, "Please use a valid email address"]
	},
	username: {
		type: String,
		trim: true,
		unique: true,
		required: 'Username is required'
	},
	password: {
		type: String,
		required: true,
		validate: [
			function(password){
				return password.length >= 6;
			},
			'Password too short'
		]
	},
	salt: {
		type: String
	},
	provider: {
		type: String,
		required: 'Provider is required'
	},
	providerId: String,
	providerDate: {},
	accountType: {
		type: String,
		required: true,
		enum: ['Administrator', 'Clinician', 'Patient']
	},
	created: {
		type: Date,
		default: Date.now
	}
});

AccountSchema.virtual('fullName').get(function(){
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName){
	var splitName = fullName.split(' ');
	this.firtName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});

AccountSchema.pre('save', function(next){
	if(this.password){
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

AccountSchema.methods.hashPassword = function(password){
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

AccountSchema.methods.authenticate = function(password){
	return this.password === this.hashPassword(password);
};

AccountSchema.statics.findUniqueUsername = function(username, suffix, callback){
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne({
		username: possibleUsername
	}, function(err, account){
		if(!err){
			if(!account){
				callback(possibleUsername);
			}else{
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		}else{
			callback(null);
		}
	});
};

AccountSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

module.exports = mongoose.model('Account', AccountSchema);