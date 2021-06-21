const mongoose = require('mongoose')
const Schema = mongoose.Schema;

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
    img_paths: String
});

module.exports = mongoose.model('books', Book);
