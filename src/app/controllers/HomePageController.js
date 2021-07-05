const Book = require('../models/books');
const User = require('../models/users');

class SiteController {
  index(req, res) {
        res.render('home')
};
}

module.exports = new SiteController();