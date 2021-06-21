const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const User = new Schema({
    name: {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true }
    },
    user_name: { type: String, required: true },
    email: { type: String, required: true },
    id: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('google_users', User);
