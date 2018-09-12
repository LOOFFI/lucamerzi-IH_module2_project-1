const express = require("express");
const Post = require("../models/Post.js");
const router = express.Router();


// POSTS
router.get("/", (req, res, next) => {
	
	//Post.find()
	Post.find()
	//.sort(['createdAt', 1])
	.populate("pAuthor")
	.then(documentsArray => {
		// documentsArray.map(el => {
		// 	console.log(el.pBody)
		// })
		//console.log(documentsArray)
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
	const { pTitle, pDescription ,pBody, pImage, pAllowComments, pIsPublished } = req.body
	const pAuthor = req.user;

	Post.create({pTitle, pDescription, pBody, pImage, pAllowComments, pIsPublished, pAuthor })
	.then(newDoc => {
		res.redirect("/posts")
	})
	.catch(err => console.log(err))
	
})

// SHOW ONE POST
router.get("/:id", (req,res,next) => {
	// IS ADMIN/ LOGGED
	let userIsLogged = req.user
	let userIsAdmin
	if (userIsLogged){
		userIsAdmin = req.user.isAdmin
	}
	res.locals.userIsLogged = userIsLogged;
	res.locals.userIsAdmin = userIsAdmin;
	
	const {id} = req.params;
	Post.findById(id)
		.populate("pAuthor")
		.populate("pComments.cAuthor")
		.then(postDoc => {
			//res.send(postDoc)
			// res.locals.isCommentAuthor = req.user._id === 
			// postDoc.pComments.forEach((el, i) => {
			// 	// res.locals.isCommentAuthor = (el.cAuthor._id.toString() === req.user._id.toString())
			// 	// console.log(el.cAuthor._id.toString() === req.user._id.toString())
			// 	// console.log(i)
			// 	el.isCommentAuthor = (el.cAuthor._id.toString() === req.user._id.toString())
			// 	console.log(req.user)
			// })
			// res.send(postDoc.pComments)
			res.locals.postItem = postDoc;
			if (req.user){
				res.locals.user = req.user;
			}
			
			res.render("index/show-post.hbs");
		})
		.catch(err => next(err));
})

// EDIT ONE POST
router.get("/:id/edit", (req,res,next) => {
	const {id} = req.params;
	Post.findById(id)
		.populate("pAuthor")
		.then(postDoc => {
			res.locals.postItem = postDoc;
			res.render("index/edit-post.hbs");
		})
		.catch(err => next(err));
})

// EDITING UPDATING
router.post("/:id/process-edit", (req,res,next) => {
	const {id} = req.params;
	const { pTitle, pBody, pImage, pAllowComments, pIsPublished }= req.body;

	Post.findByIdAndUpdate(
		id,
		{$set: {pTitle, pBody, pImage, pAllowComments, pIsPublished} },
		{ runValidators: true })
		.then(postDoc => {
			res.redirect(`/posts/${id}`);
		})
		.catch(err => next(err));
 
});

// DELETING
router.get("/:id/delete", (req,res,next) => {
	const { id } = req.params;

	Post.findByIdAndRemove(id)
		.then(postDoc => {
			res.redirect("/posts");
		})
		.catch(err => next(err));
});

// PROCESS COMMENT
router.post("/:postId/process-comment", (req, res, next) => {
	
	console.log(req.user)


	// COMMENT OBJECT FIELDS
	const comment = {
		cAuthor : req.user,
		cBody : req.body.commentBody,
	}

	// POST ID
	const {postId} = req.params
	
	Post.findById( {_id: postId} )
	.then(foundDoc => {
		foundDoc.pComments.unshift(comment)
		foundDoc.save()
			.then(foundDocWithComment => {
				console.log(foundDocWithComment.pComments)
				res.redirect(`/posts/${postId}`)
			})
			.catch(err => console.log(err))
	})
	.catch(err => console.log(err))
})

module.exports = router;