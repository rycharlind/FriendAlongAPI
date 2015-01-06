var mongoose = require('mongoose');
var User = mongoose.model('User');
var crypto = require('crypto');

var isAuthenticated = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

module.exports = function(app) {
	
	app.get('/profile', isAuthenticated,  function(request, response) {
		response.render('profile', {
			user: request.user
		} );
	});
	
	app.post('/profile', function(request,response) {
		
		User.findById(request.user.id, function(err, user) {
			if (!user) {
				return console.error(err);
			} else {
				console.log('Found user');
				user.firstName = request.param('firstname');
				user.lastName = request.param('lastname');
				user.email = request.param('email');
				user.save(function(err) {
					if (err) {
						console.log('error');
					} else {
						console.log('success');
						request.user = user;
						success = true;
						response.render('profile', {
							user: request.user,
							message: 'Profile updated successfully!'
						} );
					}
				});
			}
		});
	
	});


}