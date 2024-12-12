const express = require('express');
const router = express.Router();
const { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categoryController');
const authenticateAdmin = require('../middleware/authenticateAdmin');
const authorizeRole = require('../middleware/authorizeRole');

// Routes
router.post('/add', authenticateAdmin, authorizeRole(['admin']), createCategory);
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.put('/update/:id', authenticateAdmin, authorizeRole(['admin']), updateCategory);
router.delete('/delete/:id', authenticateAdmin, authorizeRole(['admin']), deleteCategory);

module.exports = router;