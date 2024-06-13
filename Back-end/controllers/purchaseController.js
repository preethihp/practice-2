const Razorpay = require('razorpay');
const User = require('../models/signupModel');
const Order = require('../models/orderModel');

exports.premium = async (req, res) => {
    try {
        const userId = req.user.id;
        var rzp = new Razorpay({
            key_id: '',
            key_secret: ''
        });
        const amount = 5000; 

        const order = await rzp.orders.create({ amount, currency: "INR" });

        const user = await User.findByPk(userId);
        const newOrder = await Order.create({ orderid: order.id, status: "PENDING" });
        await user.addOrder(newOrder);

        return res.status(201).json({ order, key_id: rzp.key_id });
    } catch (err) {
        console.log(err);
        res.status(403).json({ message: "Something went wrong", error: err });
    }
};


exports.update = async (req, res) => {
    try {
        const { payment_id, order_id } = req.body;
        const order = await Order.findOne({ where: { orderid: order_id } });

        if (!order) {
            throw new Error('Order not found');
        }

        const user = await User.findByPk(req.user.id);

        await Promise.all([
            order.update({ paymentid: payment_id, status: "SUCCESSFUL" }),
            user.update({ ispremiumuser: true })
        ]);

        return res.status(202).json({ success: true, message: "Transaction Successful", isPremiumUser: true });
    } catch (err) {
        console.log(err);
        res.status(403).json({ message: "Something went wrong", error: err });
    }
};



exports.failure = async (req, res) => {
    try {
        const { order_id } = req.body;
        const order = await Order.findOne({ where: { orderid: order_id } });

        if (!order) {
            throw new Error('Order not found');
        }

        await order.update({ status: "FAILED" });

        return res.status(202).json({ success: true, message: "Transaction Failed" });
    } catch (err) {
        console.log(err);
        res.status(403).json({ message: "Something went wrong", error: err });
    }
};
