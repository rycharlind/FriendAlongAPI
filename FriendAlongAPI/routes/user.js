var express = require('express');
var router = express.Router();

router.get('/signup', function(request, response) {
	response.render('register', {});
});

router.get('/hello', function(request, response) {
	response.send("hi");
});