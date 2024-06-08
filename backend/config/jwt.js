const jwt = require('jsonwebtoken');

const jwtSecret = 'angeldev'; 

exports.signToken = (payload) => {
    return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
};

exports.verifyToken = (token) => {
    return jwt.verify(token, jwtSecret);
};
