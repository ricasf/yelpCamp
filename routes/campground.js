var express = require('express'),
	router = express.Router(),
	Campground = require('../models/campground'),
	middleware = require('../middleware');

//INDEX - show all campgrounds
router.get('/', function(req, res){
	Campground.find({}, function(err, allCampgrounds){
		if(err){
		   console.log(err);
		} else {
			// GET request campgrounds and send data campgrounds from DB
			res.render('campgrounds/index', {campgrounds:allCampgrounds}); 
		}
	});
});

//CREATE - add a new campground
router.post('/', middleware.isLoggedIn, function(req, res){
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = {
		name: name,
		price: price,
		image: image, 
		description: desc, 
		author: author
	};
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);	
		} else {
			res.redirect('/campgrounds');
		}
	});
});

//NEW - show form to create a new campground
router.get('/new', middleware.isLoggedIn, function(req, res){
	res.render('campgrounds/new');
});

//SHOW - shows more info about one campground
router.get('/:id', function(req, res){
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else{
			res.render('campgrounds/show', {campground: foundCampground});
		}
	});
});

//EDIT CAMPGROUND ROUTE
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			req.flash('error', "Ups, the campground you are trying to edit doesn't exist")
		} else {
			res.render('campgrounds/edit', {campground: foundCampground});
		}

	});
});

//UPDATE CAMPGROUND ROUTE
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res){
	//Find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect('/campgrounds');
		} else {
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

// DESTROY CAMPGROUND ROUTE
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			req.flash('error', "Ups, the campground you are trying to delete doesn't exist")
			console.log(err);
		} else {
			res.redirect('/campgrounds');
		}
	})
});

module.exports = router;