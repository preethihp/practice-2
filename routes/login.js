const express = require('express');
const app = express.Router();

app.get('/', (req, res) => {
    res.send(`
        <form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/login" method="POST">
            <input id="username" type="text" name="username" placeholder="Enter Username">
            <button type="submit">Login</button>
        </form>
    `);
});

app.post('/', (req, res) => {
    res.redirect('/');
});

module.exports = app;