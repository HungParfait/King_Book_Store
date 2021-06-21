const Book = require('../models/books');

module.exports.loadInfinite = function(req, res) {
    const index = req.query.index;

    Book.distinct('category', function (err, book) {

      if(index < book.length) {
        if (!err) {
          let top4, top1, top2, top3;
          let data = {
            layout: false,
            book: [book[+index]]
          };
          Book.find({ category: book[+index], book_depository_stars: { $gt: 4, $lt: 5 } }).limit(5).exec(function (err, details) {
            top1 = details.map(detail => detail.toObject());
            data.top1 = top1;
  
            Book.find({ category: book[+index], book_depository_stars: { $gt: 3, $lt: 4 } }).limit(5).exec(function (err, details) {
              top2 = details.map(detail => detail.toObject());
              data.top2 = top2;
  
              Book.find({ category: book[+index],book_depository_stars: { $gt: 2, $lt: 3 } }).limit(5).exec(function (err, details) {
                top3 = details.map(detail => detail.toObject());
                data.top3 = top3;
  
                Book.find({ category: book[+index],book_depository_stars: { $gt: 1, $lt: 2 } }).limit(5).exec(function (err, details) {
                  top4 = details.map(detail => detail.toObject());
                  data.top4 = top4; 
                  res.render('more', data);
                }
                )
              }
              )
            }
            )
        }
          )
        }
      }
      else {
        res.json({data: null})
      }
  });

}