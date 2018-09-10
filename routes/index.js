const express = require("express")
const router = express.Router()

// WELCOME PAGE (NOT LOGGED)
router.get("/", (req, res, next) => {
  //res.send("It works")
  res.render("index/welcome.hbs")
})

// DASHBOARD (ADMIN)
router.get("/dashboard", (req, res, next) => {
  //res.send("It works")
  res.render("admin/dashboard.hbs")
})

// POSTS
router.get("/posts", (req, res, next) => {
  res.render("index/posts.hbs")
})

// NEW POST
router.get("/posts/new", (req, res, next) => {
  res.render("admin/new-post.hbs")
})

module.exports = router;