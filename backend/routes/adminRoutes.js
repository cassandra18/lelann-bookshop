const express = require('express');
const router = express.Router();
const validateRegisterInput = require('../middleware/validation');
const { registerAdmin, loginAdmin, updateAdmin, deleteAdmin } = require('../controllers/adminController');
const authenticateAdmin = require('../middleware/authenticateAdmin')
const { authorizeAdmin } = require('../middleware/authorizeRole');

router.post('/register', authorizeAdmin, registerAdmin);
router.post('/login', loginAdmin);
router.put('/update/:id', updateAdmin);
router.delete('/delete/:id', deleteAdmin);


module.exports = router;