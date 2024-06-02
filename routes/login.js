const express = require('express');
const path = require('path');

const app = express.Router();


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../','views','login.html'));
});

app.post('/', (req, res) => {
    res.redirect('/');
});

module.exports = app;