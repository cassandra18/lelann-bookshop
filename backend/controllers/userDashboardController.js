const createUserDashboard = async (req, res) => {
    const { role } = req.user;  // Decoded role from the JWT token

    console.log(role);
    if (role !== 'customer') {
      return res.status(403).json({ message: 'Access denied. Not a customer.' });
    }
  
    res.status(200).json({ message: 'Welcome to the user dashboard', role: role });
  
};

module.exports = {  createUserDashboard }; 