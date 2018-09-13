const express = require("express")
const Post = require("../models/Post.js")
const router = express.Router()

// WELCOME PAGE (NOT LOGGED)
router.get("/", (req, res, next) => {
   res.render("index/welcome.hbs")
})

// ABOUT ME PAGE
router.get("/aboutme", (req, res, next) => {
  res.render("index/about-page.hbs")
})

// DASHBOARD (ADMIN)
router.get("/dashboard", (req, res, next) => {
  //res.send("It works")
  res.render("index/dashboard.hbs")
})



module.exports = router;