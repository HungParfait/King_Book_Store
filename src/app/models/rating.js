const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Comment = new Schema({
    productId: { type: String, required: true },
    ratings: [
        {
            userId: { type: String, required: true },
            star_rating: { type: Number, required: true },
            comments: { type: String },
        }
    ]
})

module.exports = mongoose.model('comments', Comment);