const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// Controller for admin registration
const registerAdmin = async (req, res) => {
    try {
        const { name, email, password, inviteCode } = req.body;

        if (inviteCode !== process.env.ADMIN_INVITE_CODE) {
            return res.status(401).json({ message: 'Invalid invite code' });
          }
        // Check if admin already exists
        const existingAdmin = await prisma.admin.findUnique({
            where: {
                email,
            },
        });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin with this email already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin
        const admin = await prisma.admin.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        res.status(201).json(admin);
    } catch (error) {
        console.log(error);  
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if admin exists
        const admin = await prisma.admin.findUnique({
            where: {
                email,
            },
        });
        if (!admin) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }


        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or  password' });
        }

        // Generate token 
        const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        // set token in http-only cookie
        res.cookie('jwt', token, {
            httpOnly: true, // Prevent JS access
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// update admin
const updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = await prisma.admin.update({
            where: { id },
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}


// delete admin
const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await prisma.admin.delete({
            where: { id },
        });
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    registerAdmin,
    loginAdmin,
    updateAdmin,
    deleteAdmin,
};