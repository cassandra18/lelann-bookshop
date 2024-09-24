const express = require('express');
const router = express.Router();
const { UserControllers } = require('../controllers/userController');
const authenticateAdmin = require('../middleware/authenticateAdmin');
const { authenticateGoogle, handleGoogleCallback } = require('../middleware/oauthMiddleware');
const validateRegisterInput  = require('../middleware/validation');
const authenticateJWT = require('../middleware/authenticateUser');

// User routes
router.post('/register', validateRegisterInput, UserControllers.registerUser);
router.post('/login', UserControllers.loginUser);
router.get('/see-profile/:userId', authenticateJWT, UserControllers.getUserProfile);
router.put('/update-profile/:userId', authenticateJWT, UserControllers.updateUserProfile);
router.delete('/delete-profile/:userId', authenticateJWT, UserControllers.deleteUserAccount);
router.put('/update-password/:userId', authenticateJWT, UserControllers.updateUserPassword);


// Admin routes
router.get('/all-users',  authenticateAdmin, UserControllers.getAllUsers);
router.get('/get-user/:id',  authenticateAdmin, UserControllers.getUserById);
router.delete('/delete-user/:id',  authenticateAdmin, UserControllers.deleteUserById);
router.put('/update-user/:id',  authenticateAdmin, UserControllers.updateUserById);

// Google OAuth routes
router.get('/auth/google', authenticateGoogle);
router.get('/auth/google/callback', handleGoogleCallback);


module.exports = router;