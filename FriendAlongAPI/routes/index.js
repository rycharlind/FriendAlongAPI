/*
 * GET home page.
 */

exports.index = function(req, res) {
	res.render('chat', {
		title : 'Express'
	});
};