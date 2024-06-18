const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const User = require('./user');
const Group = require('./group');


const GroupMember = sequelize.define('GroupMember', {
  groupId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});
GroupMember.belongsTo(User, { foreignKey: 'userId' }); 


module.exports = GroupMember;
