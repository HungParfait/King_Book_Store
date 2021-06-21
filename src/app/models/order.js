const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Order = new Schema({
    userId: { type: String, required: true },
    orders: [
        {
            money: { type: Number, required: true },
            items: [
                {
                productId: { type: String, required: true },
                price: { type: Number, required: true },
                quantity: { type: Number, required: true }
                }
            ],
            order_at: {type: Date, default: Date.now }
        },
        
    ]
})

module.exports = mongoose.model('orders', Order);
