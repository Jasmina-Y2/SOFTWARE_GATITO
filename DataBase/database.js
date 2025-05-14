
const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'b2aaeo3tkn0gkkcqrpy5-mysql.services.clever-cloud.com',
  user     : 'ufztbhpy9wsyfumn',
  password : 'npTXFSdSKABD3JskNq7o',
  database : 'b2aaeo3tkn0gkkcqrpy5'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

module.exports = connection;
