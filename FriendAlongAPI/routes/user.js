var mongoose = require('mongoose');
var User = mongoose.model('User');
var crypto = require('crypto');

var encrypt = function(text){
	var cipher = crypto.createCipher('aes-256-ctr','onthedl')
	var crypted = cipher.update(text,'utf8','hex')
	crypted += cipher.final('hex');
	return crypted;
}

var isAuthenticated = function(req, res,next){
	if (req.isAuthenticated()){
		return next;
	}
	res.redirect('/login');
}

exports.addRoutes = function(app) {
	
	
	app.get('/signup', function(request, response) {
		response.render('register', {});
	});
	
	app.post('/signup', function(request,response) {
		var newUser = new User();
		// set the user's local credentials
		newUser.username = request.param('email');
		newUser.password = encrypt(request.param('password'));
		newUser.email = request.param('email');
		newUser.firstName = request.param('firstName');
		newUser.lastName = request.param('lastName');

		newUser.save(function(err, item) {
			if (err) {
				return console.error(err);
			}
		});
		response.redirect('/login');
	});

	app.get('/login', function(request, response) {
		response.render('login', {});
	});	
	
	app.get('/users/hello', isAuthenticated, function(request, response) {
		response.send("hi");
	});
}