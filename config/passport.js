const passportGoogle = require('passport-google-oauth');
const mongoose = require("mongoose");
const keys = require("./keys.js");
const User = mongoose.model("User");
const GoogleStrategy = passportGoogle.OAuth2Strategy;



module.exports = function(passport){
	passport.use(
		new GoogleStrategy({
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback",
			proxy: true,
		}, (accessToken, refreshToken, profile, done) => {
			const image = profile.photos[0].value
			const newUser = {
				googleID: profile.id,
				firstName: profile.name.givenName,
				lastName: profile.name.familyName,
				email: profile.emails[0].value,
				image: image
			}

		
			User.findOne({ googleID: profile.id })
			.then(user => {
				if (user) {
				  
					done(null, user);
				} else {
					
					new User(newUser)
					.save()
					.then(user => done(null, user))
				}
			})
			.catch(err => console.log(err))

			passport.serializeUser((user, done) => {
				done(null, user.id)
			})

			passport.deserializeUser((id, done) => {
				User.findById(id)
					.then(user => done(null, user))
			})


		})
	)
}