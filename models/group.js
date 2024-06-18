const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const User = require('./user');

const Group = sequelize.define('Group', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  creatorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Group.belongsTo(User, { foreignKey: 'creatorId', as: 'creator' });

module.exports = Group;
