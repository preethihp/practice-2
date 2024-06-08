const User = require('../models/signupModel');
const bcrypt = require('bcrypt');

exports.signup = (req, res) => {
    const { name, email, password } = req.body;

    User.findByEmail(email)
        .then(([users]) => {
            if (users.length > 0) {
                return res.status(400).json({ error: 'User already exists' });
            }

            const hashedPassword = bcrypt.hashSync(password, 12);
            const user = new User(null, name, email, hashedPassword);
            return user.save();
        })
        .then(() => {
            console.log("User created successfully");
            res.status(201).json({ message: 'User created successfully' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'An error occurred' });
        });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await User.findByEmail(email);

        if (users.length === 0) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        const user = users[0];
        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            console.log('Password does not match');
            return res.status(401).json({ error: 'User not authorized', reason: 'Incorrect password' });
        }

        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save(err => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'An error occurred' });
            }

            console.log('User login successful');
            res.status(200).json({ message: 'User login successful' });
        });
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
};
