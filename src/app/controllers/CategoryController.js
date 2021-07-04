const Book = require('../models/books');

class SiteController {
  index(req, res) {
    const query = req.params;
    const page = req.query.p || 1;
    Book.find({category: query.category }).skip((+page - 1) * 16).limit(16).exec(function(err, categorys) {
      categorys = categorys.map(category => category.toObject());

      if (!err) res.render('category', {categorys} )
    })
       
}
}

module.exports = new SiteController();