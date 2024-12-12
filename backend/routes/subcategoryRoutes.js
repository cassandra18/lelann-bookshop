const express = require('express');
const router = express.Router();
const { createSubcategory, getSubcategories, updateSubcategory, deleteSubcategory, getSubcategoryById } = require('../controllers/subcategoryController');
const authenticateAdmin = require('../middleware/authenticateAdmin');
const authorizeRole = require('../middleware/authorizeRole');

// Routes
router.post('/add', authenticateAdmin, authorizeRole(['admin']), createSubcategory);
router.get('/', getSubcategories);
router.get('/:id', getSubcategoryById);
router.put('/update/:id',authenticateAdmin, authorizeRole(['admin']), updateSubcategory);
router.delete('/delete/:id', authenticateAdmin, authorizeRole(['admin']), deleteSubcategory);

module.exports = router;