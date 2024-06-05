const mysql = require('mysql2');

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'booking-appointment',
    password:'preethi'

});

module.exports = pool.promise();



