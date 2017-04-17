var db = require(__dirname + '/../lib/mysql');

exports.Search = function (req, res, next) {
  let searchQuery = req.params.searchQuery;
  let sqlQuery = 'SELECT * FROM fiftyshadesofgrey where match(review) against (?);';

  function action(err, rows) {
    if(err) return (err);
		res.status(200).send(rows);
  }

  db.query(sqlQuery, [searchQuery], action);
}
