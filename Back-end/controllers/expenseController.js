const Expense = require('../models/expenseModel');

exports.addExpense = (req, res) => {
    const { amount, description, category } = req.body;

    const expense = new Expense(null, amount, description, category);
    expense.save()
        .then(() => {
            res.status(201).json({ message: 'Expense added successfully' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred' });
        });
};

exports.getExpense=(req, res) => {
    Expense.findAll()
        .then(([expenses]) => {
            res.status(200).json(expenses);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred' });
        });
};

exports.deleteExpense = (req, res) => {
    const expenseId = req.params.id;

    Expense.deleteById(expenseId)
        .then(() => {
            res.status(200).json({ message: 'Expense deleted successfully' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred' });
        });
};
