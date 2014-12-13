var express = require('express'), routes = require('./routes'), http = require('http'), path = require('path'), passport = require('passport'), mongoose = require('mongoose'), models = require('./models/models'), login = require('./utils/security/login');

var app = express();

mongoose.connect('mongodb://localhost/friendalong', {
	keepalive : 1
});

login.init(models, app, express, passport, "dangerousooohhhhdddddangerous");

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
require('./routes/user').addRoutes(app,login,models);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

app.post('/login', passport.authenticate('login', {
	successRedirect : '/users/hello',
	failureRedirect : '/login',
	failureFlash : false
}));

/* Handle Registration POST 
app.post('/signup', passport.authenticate('signup', {
	successRedirect : '/users/hello',
	failureRedirect : '/signup',
	failureFlash : false
}));*/