const SibApiV3Sdk = require('sib-api-v3-sdk');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const User = require('../models/signupModel');
const ForgotPasswordRequest = require('../models/forgotPasswordModel');

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = ''; 
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const id = uuidv4();
        await ForgotPasswordRequest.create({ id, userId: user.id, isActive: true });

        const resetUrl = `http://localhost:3000/password/resetpassword/${id}`;
        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.to = [{ email: user.email }];
        sendSmtpEmail.sender = { name: 'Expense Tracker App', email: 'preethihp1802@gmail.com' };
        sendSmtpEmail.subject = 'Password Reset';
        sendSmtpEmail.htmlContent = `Click <a href="${resetUrl}">here</a> to reset your password`;

        await apiInstance.sendTransacEmail(sendSmtpEmail);

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong', error: err });
    }
};

exports.getResetPasswordForm = (req, res) => {
    const { id } = req.params;
    res.send(`
        <html>
        <body>
            <form action="/password/resetpassword/${id}" method="POST">
                <input type="password" name="newPassword" placeholder="Enter your new password" required />
                <button type="submit">Reset Password</button>
            </form>
        </body>
        </html>
    `);
};

exports.resetPassword = async (req, res) => {
    const { id } = req.params;
    const { newPassword } = req.body;

    try {
        const request = await ForgotPasswordRequest.findOne({ where: { id } });

        if (!request || !request.isActive) {
            return res.status(400).json({ message: 'Invalid or expired password reset request' });
        }

        const user = await User.findOne({ where: { id: request.userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await user.update({ password: hashedPassword });
        await request.update({ isActive: false });

        res.status(200).json({ message: 'Password has been reset' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong', error: err });
    }
};
