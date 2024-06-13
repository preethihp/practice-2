const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const User = require('./signupModel');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    orderid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    paymentid: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

Order.belongsTo(User);
User.hasMany(Order);

module.exports = Order;
