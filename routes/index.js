const express = require("express")
const Post = require("../models/Post.js")
const router = express.Router()

// WELCOME PAGE (NOT LOGGED)
router.get("/", (req, res, next) => {
  //res.send("It works")
  res.redirect("/posts")
})

// // DASHBOARD (ADMIN)
// router.get("/dashboard", (req, res, next) => {
//   //res.send("It works")
//   res.render("index/dashboard.hbs")
// })

module.exports = router;