const jwt = require('../config/jwt');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).send('Unauthorized');
    }
    try {
        const decoded = jwt.verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).send('Invalid token');
    }
};

module.exports = authMiddleware;
