const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const User = require('./user');


const GroupMessage = sequelize.define('GroupMessage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  groupId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

GroupMessage.belongsTo(User, { foreignKey: 'senderId', as: 'sender'  });


module.exports = GroupMessage;
