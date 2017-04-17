var db = require(__dirname + '/../lib/mysql');

exports.Search = function (req, res, next) {
  let searchQuery = req.params.searchQuery;
  let sqlQuery = 'SELECT * FROM fiftyshadesofgrey where match(summary) against (?);';

  function action(err, rows) {
    if(err){
      res.status(500).send({
        'message':'Database error!',
        'error': err
      });
    }
    else{
      res.status(200).send(rows);
    }
  }

  db.query(sqlQuery, [searchQuery], action);
}
