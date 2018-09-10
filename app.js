const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const passport = require("passport")
const hbs = require("hbs")

// LOAD USER MODEL
require("./models/User.js")

// PASSPORT CONFIG
require("./config/passport")(passport)

// LOAD ROUTES
const auth = require("./routes/auth.js")
const index = require("./routes/index.js")
const admin = require("./routes/admin.js")

// LOAD KEYS
const keys = require("./config/keys.js")


// MAP GLOBAL PROMISES
mongoose.Promise = global.Promise
// MONGOOSE CONNECT
mongoose.connect(keys.mongoURI)
  .then( () => console.log("MongoDB connected") )
  .catch(err => console.log(err))


const app = express()



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
app.use("/admin", admin)


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Seervers started on ${port}`)
});