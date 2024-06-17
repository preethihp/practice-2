const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('group_chat_db', 'root', 'preethi', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
