const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const User = require('./signupModel');

const Expense = sequelize.define('Expense', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId:{
        type:DataTypes.INTEGER,
        
    }

    
});

User.hasMany(Expense);
Expense.belongsTo(User);

module.exports = Expense;
