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

//app.get('/', routes.index);

app.get('/', login.isAuthenticated, function(request, response) {
	response.render('home', {} );
});

require('./routes/user').addRoutes(app,login,models);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

app.post('/login', passport.authenticate('login', {
	successRedirect : '/',
	failureRedirect : '/login',
	failureFlash : false
}));

app.get('/logout', login.isAuthenticated, function(request, response) {
	request.logout();
	response.redirect('/');
});

app.get('/profile', login.isAuthenticated, function(request, response) {
	var name = request.user.firstname + ' ' + request.user.lastname;
	response.render('profile', {
		user: name
	} );
});

app.get('/settings', login.isAuthenticated, function(request, response) {
	response.render('settings', {} );
});

app.get('/chat', login.isAuthenticated, function(request, response) {
	response.render('chat', {} );
});

app.get('/notifications', login.isAuthenticated, function(request, response) {
	response.render('notifications', {} );
});