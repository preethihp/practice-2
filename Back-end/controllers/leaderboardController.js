const User = require('../models/signupModel');
const Expense = require('../models/expenseModel');
const sequelize = require('sequelize');

exports.getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await User.findAll({
            attributes: ['id', 'name', [sequelize.fn('SUM', sequelize.col('expenses.amount')), 'total_expense']],
            include: [{
                model: Expense,
                attributes: []
            }],
            group: ['User.id'],
            order: [[sequelize.fn('SUM', sequelize.col('expenses.amount')), 'DESC']]
        });

        res.status(200).json({ leaderboard });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong', error: err });
    }
};
