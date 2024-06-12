const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const { authenticateToken } = require('../middleware/authentication');

router.post('/', authenticateToken, expenseController.addExpense);
router.get('/', authenticateToken, expenseController.getExpense);
router.delete('/:id', authenticateToken, expenseController.deleteExpense);

module.exports = router;
