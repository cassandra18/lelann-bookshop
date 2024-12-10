const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
        if (req.user.role !== requiredRole) {
            return res.status(403).json({ messaged: 'Acces denied'});
        }
        next();
    };
};

module.exports = authorizeRole 