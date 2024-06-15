const Sequelize = require('sequelize');

const sequelize = new Sequelize('group-chat-application', 'root', 'preethi',{
    host:'localhost',
    dialect:'mysql'
});

module.exports = sequelize;