const express = require("express");
const Post = require("../models/Post.js");
const router = express.Router();

// POSTS
router.get("/", (req, res, next) => {

	Post.find()
	.populate("pAuthor")
	.then(documentsArray => {
		// documentsArray.map(el => {
		// 	console.log(el.pBody)
		// })
		console.log(documentsArray)
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
	const posthead = pBody.slice(0, 50)
	const postbody = pBody.slice(50)
	const pAuthor = req.user;

	Post.create({pTitle, postbody, posthead, pImage, pAllowComments, pIsPublished, pAuthor })
	.then(newDoc => {
		res.redirect("/posts")
	})
	.catch(err => console.log(err))

})

module.exports = router;