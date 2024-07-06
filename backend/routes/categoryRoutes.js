const express = require('express');
const router = express.Router();
const { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categoryController');
const authenticateAdmin = require('../middleware/authenticateAdmin');


// Routes
router.post('/add', authenticateAdmin, createCategory);
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.put('/update/:id', authenticateAdmin, updateCategory);
router.delete('/delete/:id', authenticateAdmin, deleteCategory);

module.exports = router;