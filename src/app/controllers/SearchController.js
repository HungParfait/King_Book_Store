const Book = require('../models/books');

class SiteController {
  index(req, res) {
    const query = req.query.q;
    
    const queryString = new RegExp(query,'i')
    
    Book.find({name: queryString}).limit(16).exec(function(err, names) {

      names = names.map(name => name.toObject());

      if (!err) res.render('search', {names} )
    })
       
}
}

module.exports = new SiteController();