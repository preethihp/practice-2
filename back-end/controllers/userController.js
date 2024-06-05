const User = require('../models/usersModel');

exports.postUser = (req, res) => {
    const { username, email, phone } = req.body;
    const user = new User(null, username, email, phone);
    user.save()
        .then(() => {
            console.log("User Created Successfully");
            res.status(201).json({ message: 'User Created Successfully' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred' });
        });
};

exports.getUser = (req, res) => {
    User.fetchALL()
    .then(([rows, fieldData]) => {
        res.status(200).json(rows);
    })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred' });
        });
};


exports.deleteUser = (req, res) => {
    const id = req.params.id;
    User.deleteByID(id)
        .then(() => {
            console.log("User deleted successfully");
            res.status(200).json({ message: 'User deleted successfully' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred' });
        });
};


