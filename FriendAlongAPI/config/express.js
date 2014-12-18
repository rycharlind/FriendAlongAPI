var express = require('express');
var path = require('path');

module.exports = function (app, passport) {
	
	app.set('port', process.env.PORT || 3000);
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
	
	if ('development' === app.get('env')) {
		app.use(express.errorHandler());
	}
	app.configure(function() {
		app.use(express.static('public'));
		app.use(express.cookieParser());
		app.use(express.bodyParser());
		app.use(express.session({
			secret : 'makesurethisissupersecret'
		}));
		app.use(passport.initialize());
		app.use(passport.session());
		app.use(app.router);
	});
}