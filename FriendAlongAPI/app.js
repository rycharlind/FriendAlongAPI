//MY COMMENT

//Hi Gary

//Hello this is ryan
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  ,passport = require('passport')
  ,LocalStrategy = require('passport-local').Strategy
  ,mongoose = require('mongoose')
  ,bCrypt = require('bcrypt');

var app = express();

var User = mongoose.model('User',{
    username: String,
	password: String,
	email: String,
	gender: String,
	address: String
});

app.configure(function() {
	  app.use(express.static('public'));
	  app.use(express.cookieParser());
	  app.use(express.bodyParser());
	  app.use(express.session({ secret: 'keyboard cat' }));
	  app.use(passport.initialize());
	  app.use(passport.session());
	  app.use(app.router);
	});

passport.serializeUser(function(user, done) {
	  done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	  User.findById(id, function(err, user) {
	    done(err, user);
	  });
	});
	

	
	passport.use('signup', new LocalStrategy({
	    passReqToCallback : true
	  },
	  function(req, username, password, done) { 
		// if there is no user with that email
          // create the user
		  mongoose.connect('mongodb://localhost/friendalong');
		  
          var newUser = new User();
          // set the user's local credentials
          newUser.username = username;
          newUser.password = createHash(password);
          newUser.email = req.param('email');
          newUser.firstName = req.param('firstName');
          newUser.lastName = req.param('lastName');
          
          newUser.save(function(err,item){
        	  if (err) return console.error(err);
        	  mongoose.disconnect();
          });
          
          
	}));
	
	var isAuthenticated = function (req, res, next) {
		  if (req.isAuthenticated())
		    return next();
		  res.redirect('/');
		}
	     
	var createHash = function(password){
		 return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
		}
	
	 app.get('/signup', function(req, res){
		    res.render('register',{});
		  });
		 
		  /* Handle Registration POST */
		  app.post('/signup', passport.authenticate('signup', {
		    successRedirect: '/',
		    failureRedirect: '/signup',
		    failureFlash : false 
		  }));

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
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
