var mysql = require('mysql');

var connectionSettings = {
		host	: 'localhost',
		user	: 'root',
		password: '',
		database: 'cmsc191-ir'
	};
var db_connection = mysql.createConnection(connectionSettings);
module.exports = db_connection;
