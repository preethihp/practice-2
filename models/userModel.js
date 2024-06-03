const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'preethi',
    database: 'group-chat'
});


db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database as id ' + db.threadId);
});

exports.appendMessage = (username, message, callback) => {
    const query = 'INSERT INTO message (username, messages) VALUES (?, ?)';
    db.query(query, [username, message], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};


exports.getMessages = (callback) => {
    const query = 'SELECT * FROM message';
    db.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};
