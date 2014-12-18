var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');
var crypto = require('crypto');


var encrypt = function(text){
  var cipher = crypto.createCipher('aes-256-ctr','onthedl')
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

module.exports = new LocalStrategy({
	usernameField : 'email',
	passwordField : 'password',
}, function(username, password, done) {
	User.findOne({
		username : username
	}, function(err, user) {
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(null, false, {
				message : 'Incorrect username.'
			});
		}
		if (user.password != encrypt(password)){
			return done(null, false, {
				message : 'Incorrect password.'
			});
		}
		return done(null, user);
	});
});

	 