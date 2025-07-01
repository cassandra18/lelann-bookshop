const express = require('express');
const router = express.Router();
const  authenticateJWT = require('../middleware/authenticateUser');
const { addAuthor, getAuthors, getAuthorById, updateAuthor, deleteAuthor } = require('../controllers/authorController');

router.use(authenticateJWT);

router.get('/', getAuthors);
router.post('/add', addAuthor);
router.get('/:id', getAuthorById);
router.put('/update/:id', updateAuthor);
router.delete('/delete/:id', deleteAuthor);

module.exports = router;