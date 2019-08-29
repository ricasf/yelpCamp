var express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	User     = require('../models/user');

//root route
router.get('/', function(req, res){
	res.render('landing');
});

// =========================================
//             AUTH ROUTES
// =========================================

//show register form
router.get('/register', function(req, res){
	res.render('register');
});

//handle signup logic
router.post('/register', function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash('error', err.message);
			res.redirect('/register');
		} else {
			passport.authenticate('local')(req, res, function(){
				req.flash('success', 'You were successfuly signed up. Welcome to YelpCamp ' + user.username + "!");
				res.redirect('/campgrounds');
			});
		}
	});
});

//Show login form
router.get('/login', function(req, res){
	res.render('login');
});

//handle login
//router.post('ROUTE', MIDDLEWARE, CALLBACK)
router.post('/login', passport.authenticate('local', {
	successRedirect: '/campgrounds', 
	failureRedirect:'/login'
	}), function(req, res){
	req.flash('success', 'You are logged in. Welcome back!')
});

//logout route
router.get('/logout', function(req, res){
	req.logout();
	req.flash('success', 'You are logged out. See you soon!')
	res.redirect('/campgrounds');
});

module.exports = router;