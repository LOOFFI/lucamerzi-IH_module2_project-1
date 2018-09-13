const express = require("express")
const router = express.Router()
const passport = require("passport")

router.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}))

router.get('/google/callback',
	// Failed to authenticate, redirect to home
	passport.authenticate('google', { failureRedirect: '/posts' }),
	(req, res) => {
		// Successful authentication, redirect to dashboard
		res.redirect('/posts');
	});

router.get("/verify", (req, res, next) => {
	if (req.user){
		console.log(req.user)
	} else {
		console.log("Not Auth")
	}
})

router.get("/logout", (req, res, next) => {
	req.logout()
	res.redirect("/posts")
})

module.exports = router;