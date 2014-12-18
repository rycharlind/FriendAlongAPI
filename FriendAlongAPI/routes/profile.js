var encryption = require('../utils/security/encryption');

exports.addRoutes = function(app,login,models) {
	
	app.get('/profile', login.isAuthenticated, function(request, response) {
		//var name = request.user.firstname + ' ' + request.user.lastname;
		response.render('profile', {
			user: request.user
		} );
	});
	
	app.post('/profile', function(request,response) {
		
		models.User.findById(request.user.id, function(err, p) {
			if (!p) {
				return console.error(err);
			} else {
				console.log('Found user');
				p.save(function(err) {
					if (err) {
						console.log('error');
					} else {
						console.log('success');
						response.render('profile', {
							user: request.user
						} );
					}
				});
			}
		});
		
		/*
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
		*/
	
	});


}