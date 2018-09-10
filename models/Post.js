const mongoose = require("mongoose")
const Schema = mongoose.Schema

// CREATE SCHEMA
const postSchema = new Schema({
	pAuthor: { type: Schema.Types.ObjectId, ref: "User", required: true },
	pTitle: { type: String, required: true },
	pBody: { type: String, required: true },
	pImage: { type: String, required: true },
	pAllowComments: { type: Boolean, required: true },
	pIsPublished: { type: Boolean, required: true },
	pComments: [
		{
			cAuthor: {type: Schema.Types.ObjectId, ref: "User", required: true},
			cTitle: {type: String, required: true},
			cBody: {type: String, required: true},
		}, {
			timestamps: true
		}
	]
}, {
	timestamps: true
})

const Post = mongoose.model("posts", postSchema)
module.exports = Post