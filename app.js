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