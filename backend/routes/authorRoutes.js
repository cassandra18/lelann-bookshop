const express = require('express');
const router = express.Router();
const  authenticateAdmin = require('../middleware/authenticateAdmin');
const { addAuthor, getAuthors, getAuthorById, updateAuthor, deleteAuthor } = require('../controllers/authorController');

router.use(authenticateAdmin);

router.get('/', getAuthors);
router.post('/add', addAuthor);
router.get('/:id', getAuthorById);
router.put('/:id', updateAuthor);
router.delete('/:id', deleteAuthor);

module.exports = router;