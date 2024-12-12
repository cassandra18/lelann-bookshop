const express = require('express');
const router = express.Router();
const validateRegisterInput = require('../middleware/validation');
const { registerAdmin, loginAdmin, updateAdmin, deleteAdmin } = require('../controllers/adminController');
const authorizeRole = require('../middleware/authorizeRole')
const authenticateAdmin = require('../middleware/authenticateAdmin')


router.post('/register', authenticateAdmin, authorizeRole, validateRegisterInput, registerAdmin);
router.post('/login', loginAdmin);
router.put('/update/:id', updateAdmin);
router.delete('/delete/:id', deleteAdmin);


module.exports = router;