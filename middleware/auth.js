const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) => {
    // Get the token
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token. Please authorize' });
    }
    try {
        // Verify the token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // Set the user
        req.user = decoded.user;
        // Call next
        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Authorization failed' });
    }
};

module.exports = auth;