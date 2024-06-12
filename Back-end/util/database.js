const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('expense-tracker-app', 'root', 'preethi', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
