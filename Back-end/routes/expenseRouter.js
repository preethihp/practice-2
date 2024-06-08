const express = require('express');

const router = express.Router();

const expenseController = require('../controllers/expenseController');

// function ensureAuthenticated(req, res, next) {
//     if (req.session.user) {
//       next();
//     } else {
//       res.status(401).send('Unauthorized');
//     }
//   }

router.post('/',expenseController.addExpense);
router.get('/', expenseController.getExpense);
router.delete('/:id', expenseController.deleteExpense);

module.exports=router;

