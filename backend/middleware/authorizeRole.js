// Middleware to validate user role permission on every request to protected resources

const authorize = (roles) => (req, res, next) => {
    const token = req.cookies.jwt; // Or Authorization header
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        if (!roles.includes(decoded.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }

        req.user = decoded; // Attach user info to request
        next();
    });
};

// Middleware to check if the user is an admin
const authorizeAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

const verifyUserRole = (roles) => (req, res, next) => {
    console.log('User Role:', req.user.role);
    if (roles.includes(req.user.role)) {
        return next();
    }

   return  res.status(403).json({ message: 'Access denied. Invalid role.' });
};



module.exports = { authorize, authorizeAdmin, verifyUserRole };