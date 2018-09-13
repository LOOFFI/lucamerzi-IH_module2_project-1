const mongoose = require("mongoose")
const Schema = mongoose.Schema

// CREATE SCHEMA
const postSchema = new Schema({
	pTitle: { type: String, required: true },
	pDescription: { type: String },
	pBody: { type: String, required: true },
	pImage: { type: String, required: true },
	pImagePortfolio: [String],
	pAllowComments: { type: Boolean, required: true },
	pIsPublished: { type: Boolean, required: true },
	pAuthor: { type: Schema.Types.ObjectId, ref: "User", required: true },
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

const Post = mongoose.model("Post", postSchema)
module.exports = Post