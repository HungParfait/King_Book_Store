const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Cart = new Schema({
    userId: { type: String, required: true, unique: true},
    price: { type: Number, required: true},
    products: [
        {
            productId: { type: String, required: true},
            price: { type: Number, required: true},
            quantity: { type: Number, required: true}
        }
    ] 
    }
)
module.exports = mongoose.model('carts', Cart);
