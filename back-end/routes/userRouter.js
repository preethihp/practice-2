const express = require('express');

const app = express.Router();

const userController = require('../controllers/userController');

app.get('/users', userController.getUser);

app.post('/users', userController.postUser);

app.delete('/users/:id', userController.deleteUser);

module.exports = app;