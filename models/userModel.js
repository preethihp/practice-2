const fs = require('fs');
const path = require('path');

const messagesFilePath = path.join(__dirname, '../data', 'message.txt');

exports.appendMessage = (username, message, callback) => {
    const newMessage = `${username} : ${message}  `;
    fs.appendFile(messagesFilePath, newMessage, callback);
};

exports.getMessages = (callback) => {
    fs.readFile(messagesFilePath, 'utf8', (err, data) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, data);
    });
};
