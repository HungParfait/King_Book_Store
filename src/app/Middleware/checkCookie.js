const User = require('../models/users');
const jwt = require("jsonwebtoken")
const Cart =  require('../models/cart');
const Book = require('../models/books');
module.exports.check = async function (req, res, next) {
    try {
        const token = req.cookies.c_user;
        let decodedData;
        if (token) {
            try {
                decodedData = jwt.verify(token, 'duchung-email');
                if (decodedData) {
                    const user = await User.findById(decodedData?._id);
                    if (user) {
                        req.user = user._id;
                        next();
                    }
                    else {
                        req.user = decodedData?._id;
                        next();
                    }
                }
            }
            catch (err) {
                res.clearCookie('c_user', { path: '/login' });
                res.send('Hết phiên. Bạn cần đăng nhập lại')
            }
        }
        else {
            res.send('Bạn cần đăng nhập')
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.checkDisplay = async function (req, res, next) {
    try {
        Book.distinct('category', function (err, book) {
            if (!err) {
              res.locals.book = book;
              };
      });
        const token = req.cookies.c_user;
        let decodedData;
        if (token) {
            try {
                decodedData = jwt.verify(token, 'duchung-email');
                if (decodedData) {
                    const user = await User.findById(decodedData?._id);
                    const cart = await Cart.findOne({userId: decodedData?._id});
                    res.locals.logedIn = true;
                    res.locals.number = cart?.products?.length;
                    if (user) {
                        await User.findById(decodedData?._id);
                        if(user.user_name) {
                            res.locals.username = user.user_name;
                        }
                        else {
                            res.locals.username = 'No user name';
                        }
                        next();
                    }
                    else {
                        res.locals.username = decodedData?.username;
                        next();
                    }
                }
            }
            catch (err) {
                next();
            }
        }
        else {
            next();
        }
    } catch (error) {
        console.log(error);
    }
}
