const express = require('express');
const router = express.Router();
const { createSubcategory, getSubcategories, updateSubcategory, deleteSubcategory, getSubcategoryById } = require('../controllers/subcategoryController');
const authenticateJWT = require('../middleware/authenticateUser');
const authorizeRole = require('../middleware/authorizeRole');

// Routes
router.post('/add', authenticateJWT, createSubcategory);
router.get('/', getSubcategories);
router.get('/:id', getSubcategoryById);
router.put('/update/:id', authenticateJWT, updateSubcategory);
router.delete('/delete/:id', authenticateJWT, deleteSubcategory);

module.exports = router;