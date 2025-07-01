const express = require('express');
const router = express.Router();
const { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categoryController');
const authenticateJWT = require('../middleware/authenticateUser');

// Routes
router.post('/add', authenticateJWT, createCategory);
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.put('/update/:id', authenticateJWT, updateCategory);
router.delete('/delete/:id', authenticateJWT, deleteCategory);

module.exports = router;