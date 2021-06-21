const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const User = new Schema({
    given_name: { type: String},
    family_name: { type: String},
    user_name: {type: String},
    email: { type: String, required: true},
    password: { type: String, required: true},
    shipping_address: {
        home:  { type: String},
        street: { type: String},
        district: { type: String},
        city: { type: String},
    },
}, { timestamps: true });

module.exports = mongoose.model('users', User);
