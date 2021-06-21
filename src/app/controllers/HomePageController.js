const Book = require('../models/books');
const User = require('../models/users');

class SiteController {
  index(req, res) {
    Book.distinct('category', async function (err, book) {
      if (!err) {
        res.render('home', {book})
        };

});

  }
}
module.exports = new SiteController();