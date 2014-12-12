exports.addRoutes = function(app) {
	app.get('/signup', function(request, response) {
		response.render('register', {});
	});

	app.get('/users/hello', function(request, response) {
		response.send("hi");
	});
}