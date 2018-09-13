module.exports = {
	
	ensureAuthenticated: function(req, res, next){
		if (req.isAuthenticated()){
			return next()
		} else {
			res.redirect("/posts")
		}
	},

	ensureAdmin: function(req, res, next){
		if (req.user){
			if (req.user.isAdmin){
				return next()
			} else {
				console.log(`you are not admin!!!`)
				res.redirect("/posts")
			}
		} else {
			res.redirect("/posts")
		}
	}

}