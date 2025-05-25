// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.jwt;

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

const authorizeRoles = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: 'Authorization failed: User role not found' });
        }

        if (allowedRoles.includes(req.user.role)) {
            next();
        } else {
            res.status(403).json({ message: 'Access denied: Insufficient permissions' });
        }
    };
};

module.exports = { authenticateJWT, authorizeRoles };