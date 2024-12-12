const authorizeRole = (roles) => (req, res, next) => {
    // const token = req.cookies.jwt;
    // if (!token) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }
    
    // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    //     if (err) {
    //         return res.status(401).json({ message: 'Unauthorized' });
    //     }
        
    //     if (!roles.includes(decoded.role)) {
    //         return res.status(403).json({ message: 'Forbidden' });
    //     }
        
    //     req.user = decoded;
    //     next();
    // });

    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
      }
      next();  if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
      }
      next();
};

module.exports = authorizeRole 