const express = require('express');
const  app = express.Router();

const contactController = require('../controllers/product');


app.get('/contactus', contactController.getContact);

app.post('/success', contactController.postContact);

module.exports = app;