const express = require('express');
const router = express.Router();
const forgotPasswordController = require('../controllers/forgotPasswordController');

router.post('/forgotpassword', forgotPasswordController.forgotPassword);
router.post('/resetpassword/:id', forgotPasswordController.resetPassword);
router.get('/resetpassword/:id', forgotPasswordController.getResetPasswordForm);

module.exports = router;
