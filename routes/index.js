const express = require("express")
const Post = require("../models/Post.js")
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
  if (req.user){
    req.user.isAdmin ? res.render("admin/new-post.hbs") : res.redirect("/")
  } else {
    res.redirect("/")
  }
})

router.post("/posts/new", (req, res, next) => {
  // DESTRUCTURE REQUEST
  const { pTitle, pBody, pImage, pAllowComments, pIsPublished } = req.body
  
  const pAuthor = req.user;

  Post.create({pTitle, pBody, pImage, pAllowComments, pIsPublished, pAuthor })
  .then(newDoc => {
    res.redirect("/posts")
  })
  .catch(err => console.log(err))

})

module.exports = router;