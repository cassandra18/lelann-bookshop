const express = require('express');
const router = express.Router();
const validateRegisterInput = require('../middleware/validation');
const { registerAdmin, loginAdmin, updateAdmin, deleteAdmin } = require('../controllers/adminController');


router.post('/register', validateRegisterInput, registerAdmin);
router.post('/login', loginAdmin);
router.put('/update/:id', updateAdmin);
router.delete('/delete/:id', deleteAdmin);


module.exports = router;