var express = require('express'), routes = require('./routes'), http = require('http'), path = require('path'), passport = require('passport'), mongoose = require('mongoose');
require('./models/models');
var app = express();

mongoose.connect('mongodb://localhost/friendalong', {
	keepalive : 1
});

var isAuthenticated = function(req, res,next){
	if (req.isAuthenticated()){
		return next;
	}
	res.redirect('/login');
}


//Bootstrap application settings
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

//Bootstrap passport config
var authentication = require('./config/passport')(passport);


http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

require('./routes/user').addRoutes(app);

app.get('/', function(request, response) {
	response.render('home', {} );
});



app.post('/login', passport.authenticate('login', {
	successRedirect : '/',
	failureRedirect : '/login',
	failureFlash : false
}));

app.get('/logout', isAuthenticated, function(request, response) {
	request.logout();
	response.redirect('/');
});

app.get('/profile', isAuthenticated, function(request, response) {
	var name = request.user.firstname + ' ' + request.user.lastname;
	response.render('profile', {
		user: name
	} );
});

app.get('/settings', isAuthenticated, function(request, response) {
	response.render('settings', {} );
});

app.get('/chat', isAuthenticated, function(request, response) {
	response.render('chat', {} );
});

app.get('/notifications', isAuthenticated, function(request, response) {
	response.render('notifications', {} );
});