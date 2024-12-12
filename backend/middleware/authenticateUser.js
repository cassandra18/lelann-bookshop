const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error(err);
                return res.status(401).json({ message: 'Unauthorized' });
            }

            req.user = decoded; // Attach the decoded token to the request object
            next()
        }); 
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authenticateJWT;
