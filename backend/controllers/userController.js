const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { isPasswordStrong } = require("../utils/passwordCheck");
const {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} = require("@prisma/client");

const prisma = new PrismaClient();

// Controller for user registration

const UserControllers = {
  registerUser: async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User with this email already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const user = await prisma.user.create({
        data: { name, email, password: hashedPassword, confirmPassword: hashedPassword },
      });
      console.log(user);
      res.status(201).json(user);
    } catch (error) {
      handlePrismaError(error, res);
    }
  },
  // Controller for user login
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      // Validate input
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }
      // Check if user exists
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        return res.status(404).json({ message: "Invalid email or password" });
      }
      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      // Generate a token
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.status(200).json({ token });
    } catch (error) {
      handlePrismaError(error, res);
    }
  },

  // Controller for getting user profile
  getUserProfile: async (req, res) => {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({ message: "User ID is missing" });
      }

      // Get the user profile
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Send the user profile
      res.status(200).json(user);
    } catch (error) {
      handlePrismaError(error, res);
    }
  },

  // Controller for updating user profile
  updateUserProfile: async (req, res) => {
    try {
      const { name, email } = req.body;
      const { userId } = req.params;

      if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
      }

      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name,
          email,
        },
      });
      res.status(200).json(user);
    } catch (error) {
      handlePrismaError(error, res);
    }
  },

  // Controller for updating user password
  updateUserPassword: async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const { userId } = req.params;

      // Input validation
      if (!oldPassword || !newPassword) {
        return res
          .status(400)
          .json({ message: "Old and new passwords are required" });
      }
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // Check new password strength
      if (!isPasswordStrong(newPassword)) {
        return res.status(400).json({
          message:
            "Password must be at least 8 characters long and contain uppercase, lowercase, digit, and special character",
        });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password: hashedPassword,
        },
      });
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      handlePrismaError(error, res);
    }
  },

  // Controller for deleting user account
  deleteUserAccount: async (req, res) => {
    try {
      const { userId } = req.params;

      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      await prisma.user.delete({
        where: {
          id: userId,
        },
      });
      res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
      handlePrismaError(error, res);
    }
  },

  // Controller for getting all users
  getAllUsers: async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      res.status(200).json(users);
    } catch (error) {
      handlePrismaError(error, res);
    }
  },

  // Controller for getting a user by id
  getUserById: async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.params.id,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      handlePrismaError(error, res);
    }
  },

  // Controller for updating a user by id
  updateUserById: async (req, res) => {
    try {
      const { name, email } = req.body;
      if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
      }
      const user = await prisma.user.update({
        where: {
          id: req.params.id,
        },
        data: {
          name,
          email,
        },
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      handlePrismaError(error, res);
    }
  },

  // Controller for deleting a user by id
  deleteUserById: async (req, res) => {
    try {
      await prisma.user.delete({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      handlePrismaError(error, res);
    }
  },
};

// Centralized error handler function
function handlePrismaError(error, res) {
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2001": // Record not found
        return res.status(404).json({ message: "Record not found" });
      case "P2002": // Unique constraint failed
        return res.status(409).json({ message: "Duplicate record" });
      case "P2016": // Query interpretation error
        return res.status(400).json({ message: "Invalid query" });
      default:
        console.error("Prisma known request error:", error);
        return res.status(500).json({ message: "Database error" });
    }
  } else if (error instanceof PrismaClientValidationError) {
    console.error("Prisma validation error:", error);
    return res.status(400).json({ message: "Validation error" });
  } else {
    console.error("Unexpected error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { UserControllers, handlePrismaError };
