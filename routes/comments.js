var express = require('express'),
	router = express.Router({mergeParams: true}),
	Comment = require('../models/comment'),
	Campground = require('../models/campground'),
	middleware = require('../middleware');

// =========================================
//             COMMENTS ROUTES
// =========================================
//Comments new form
router.get('/new', middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render('comments/new', {campground: campground});
		}
	});
});

//Create new comment
router.post('/', middleware.isLoggedIn, function(req, res){
	// Lookup for campground ID
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err) {
					console.log(err);
					req.flash('error', 'Something went wrong. Please try again!')
				} else {
					//add username and id to a comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash('success', 'Your review about ' + campground.name + ' was successfuly added. Thank you!');
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});

//EDIT COMMENT
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			Comment.findById(req.params.comment_id, function(err, foundComment){
				if(err){
					console.log(err);
				} else {
					
					res.render('comments/edit', {campground: campground, comment: foundComment});
				}
			})
		}
	});
})

//UPDATE ROUTE EDIT COMMENT 
router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res){
	//Find and update the correct comment
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err)
		} else {
			Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
				if(err){
					console.log(err);
				} else {
				req.flash('success', "Your review about " + campground.name + " has been updated and it's now live. Thank you!");
				res.redirect('/campgrounds/' + req.params.id);
				}
			});
		}
	})
});


//DELETE COMMENT
router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err)
		} else {
			Comment.findByIdAndRemove(req.params.comment_id, function(err){
				if(err){
					console.log(err);
					req.flash('error', 'Ups, something went wrong');
				} else {
					req.flash('success', "Your review about " + campground.name + " has been deleted");
					res.redirect('back');
				}
			})
		}
	})
});

module.exports = router;