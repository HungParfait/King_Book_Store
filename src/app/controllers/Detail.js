const Book = require('../models/books');
const User = require('../models/users');
const Cart = require('../models/cart');
const Rating = require('../models/rating')

module.exports.path = function (req, res) {
  const query = req.params;
  Book.findById(query._id).exec(async function (err, details) {
    let sachs = [];
    let authors, formats, authorName, forMat, comments;
    let data = {
      authors: [],
      formats: [],
      comments: [],
    };
    if (!err) {
      details = details.toObject();
      sachs.push(details);
      data.details = sachs;
      authorName = sachs[0].author;
      forMat = sachs[0].format;
      bookComments = await Rating.findOne({ productId: query._id });
      bookComments = bookComments?.toObject();
      data.comments = bookComments?.ratings;
      Book.find({ author: authorName }).limit(5).exec(function (err, details) {
        authors = details.map(detail => detail.toObject());
        data.authors = authors;

        Book.find({ format: forMat }).limit(5).exec(function (err, details) {
          formats = details.map(detail => detail.toObject());
          data.formats = formats;

          res.render('detail', { data })
        }
        )
      }
      )
    }
  }
  )
}


module.exports.add = async function (req, res) {
  const query = req.body;
  const response = await Book.findById(query.id);
  Cart.findOne({ userId: req.user }, async function (err, cart) {
    if (!err) {
      if (cart) {
        for (let i = 0; i < cart.products.length; i++) {
          if (query.id === cart.products[i].productId) {
            cart.products[i].quantity += +query.quantity;
            cart.price += (response.price * +query.quantity);
            cart.price = +cart.price.toFixed(2);
            await cart.save();
            res.status('200').send('Đã thêm vào giỏ hàng');
            return;
          }
        }
        cart.products.push({
          quantity: +query.quantity,
          price: +response.price,
          productId: query.id
        })
        cart.price = +((cart.price + (+response.price * +query.quantity)).toFixed(2));
        await cart.save();
        res.status('200').send('Đã thêm vào giỏ hàng');
      }
      else {
        const newCart = new Cart({
          userId: req.user,
          price: (response.price * +query.quantity),
          products: [{
            quantity: +query.quantity,
            price: +response.price,
            productId: query.id
          }],
        })
        await newCart.save();
        res.status('200').send('Đã thêm vào giỏ hàng');

      }
    }
    else {
      res.status('500').send('Lỗi')
    }
  })
}

module.exports.update = function (req, res) {
  const query = req.body;
  Cart.findOne({ userId: req.user }, async function (err, cart) {
    if (!err) {
      if (cart) {
        for (let i = 0; i < cart.products.length; i++) {
          if (query.bookId === cart.products[i].productId) {
            cart.price -= +(((+cart.products[i].quantity) * (+cart.products[i].price)).toFixed(2));
            cart.products[i].quantity = query.quantity;
            cart.price += +(((+cart.products[i].quantity) * (+cart.products[i].price)).toFixed(2));
            cart.price = +(cart.price.toFixed(2));
            await cart.save();
            let newPrice = (+query.quantity * cart.products[i].price).toFixed(2);
            res.status('200').json({ price: newPrice, money: cart.price });
          }
        }
      }
      else {
        res.status('500').send('Something went wrong!');
      }
    } 
    else{
      res.status('500').send('Something went wrong!');
    }
  })
  }

module.exports.delete = function (req,res) {
  const query = req.body;
  Cart.findOne({ userId: req.user }, async function (err, cart) {
    if (!err) {
      if (cart) {
        cart.products = cart.products.filter(books => books.productId !== query.id);
        cart.price = 0;
        for (let i = 0; i < cart.products.length; i++) {
          cart.price += cart.products[i].quantity * cart.products[i].price;
        }
        
        cart.price = +(cart.price.toFixed(2));
        await cart.save();
        res.status('200').json({money: cart.price});
      }
    }
})
}
  


