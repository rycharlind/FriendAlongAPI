var express = require('express')
			, routes = require('./routes')
			, http = require('http')
			, path = require('path')
			, passport = require('passport')
			, mongoose = require('mongoose');

require('./models/models');
var app = express();
var LocalStrategy = require('passport-local').Strategy;

mongoose.connect('mongodb://localhost/friendalong', {
	keepalive : 1
});


// Application settings
require('./config/express')(app, passport);
app.set('views', __dirname + '/views');
app.configure(function() {
	  app.use(express.static('public'));
	  app.use(express.cookieParser());
	  app.use(express.bodyParser());
	  app.use(express.session({ secret: 'keyboard cat' }));
	  app.use(passport.initialize());
	  app.use(passport.session());
	  app.use(app.router);
	});

// Passport config
var authentication = require('./config/passport')(passport);

var isAuthenticated = function(req, res,next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

require('./routes/user').addRoutes(app, passport);
require('./routes/profile')(app);

app.get('/', isAuthenticated, function(request, response) {
	response.render('/home', {});
});
