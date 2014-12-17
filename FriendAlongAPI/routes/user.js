var encryption = require('../utils/security/encryption');

exports.addRoutes = function(app,login,models) {
	
	app.get('/signup', function(request, response) {
		response.render('register', {});
	});
	
	app.post('/signup', function(request,response) {
		var newUser = new models.User();
		// set the user's local credentials
		newUser.username = request.param('email');
		newUser.password = encryption.encrypt(request.param('password'));
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
	
	app.get('/users/hello', login.isAuthenticated, function(request, response) {
		response.send("hi");
	});
}