const express = require('express');
const router = express.Router();
const premiumController = require('../controllers/purchaseController');
const auth = require('../middleware/authentication');

router.get('/premiummembership', auth.authenticateToken, premiumController.premium);
router.post('/updatetransactionstatus', auth.authenticateToken, premiumController.update);
router.post('/transactionfailed', auth.authenticateToken, premiumController.failure);

module.exports = router;
