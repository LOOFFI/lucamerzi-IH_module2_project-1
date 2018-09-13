const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const passport = require("passport")
const hbs = require("hbs")
const bodyParser   = require('body-parser');

// LOAD MODELS
require("./models/User.js")
require("./models/Post.js")

// PASSPORT CONFIG
require("./config/passport")(passport)

// LOAD ROUTES
const auth = require("./routes/auth.js")
const index = require("./routes/index.js")
const posts = require("./routes/posts.js")

// LOAD KEYS
const keys = require("./config/keys.js")

// MAP GLOBAL PROMISES
mongoose.Promise = global.Promise
// MONGOOSE CONNECT
mongoose.connect(keys.mongoURI)
	.then( () => console.log("MongoDB connected") )
	.catch(err => console.log(err))


const app = express()

// HBS MIDDLEWARE
// hbs.registerPartials(path.join(__dirname, "views", "partials"));
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', "hbs");
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// hbs.registerHelper("superif", function(a, b, options){
//  if (a.toString() === b.toString()) {
// 	 options.fn(this)
//  }
//  else {
// 	 options.inverse(this)
// 	}
	 
// })
hbs.registerHelper("editIcon", function(storyUser, loggedUser, storyId){
	if(storyUser == loggedUser){
			return `<p uk-margin>
			<a class="uk-button uk-button-danger" href="/posts/comment-delete/${storyId}" uk-icon="icon: trash"></a>
		</p>`;
		} else {
		return 'You cannot edit or remove this';
	}
})



// MIDDLEWARE BODY PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// MIDDLEWARE COOKIE PARSER
app.use(cookieParser())
app.use(session({
	secret: "secret",
	resave: false,
	saveUninitialized: false,
}))

// PASSPORT MIDDLEWARE
app.use(passport.initialize())
app.use(passport.session())

// SET GLOBAL VARS
app.use((req, res, next) => {
	res.locals.user = req.user || null
	next()
})

// USE ROUTES
app.use("/", index)
app.use("/auth", auth)
app.use("/posts", posts)

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Seervers started on ${port}`)
});