var db = require(__dirname + '/../lib/mysql');

exports.Search = function (req, res, next) {
  let searchQuery = req.params.searchQuery;
  let sqlQuery = 'SELECT * FROM reviews where match(review) against (?);';

  function action(err, rows) {
    if(err){
      res.status(500).send({
        'message':'Database error!',
        'error': err
      });
    }
    else{
      let bookQuery = 'SELECT DISTINCT book_title from reviews;';
      db.query(bookQuery, function (err1, rows1) {

        if(err1){
          res.status(500).send({
            'message':'Database error!',
            'error': err1
          });
        } else {
          res.status(200).send({
            results: rows,
            books: rows1
          });
        }
      });
    }
  }

  db.query(sqlQuery, [searchQuery], action);
}
