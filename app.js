const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const passport = require("passport")
const hbs = require("hbs")
const bodyParser   = require('body-parser');
const path = require("path")

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


//////////// WHEN APP DEPLOYED ON HEROKU - MLAB MONGODB ///////////// 
// MAP GLOBAL PROMISES
//					 mongoose.Promise = global.Promise
// MONGOOSE CONNECT
// 					 mongoose.connect(keys.mongoURI,{useNewUrlParser: true})
//					 	.then( () => console.log("MongoDB connected") )
//					 	.catch(err => console.log(err))
// mongoose.Promise and .connect à decommenter quand on déploie sur Heroku 

mongoose
	.connect('mongodb://localhost/project2', {useNewUrlParser: true})
	.then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app = express()

// HBS MIDDLEWARE
app.set('view engine', "hbs");

// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, "public")))

// hbs.registerHelper("superif", function(a, b, options){
//  if (a.toString() === b.toString()) {
// 	 options.fn(this)
//  }
//  else {
// 	 options.inverse(this)
// 	}
// })

hbs.registerHelper("editIcon", function(storyUser, loggedUser, storyId, commentId){
	if(storyUser == loggedUser){
			return `<p uk-margin>
			<a class="uk-button uk-button-danger" href="/posts/comment-delete/${storyId}/${commentId}" uk-icon="icon: trash"></a>
		</p>`;
		} else {
		return '';
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


const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Servers started on ${port}`)
});