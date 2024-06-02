const express = require('express');
const path = require('path');

const app = express.Router();
const userLoginController = require('../controllers/product');

app.get('/', userLoginController.getLogin);

app.post('/', userLoginController.postLogin);

module.exports = app;