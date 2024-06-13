const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        console.log('Token not provided');
        return res.sendStatus(401);
    }

    jwt.verify(token, 'secret_key', (err, user) => {
        if (err) {
            console.log('Token verification failed', err);
            return res.sendStatus(403);
        }
        console.log('Token verified, user:', user);
        req.user = user;
        next();
    });
};
