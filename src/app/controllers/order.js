const Order = require('../models/order')
const Book = require('../models/books')
const Rating = require('../models/rating')

module.exports.loadHistory = function (req, res) {
    Order.findOne({ userId: req.user }, async function (err, order) {
        let userOrders = [];
        if (!err) {
            if (order) {
                for (let i = 0; i < order.orders.length; i++) {
                    let products = [];
                    for (let j = 0; j < order.orders[i].items.length; j++) {
                        let product = await Book.findById(order.orders[i].items[j].productId);
                        products.push({
                            id: order.orders[i].items[j].productId,
                            image: product.image,
                            author: product.author,
                            name: product.name,
                            price: (order.orders[i].items[j].price * order.orders[i].items[j].quantity).toFixed(2),
                            quantity: order.orders[i].items[j].quantity
                        });
                    }

                    userOrders.push({
                        money: order.orders[i].money, time: order.orders[i].order_at, products
                    })
                }
                res.render('order', { orders: userOrders });
            }
            else {
                res.render('order', { orders: [] });
            }
        }
    }
    )
}

module.exports.loadComment = function (req, res) {
    const { id, star, comment } = req.body;
    if (id && star) {
        Rating.findOne({ productId: id }, async function (err, rating) {
            if (rating) {
                for (let i = 0; i < rating.ratings.length; i++) {
                    if (id === rating.ratings[i].userId) {
                        rating.ratings[i].star_rating = +star;
                        rating.ratings[i].comment = comment
                        await rating.save();
                        res.status('200').send('Đã cập nhật đánh giá');
                        return;
                    }
                }
                rating.ratings.push({
                    userId: req.user,
                    star_rating: star,
                    comments: comment,
                });
                await rating.save();
            }
            else {
                const newRating = new Rating({
                    productId: id,
                    ratings: [
                        {
                            userId: req.user,
                            star_rating: star,
                            comments: comment,
                        }
                    ]

                })
                await newRating.save();
            }
            res.status('200').send('Success')
        })
    }
    else {
        res.status('404').send('Lỗi');
    }
}