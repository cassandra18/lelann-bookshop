const createAdminDashboard = async (req, res) => {
    const { role } = req.user;  // Decoded role from the JWT token

    if (role !== 'customer') {
      return res.status(403).json({ message: 'Access denied. Not a customer.' });
    }
  
    res.status(200).json({ message: 'Welcome to the user dashboard' });
  
};

module.exports = {  createAdminDashboard }; 