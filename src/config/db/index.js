const mongoose = require('mongoose');


async function connect() {
    try {
        await mongoose.connect('mongodb+srv://m001-duc-hung:m001-duc-hung-first@clusterstack.cyazk.mongodb.net/KingBook?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('connect successfully');
    } catch (error) {
        console.log('connect fail');
    }
}

module.exports = { connect };