const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const tokenFromHeader = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    const token = tokenFromHeader || req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: 'Authentication required: No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('JWT verification error:', err);
            return res.status(403).json({ message: 'Authentication failed: Invalid token' });
        }

        req.user = decoded;
        next();
    });
};

module.exports = authenticateJWT;
