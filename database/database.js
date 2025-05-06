var mysql  = require('mysql');

var connection = mysql.createConnection({
  host     : 'b2aaeo3tkn0gkkcqrpy5-mysql.services.clever-cloud.com',
  user     : 'ufztbhpy9wsyfumn',
  password : 'npTXFSdSKABD3JskNq7o',
  database : 'b2aaeo3tkn0gkkcqrpy5',
  port     : 3306,
});

connection.connect();


module.exports = connection;