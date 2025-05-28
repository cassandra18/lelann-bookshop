const express = require('express');
const router = express.Router();
const { UserControllers } = require('../controllers/userController');
const authenticateAdmin = require('../middleware/authenticateAdmin');
// const { authenticateGoogle, handleGoogleCallback } = require('../middleware/oauthMiddleware');
const validateRegisterInput  = require('../middleware/validation');
const authenticateJWT = require('../middleware/authenticateUser');
const { authorizeRoles } = require('../middleware/authorizeRole');
const { createUserDashboard } = require('../controllers/userDashboardController');


// User routes
router.post('/register', validateRegisterInput, UserControllers.registerUser);
router.post('/login', UserControllers.loginUser);
router.get('/verify', authenticateJWT, UserControllers.verifyUser);
router.get('/me', authenticateJWT, UserControllers.getCurrentUser);
// Requires authentication AND the 'admin' role
router.get('/admin-dashboard-data', authenticateJWT, authorizeRoles(['admin']), UserControllers.getAdminDashboard);

// Protected route for User Dashboard Data
// Requires authentication AND either 'customer' or 'admin' role
router.get('/user-dashboard-data', authenticateJWT, authorizeRoles(['customer', 'admin']), UserControllers.getUserDashboard);

router.get('/see-profile/:userId', authenticateJWT, UserControllers.getUserProfile);
router.put('/update-profile/:userId', authenticateJWT, UserControllers.updateUserProfile);
router.delete('/delete-profile/:userId', authenticateJWT, UserControllers.deleteUserAccount);
router.put('/update-password/:userId', authenticateJWT, UserControllers.updateUserPassword);

// Admin routes
router.use(authenticateAdmin);

router.get('/all-users', UserControllers.getAllUsers);
router.get('/get-user/:id', UserControllers.getUserById);
router.delete('/delete-user/:id', UserControllers.deleteUserById);
router.put('/update-user/:id', UserControllers.updateUserById);

// // Google OAuth routes
// router.get('/auth/google', authenticateGoogle);
// router.get('/auth/google/callback', handleGoogleCallback);


module.exports = router;