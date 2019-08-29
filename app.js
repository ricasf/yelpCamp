var express        = require('express'),
	app            = express(),
	request        = require('request'),
	passport       = require('passport'),
	LocalStrategy  = require('passport-local'),
	bodyParser     = require('body-parser'),
	methodOverride = require('method-override'),
	mongoose       = require('mongoose'),
	flash          = require('connect-flash'),
	Campground     = require('./models/campground'),
	Comment        = require('./models/comment'),
	User           = require('./models/user'),
	seedDB         = require('./seeds');

//requiring routes
var campgroundRouter = require('./routes/campground'),
	commentsRouter = require('./routes/comments'),
	indexRouter = require('./routes/index');

// Connect with DB 
mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true });
// Body-Parser - extract the entire body portion of an incoming request stream and exposes it on req.body
app.use(bodyParser.urlencoded({extended: true}));
// Static style sheet (main CSS)
app.use(express.static(__dirname + '/public'));
// Set app to use as default view engine .EJS
app.set('view engine', 'ejs');
//Override for METHOD
app.use(methodOverride('_method'));
// Connect-flash (show alerts)
app.use(flash());

//seed DB file
// seedDB();//seed the DB

// PASSPORT CONFIG
app.use(require('express-session')({
	secret: 'Bob is the best dog in the world',
	resave: false,
	saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Current user to be avaliable across all app
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

app.use('/campgrounds', campgroundRouter);
app.use('/campgrounds/:id/comments', commentsRouter);
app.use(indexRouter);

// SERV LISTEN
app.listen(3000, function(){
	console.log('The YelpCamp sever is live');
});

