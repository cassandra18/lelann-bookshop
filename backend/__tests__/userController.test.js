const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { isPasswordStrong } = require("../utils/passwordCheck");
const { UserControllers, handlePrismaError } = require("../controllers/userController");

jest.mock("@prisma/client");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../utils/passwordCheck");

const prisma = new PrismaClient();

describe("UserControllers", () => {
    let req, res;
  
    beforeEach(() => {
      req = {
        body: {},
        params: {},
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    afterEach(() => {
        jest.clearAllMocks();
      });
  
    describe("registerUser", () => {
      it("should return 400 if user already exists", async () => {
        req.body = { name: "Test User", email: "test@example.com", password: "password" };
        prisma.user.findUnique = jest.fn().mockResolvedValue({ id: 1 });
  
        await UserControllers.registerUser(req, res);
  
        expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: "test@example.com" } });
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "User with this email already exists" });
      });
  
      it("should return 201 and create user if user does not exist", async () => {
        req.body = { name: "Test User", email: "test@example.com", password: "password" };
        prisma.user.findUnique = jest.fn().mockResolvedValue(null);
        bcrypt.hash = jest.fn().mockResolvedValue("hashedPassword");
        prisma.user.create = jest.fn().mockResolvedValue({ id: 1, name: "Test User", email: "test@example.com" });
  
        await UserControllers.registerUser(req, res);
  
        expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: "test@example.com" } });
        expect(bcrypt.hash).toHaveBeenCalledWith("password", 10);
        expect(prisma.user.create).toHaveBeenCalledWith({
          data: { name: "Test User", email: "test@example.com", password: "hashedPassword" },
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ id: 1, name: "Test User", email: "test@example.com" });
      });

      it("should handle errors gracefully", async () => {
        req.body = { name: "Test User", email: "test@example.com", password: "password" };
        prisma.user.findUnique.mockRejectedValue(new Error("Database error"));
        handlePrismaError.mockImplementation((err, response) => {
            response.status(500).json({ message: 'Internal server error' });
          });

        await UserControllers.registerUser(req, res);

        expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: "test@example.com" } });
        expect(handlePrismaError).toHaveBeenCalledWith(error, res);        
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
      });
    });
  
    describe("loginUser", () => {
      it("should return 400 if email or password is missing", async () => {
        req.body = { email: "", password: "" };
  
        await UserControllers.loginUser(req, res);
  
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Email and password are required" });
      });
  
      it("should return 404 if user does not exist", async () => {
        req.body = { email: "test@example.com", password: "password" };
        prisma.user.findUnique = jest.fn().mockResolvedValue(null);
  
        await UserControllers.loginUser(req, res);
  
        expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: "test@example.com" } });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Invalid email or password" });
      });
  
      it("should return 401 if password is invalid", async () => {
        req.body = { email: "test@example.com", password: "wrongPassword" };
        prisma.user.findUnique = jest.fn().mockResolvedValue({ id: 1, email: "test@example.com", password: "hashedPassword" });
        bcrypt.compare = jest.fn().mockResolvedValue(false);
  
        await UserControllers.loginUser(req, res);
  
        expect(bcrypt.compare).toHaveBeenCalledWith("wrongPassword", "hashedPassword");
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: "Invalid email or password" });
      });
  
      it("should return 200 and token if login is successful", async () => {
        req.body = { email: "test@example.com", password: "password" };
        prisma.user.findUnique = jest.fn().mockResolvedValue({ id: 1, email: "test@example.com", password: "hashedPassword" });
        bcrypt.compare = jest.fn().mockResolvedValue(true);
        jwt.sign = jest.fn().mockReturnValue("token");
  
        await UserControllers.loginUser(req, res);
  
        expect(jwt.sign).toHaveBeenCalledWith({ id: 1 }, process.env.JWT_SECRET, { expiresIn: "1d" });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ token: "token" });
      });

      it("should handle errors gracefully", async () => {
        req.body = { email: "test@example.com", password: "password" };
        prisma.user.findUnique.mockRejectedValue(new Error("Database error"));

        await UserControllers.loginUser(req, res);

        expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: "test@example.com" } });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
      });
    });
  
    describe("changePassword", () => {
      it("should return 400 if password is not strong", async () => {
        req.body = { password: "password" };
        isPasswordStrong.mockReturnValue(false);
  
        await UserControllers.changePassword(req, res);
  
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Password is not strong enough" });
      });
  
      it("should return 200 if password is strong", async () => {
        req.body = { password: "strongPassword" };
        isPasswordStrong.mockReturnValue(true);
  
        await UserControllers.changePassword(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "Password changed successfully" });
      });

      it("should handle errors gracefully", async () => {
        req.body = { password: "strongPassword" };
        isPasswordStrong.mockImplementation(() => { throw new Error("Unexpected error") });

        await UserControllers.changePassword(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
      });
    });


    describe("getUserProfile", () => {
        it("should return 400 if userId is missing", async () => {
          req.params = { userId: "" };
    
          await UserControllers.getUserProfile(req, res);
    
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.json).toHaveBeenCalledWith({ message: "User ID is missing" });
        });
    
        it("should return 404 if user does not exist", async () => {
          req.params = { userId: "1" };
          prisma.user.findUnique = jest.fn().mockResolvedValue(null);
    
          await UserControllers.getUserProfile(req, res);
    
          expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: "1" }, select: { id: true, name: true, email: true } });
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
        });
    
        it("should return 200 and user profile if user exists", async () => {
          req.params = { userId: "1" };
          prisma.user.findUnique = jest.fn().mockResolvedValue({ id: 1, name: "Test User", email: "test@example.com"});

          await UserControllers.getUserProfile(req, res);

            expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: "1" }, select: { id: true, name: true, email: true } });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ id: 1, name: "Test User", email: "test@example.com"});
        });

        it("should handle errors gracefully", async () => {
          req.params = { userId: "1" };
          prisma.user.findUnique.mockRejectedValue(new Error("Database error"));

          await UserControllers.getUserProfile(req, res);

          expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: "1" }, select: { id: true, name: true, email: true } });
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
        });
    });

    describe("updateUserProfile", () => {
        it("should return 400 if name or email is missing", async () => {
          req.body = { name: "", email: "" };
          req.params = { userId: "1" };
    
          await UserControllers.updateUserProfile(req, res);
    
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.json).toHaveBeenCalledWith({ message: "Name and email are required" });
        });
    
        it("should return 404 if user does not exist", async () => {
          req.body = { name: "Test User", email: "test@example.com" };
            req.params = { userId: "1" };
            prisma.user.findUnique = jest.fn().mockResolvedValue(null);

            await UserControllers.updateUserProfile(req, res);

            expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: "1" } });
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
        });

        it("should return 200 and update user profile if user exists", async () => {
            req.body = { name: "Test User", email: "test@example.com" };
            req.params = { userId: "1" };
            prisma.user.findUnique = jest.fn().mockResolvedValue({ id: 1 });
            prisma.user.update = jest.fn().mockResolvedValue({ id: 1, name: "Test User", email: "test@eample.com" });

            await UserControllers.updateUserProfile(req, res);

            expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: "1" } });
            expect(prisma.user.update).toHaveBeenCalledWith({ where: { id: 1 }, data: { name: "Test User", email: "test@example.com" } });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ id: 1, name: "Test User", email: "test@example.com"});
        });

        it("should handle errors gracefully", async () => {
            req.body = { name: "Test User", email: "test@example.com"};
            req.params = { userId: "1" };
            prisma.user.findUnique.mockRejectedValue(new Error("Database error"));

            await UserControllers.updateUserProfile(req, res);

            expect(prisma.user.findUnique).toHaveBeenCalledWith({
                where: { id: "1" },
            });
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
        });
    });


    describe("deleteUserProfile", () => {
        it("should return 404 if user does not exist", async () => {
          req.params = { userId: "1" };
          prisma.user.findUnique = jest.fn().mockResolvedValue(null);
    
          await UserControllers.deleteUserProfile(req, res);
    
          expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: "1" } });
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
        });
    
        it("should return 200 and delete user profile if user exists", async () => {
          req.params = { userId: "1" };
          prisma.user.findUnique = jest.fn().mockResolvedValue({ id: 1 });
          prisma.user.delete = jest.fn().mockResolvedValue({ id: 1, name: "Test User", email: "test@example.com"});

            await UserControllers.deleteUserProfile(req, res);

            expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: "1" } });
            expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ id: 1, name: "Test User", email: "test@example.com"});
        });

        it("should handle errors gracefully", async () => {
            req.params = { userId: "1" };
            prisma.user.findUnique.mockRejectedValue(new Error("Database error"));

            await UserControllers.deleteUserProfile(req, res);

            expect(prisma.user.findUnique).toHaveBeenCalledWith({
                where: { id: "1" },
            });
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
        });
    });


    describe("getAllUsers", () => {
        it("should return 200 and all users", async () => {
          prisma.user.findMany = jest.fn().mockResolvedValue([
            { id: 1, name: "Test User 1", email: "test1@example.com" },
            { id: 2, name: "Test User 2", email: "test2@example.com" },
            ]);

            await UserControllers.getAllUsers(req, res);

            expect(prisma.user.findMany).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([
                { id: 1, name: "Test User 1", email: "test1@example.com" },
                { id: 2, name: "Test User 2", email: "test2@example.com"}
            ]);
        });

        it("should handle errors gracefully", async () => {
            prisma.user.findMany.mockRejectedValue(new Error("Database error"));

            await UserControllers.getAllUsers(req, res);

            expect(prisma.user.findMany).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
        });
    });


    describe("getUserById", () => {
        it("should return 404 if user does not exist", async () => {
          req.params = { id: "1" };
          prisma.user.findUnique = jest.fn().mockResolvedValue(null);
    
          await UserControllers.getUserById(req, res);
    
          expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: "1" }, select: { id: true, name: true, email: true } });
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
        });
    
        it("should return 200 and user profile if user exists", async () => {
          req.params = { id: "1" };
          prisma.user.findUnique = jest.fn().mockResolvedValue({ id: 1, name: "Test User", email: "test@example.com" });
              
                await UserControllers.getUserById(req, res);
    
                expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: "1" }, select: { id: true, name: true, email: true } });
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalledWith({ id: 1, name: "Test User", email: "test@example.com" });
        });

        it("should handle errors gracefully", async () => {
            req.params = { id: "1" };
            prisma.user.findUnique.mockRejectedValue(new Error("Database error"));
    
            await UserControllers.getUserById(req, res);
    
            expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: "1" }, select: { id: true, name: true, email: true } });
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
        });

    });


    describe("updateUserById", () => {
        it("should return 400 if name or email is missing", async () => {
          req.body = { name: "", email: "" };
          req.params = { id: "1" };
    
          await UserControllers.updateUserById(req, res);
    
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.json).toHaveBeenCalledWith({ message: "Name and email are required" });
        });
    
        it("should return 404 if user does not exist", async () => {
          req.body = { name: "Test User", email: "test@example.com" };
            req.params = { id: "1" };
            prisma.user.update = jest.fn().mockResolvedValue(null);

            await UserControllers.updateUserById(req, res);

            expect(prisma.user.update).toHaveBeenCalledWith({ where: { id: 1 }, data: { name: "Test User", email: "test@example.com" } });
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
        });

        it("should return 200 and update user profile if user exists", async () => {
            req.body = { name: "Test User", email: "test@example.com" };
            req.params = { id: "1" };
            prisma.user.update = jest.fn().mockResolvedValue({ id: 1, name: "Test User", email: "test@example.com" });

            await UserControllers.updateUserById(req, res);

            expect(prisma.user.update).toHaveBeenCalledWith({ where: { id: 1 }, data: { name: "Test User", email: "test@example.com" } });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ id: 1, name: "Test User", email: "test@example.com" });
        });

        it("should handle errors gracefully", async () => {
            req.body = { name: "Test User", email: "test@example.com" };
            req.params = { id: "1" };
            prisma.user.update.mockRejectedValue(new Error("Database error"));

            await UserControllers.updateUserById(req, res);

            expect(prisma.user.update).toHaveBeenCalledWith({ where: { id: 1 }, data: { name: "Test User", email: "test@example.com" } });
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
        });
    });


    describe("deleteUserById", () => {
        it("should return 404 if user does not exist", async () => {
          req.params = { id: "1" };
          prisma.user.delete = jest.fn().mockResolvedValue(null);
    
          await UserControllers.deleteUserById(req, res);
    
          expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
        });
    
        it("should return 200 and delete user profile if user exists", async () => {
          req.params = { id: "1" };
          prisma.user.delete = jest.fn().mockResolvedValue({ id: 1, name: "Test User", email: "test@example.com" });
              
            await UserControllers.deleteUserById(req, res);
    
            expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ id: 1, name: "Test User", email: "test@example.com" });
        });


        it("should handle errors gracefully", async () => {
            req.params = { id: "1" };
            prisma.user.delete.mockRejectedValue(new Error("Database error"));
    
            await UserControllers.deleteUserById(req, res);

            expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
        });
    });
  });