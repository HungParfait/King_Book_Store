const Book = require('../models/books');

class SiteController {
  index(req, res) {
    const query = req.body.params;

    const queryString = new RegExp( query.q ,'i')

    Book.find({name: queryString}).skip((+query.page - 1) * 16).limit(+query.limit).exec(function(err, names) {

      names = names.map(name => name.toObject());

      if (!err) res.render('category', {names, layout: false} );
    })
}
}

module.exports = new SiteController();