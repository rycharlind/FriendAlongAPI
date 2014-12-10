var mongoose = require('mongoose');

exports.User = mongoose.model('User',{
    username: String,
	password: String,
	email: String,
	gender: String,
	address: String
});