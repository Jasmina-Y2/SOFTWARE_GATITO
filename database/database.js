var mysql  = require('mysql');

var connection = mysql.createConnection({
  host     : 'https://github.com/Jasmina-Y2/SOFTWARE_GATITO',
  user     : 'yhoncito24',
  password : 'teamoyhon1',
  database : 'SOFTWARE_GATITO',
  port     : 3306,
});

connection.connect();


module.exports = connection;


