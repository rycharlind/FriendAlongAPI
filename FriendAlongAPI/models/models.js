var mongoose = require('mongoose'), Schema = mongoose.Schema;

var User = mongoose.model('User', {
    username	: String,
	password	: String,
	email		: String,
	gender		: String,
	firstName	: String,
	lastName	: String
});

// http://mongoosejs.com/docs/populate.html
var Message = mongoose.model('Message', {
	text		: String,
	createdAt	: Date,
	fromUser	: { type: Schema.Types.ObjectId, ref: User },
	toUser		: { type: Schema.Types.ObjectId, ref: User }
});


exports.User = User;
exports.Message = Message;