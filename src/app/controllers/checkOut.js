const Book = require('../models/books');
const Cart = require('../models/cart');
const Order = require('../models/order')
var tax = 1.1
module.exports.checkOut = function (req, res) {
    Cart.findOne({ userId: req.user }, async function (err, cart) {
        let products = [];
        if (!err) {
            if (cart) {
                for (let i = 0; i < cart.products.length; i++) {
                    let product = await Book.findById(cart.products[i].productId);
                    products.push({
                        number: i + 1,
                        id: cart.products[i].productId,
                        image: product.image,
                        author: product.author,
                        name: product.name,
                        price: (product.price * cart.products[i].quantity).toFixed(2),
                        quantity: cart.products[i].quantity
                    });
                }
                let priceTax = cart.price * tax;
                priceTax = +(priceTax.toFixed(2));
                res.render('cart', { user: [{ price: cart.price, priceTax: priceTax }], products: products })
            }

            else {
                res.render('cart', { user: [0], products: [] });
            }
        }
    }
    )
}


module.exports.pay = function (req, res) {
    const query = req.body;
    const paidItems = Object.keys(query);
    let orderItems = [], moneyToPay = 0

    Cart.findOne({ userId: req.user }, function (err, cart) {
        if (!err) {
            paidItems.map(item => {
                let itemInfo = cart.products.find(({ productId }) => productId === item);
                moneyToPay += itemInfo.price * itemInfo.quantity;
                orderItems.push(itemInfo);
            }
            )

            Order.findOne({ userId: req.user }, async function (err, user) {
                if (err) {
                    res.status('500').send('Lỗi')
                }
                else {
                    if (user) {
                        user.orders.push({
                            money: +(moneyToPay.toFixed(2)),
                            items: orderItems,
                        })
                        //cap nhat hang hoa va so tien con lai trong gio
                        cart.products = cart.products.filter(books => paidItems.find( x => x === books.productId ) === undefined);
                        cart.price = 0;
                        for (let i = 0; i < cart.products.length; i++) {
                            cart.price += cart.products[i].quantity * cart.products[i].price;
                        }
                        cart.price = +(cart.price.toFixed(2));
                        await user.save();
                        await cart.save();
                    }
                    else {
                        const newOrderUser = new Order({
                            userId: req.user,
                            order: [
                                {
                                    money: +(moneyToPay.toFixed(2)),
                                    items: orderItems,
                                }
                            ]
                        })
                        await newOrderUser.save();
                    }
                    res.redirect('/order')
                }
            })

        }
        else {
            res.status('500').send('Lỗi')
        }

    });
}
