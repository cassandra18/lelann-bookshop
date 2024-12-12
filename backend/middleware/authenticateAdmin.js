const jwt = require('jsonwebtoken');

const authenticateAdmin = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        
        if (!token) {
            return res.status(403).json({ message: "No token provided" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error(err);
                return res.status(401).json({ message: 'Unauthorized' });
            }
            req.admin = decoded; // Attach the decoded token to the request object
            next();
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = authenticateAdmin;
