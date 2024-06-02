const express = require('express');

const app = express.Router();

const messageController = require('../controllers/product');

app.get('/',messageController.getMessage);
    
app.post('/', messageController.postMessage);

module.exports = app;