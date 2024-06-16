const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.signup = async (req, res, next) => {
    const { name, email, phone, password } = req.body;
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword
      });
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      next(error);
    }
  };
  
exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Authentication failed. Incorrect password.' });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            'secretkey', // Replace with a strong secret key
            { expiresIn: '1h' }
        );

        res.status(200).json({ token, userId: user.id });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name']
    });
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

