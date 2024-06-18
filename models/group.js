const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const User = require('./user');
const GroupMember = require('./groupMember');

const Group = sequelize.define('Group', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

Group.hasMany(GroupMember, { foreignKey: 'groupId' });

module.exports = Group;
