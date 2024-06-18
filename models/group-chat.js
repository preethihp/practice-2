const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Groupchat = sequelize.define('Groupchat', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  groupId: {
    type: DataTypes.INTEGER
  }
}, {
  timestamps: true,
});

module.exports = Groupchat;
