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

//Bootstrap passport config
var authentication = require('./config/passport')(passport);


app.get('/', isAuthenticated, function(request, response) {
	response.render('home', {} );
});

require('./routes/user').addRoutes(app);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
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