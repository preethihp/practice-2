const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const User = require('./signupModel');

const ForgotPasswordRequests = sequelize.define('ForgotPasswordRequests', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
});
ForgotPasswordRequests.belongsTo(User, { foreignKey: 'userId' });

module.exports = ForgotPasswordRequests;
