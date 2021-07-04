const Book = require('../models/books');

class SiteController {
  index(req, res) {
    const query = req.query;
    
    const queryString = new RegExp(query.q,'i')
    const page = +(query.p || 1);  
    Book.find({name: queryString}).skip((page  - 1) * 16).limit(16).exec(function(err, names) {

      names = names.map(name => name.toObject());

      if (!err) res.render('search', {names} )
    })
}
}

module.exports = new SiteController();