const express = require('express');
const router = express.Router();
const { createSubcategory, getSubcategories, updateSubcategory, deleteSubcategory, getSubcategoryById } = require('../controllers/subcategoryController');
const authenticateAdmin = require('../middleware/authenticateAdmin');
const authorizeRole = require('../middleware/authorizeRole');

// Routes
router.post('/add', authenticateAdmin, createSubcategory);
router.get('/', getSubcategories);
router.get('/:id', getSubcategoryById);
router.put('/update/:id',authenticateAdmin, updateSubcategory);
router.delete('/delete/:id', authenticateAdmin, deleteSubcategory);

module.exports = router;