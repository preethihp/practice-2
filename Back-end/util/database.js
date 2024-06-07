const mysql = require('mysql2');

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    database:"expense-tracker-app",
    password:"preethi"
});

module.exports = pool.promise();