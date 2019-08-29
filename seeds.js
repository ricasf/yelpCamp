var mongoose   = require('mongoose'),
	Campground = require('./models/campground'),
	Comment    = require('./models/comment'),
	data       =
	[
		{
		name: "Cloud's rest",
		image: 'https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1088&q=80',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pulvinar laoreet pretium. Aenean iaculis odio at ligula condimentum, et vulputate mi tempor. Nulla viverra quis justo quis volutpat. Curabitur eu ligula nisl. Morbi aliquet dolor eget pretium tempor. Nulla quis neque metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tellus odio, dictum ac eleifend id, tincidunt ac dolor. Morbi rutrum, quam vel aliquam dictum, sapien augue fermentum nisl, in dictum nisi arcu eu turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean posuere aliquet ipsum. Praesent quis purus pretium metus convallis faucibus sed a dolor. Quisque lacinia sem turpis, eget sagittis enim vehicula ac. Praesent magna lectus, ultricies non dictum sed, egestas non dolor. Quisque cursus viverra vehicula. Donec sed lacinia erat. Nam quis accumsan est. Suspendisse tristique turpis dictum ex scelerisque, vel accumsan lacus mollis. Morbi at vulputate ex. Vivamus nec magna eu elit mollis tempor ut ac metus. Integer varius lorem sit amet porta volutpat. Praesent in efficitur enim. In ultrices nulla ac urna aliquet, nec maximus tellus vehicula. Sed molestie mi in blandit maximus.'
		},
		{
		name: "Cloud's Nest",
		image: 'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pulvinar laoreet pretium. Aenean iaculis odio at ligula condimentum, et vulputate mi tempor. Nulla viverra quis justo quis volutpat. Curabitur eu ligula nisl. Morbi aliquet dolor eget pretium tempor. Nulla quis neque metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tellus odio, dictum ac eleifend id, tincidunt ac dolor. Morbi rutrum, quam vel aliquam dictum, sapien augue fermentum nisl, in dictum nisi arcu eu turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean posuere aliquet ipsum. Praesent quis purus pretium metus convallis faucibus sed a dolor.'
		},
		{
		name: "Cloud's Cucko",
		image: 'https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=959&q=80',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pulvinar laoreet pretium. Aenean iaculis odio at ligula condimentum, et vulputate mi tempor. Nulla viverra quis justo quis volutpat. Curabitur eu ligula nisl. Morbi aliquet dolor eget pretium tempor. Nulla quis neque metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tellus odio, dictum ac eleifend id, tincidunt ac dolor. Morbi rutrum, quam vel aliquam dictum, sapien augue fermentum nisl, in dictum nisi arcu eu turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. '
		}
	];

function seedDB(){
	// Remove all campgrounds
	Campground.deleteMany({}, function(err){
		if(err){
			console.log(err);
		} else {
			console.log('Removed campgrounds');
			// Add a few campgrounds
			data.forEach(function(seed){
				Campground.create(seed, function(err, campground){
					if(err){
						console.log(err);
					} else {
						console.log('Added a campground');
						//Create comments
						Comment.create(
							{
								text: 'This place is great, but I wish that there was internet',
								author: 'Homer'
							}, function(err, comment){
								if(err){
									console.log(err);
								} else {
									campground.comments.push(comment);
									campground.save();
									console.log('Created a new comment');
								}
							}
						);
					}
				});
			});
		}
	});	
}

module.exports = seedDB;

