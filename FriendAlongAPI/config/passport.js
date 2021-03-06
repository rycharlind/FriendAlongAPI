var mongoose = require('mongoose');
var User = mongoose.model('User');

var local = require('./passport/local');
//var google = require('./passport/google');
//var facebook = require('./passport/facebook');
//var twitter = require('./passport/twitter');
//var linkedin = require('./passport/linkedin');
//var github = require('./passport/github');

module.exports = function (passport) {
  //serialize sessions
	passport.serializeUser(function(user, done) {
		  done(null, user.id);
		});

		passport.deserializeUser(function(id, done) {
		  User.findById(id, function(err, user) {
		    done(err, user);
		  });
		});

  passport.use('login', local);
  //passport.use(google);
  //passport.use(facebook);
  //passport.use(twitter);
  //passport.use(linkedin);
  //passport.use(github);
  
  
};
