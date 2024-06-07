const User = require('../models/signupModel');

exports.signup = (req, res) => {
    const { name, email, password } = req.body;

    User.findByEmail(email)
        .then(([users]) => {
            if (users.length > 0) {
                return res.status(400).json({ error: 'User already exists' });
            }

            const user = new User(null, name, email, password);
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

        if (users.length === 0 || users[0].password !== password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
};
