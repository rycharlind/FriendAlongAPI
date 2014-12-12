var encryption = require('./encryption'), LocalStrategy = require('passport-local').Strategy, mongoose = require('mongoose');

exports.init = function(models, app, express, passport, secret) {
	app.configure(function() {
		app.use(express.static('public'));
		app.use(express.cookieParser());
		app.use(express.bodyParser());
		app.use(express.session({
			secret : secret
		}));
		app.use(passport.initialize());
		app.use(passport.session());
		app.use(app.router);
	});

	passport.use('signup', new LocalStrategy({
		usernameField: 'email',
	    passwordField: 'password',
		passReqToCallback : true
	}, function(req, username, password, done) {
		// if there is no user with that email
		// create the user

		var newUser = new models.User();
		// set the user's local credentials
		newUser.username = username;
		newUser.password = encryption.encrypt(password);
		newUser.email = req.param('email');
		newUser.firstName = req.param('firstName');
		newUser.lastName = req.param('lastName');

		newUser.save(function(err, item) {
			if (err) {
				return console.error(err);
			}
		});
		return done(null,newUser);
	}));

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		models.User.findById(id, function(err, user) {
			done(err, user);
		});
	});
};

exports.isAuthenticated = function(req, res, next) {
	if (req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
};