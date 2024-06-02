const express = require('express');
const router = express.Router();
const controller = require('../controllers/product');

router.get('/login', controller.getLogin);
router.post('/login', controller.postLogin);

router.get('/', controller.getMessage);
router.post('/', controller.postMessage);

router.get('/', controller.getContact);
router.post('/', controller.postContact);

router.get('/user/:userId', controller.getUserProfile); 

module.exports = router;
