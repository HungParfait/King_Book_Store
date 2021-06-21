const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug)

const Book = new Schema({
    image: String, 
    name: String,
    author: String,
    format: String,
    book_depository_stars: Number,
    price: Number,
    currency: String,
    old_price: Number,
    isbn: String,
    category: String,
    img_paths: String,
    slug: { type: String, slug: "name", unique: true, sparse: true }
});

module.exports = mongoose.model('books_standards', Book);
