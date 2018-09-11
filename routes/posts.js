const express = require("express")
const Post = require("../models/Post.js")
// const User = require("../models/User.js")
const router = express.Router()


// POSTS
router.get("/", (req, res, next) => {
	
	Post.find()
	.populate("pAuthor")
	.then(documentsArray => {
		// console.log(documentsArray)
		res.locals.posts = documentsArray
		res.render("index/posts.hbs")
	})
	.catch(err => console.log(err))
	
})


// SHOW NEW POST FORM
router.get("/new", (req, res, next) => {
	if (req.user){
		req.user.isAdmin ? res.render("index/new-post.hbs") : res.redirect("/")
	} else {
		res.redirect("/")
	}
})
// PROCESS NEW POST
router.post("/new", (req, res, next) => {
	// DESTRUCTURE REQUEST
	const { pTitle, pBody, pImage, pAllowComments, pIsPublished } = req.body
	
	const pAuthor = req.user;
	
	Post.create({pTitle, pBody, pImage, pAllowComments, pIsPublished, pAuthor })
	.then(newDoc => {
		res.redirect("/posts")
	})
	.catch(err => console.log(err))
	
})

// SHOW ONE POST
router.get("/:id", (req,res,next) => {
	const {id} = req.params;
	Post.findById(id)
		.populate("pAuthor")
		.then(postDoc => {
			res.locals.postItem = postDoc;
			res.render("index/show-post.hbs");
		})
		.catch(err => next(err));
})

module.exports = router;