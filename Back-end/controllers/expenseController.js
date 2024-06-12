const Expense = require('../models/expenseModel');
const jwt = require('jsonwebtoken');

exports.addExpense = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(token)
        const decodedToken = jwt.verify(token, 'secret_key');
        console.log(decodedToken)
        const userId = decodedToken.id;

        const { amount, description, category } = req.body;
        const newExpense = await Expense.create({ amount, description, category, userId });

        res.status(201).json(newExpense);
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({ error: 'Failed to add expense' });
    }
};

exports.getExpense = async (req, res) => {
    try {
        const userId = req.user.id;
        const expenses = await Expense.findAll({ where: { userId } });
        res.status(200).json(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

exports.deleteExpense = async (req, res) => {
    const expenseId = req.params.id;
    const userId = req.user.id;

    try {
        const expense = await Expense.findOne({ where: { id: expenseId, userId } });
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        await expense.destroy();
        res.status(200).json({ message: 'Expense deleted successfully' });
    } 
    catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
};
