const Book = require('../models/books');

class SiteController {
  index(req, res) {
    
    const query = req.params;
    Book.find({category: query.category }).limit(16).exec(function(err, categorys) {

      categorys = categorys.map(category => category.toObject());

      if (!err) res.render('category', {categorys} )
    })
       
}
}

module.exports = new SiteController();