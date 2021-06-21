const Book = require('../models/books');

class SiteController {
  index(req, res) {
    const query = req.query ;
    
    Book.find({category: req.params.category}).skip((query.page - 1) * 16).limit(+query.limit).exec(function(err, names) {

      names = names.map(name => name.toObject());

      if (!err) res.json( {names} );
    })
}
}

module.exports = new SiteController();