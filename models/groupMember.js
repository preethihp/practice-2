const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const User = require('./user');
const Group = require('./group');

const GroupMembership = sequelize.define('GroupMembership', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  groupId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
GroupMembership.belongsTo(User, { foreignKey: 'userId', as: 'user' });
GroupMembership.belongsTo(Group, { foreignKey: 'groupId', as: 'group' });

module.exports = GroupMembership;
