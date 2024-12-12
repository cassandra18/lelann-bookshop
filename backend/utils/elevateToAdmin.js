const elevateToAdmin = async (req, res) => {
    const { userId, inviteCode } = req.body;
  
    try {
      // Validate invite code
      if (inviteCode !== process.env.ADMIN_INVITE_CODE) {
        return res.status(401).json({ message: 'Invalid invite code' });
      }
  
      // Update user role
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { role: 'admin' },
      });
  
      res.status(200).json({ message: 'User elevated to admin successfully', user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
