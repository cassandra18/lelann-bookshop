const express = require('express');
const router = express.Router();
const authenticateAdmin = require('../middleware/authenticateAdmin');
const { addPublisher, getPublishers, getPublisherById, updatePublisher, deletePublisher } = require('../controllers/publisherController');


router.use(authenticateAdmin);

router.post('/add', addPublisher);
router.get('/', getPublishers);
router.get('/:id', getPublisherById);
router.put('/:id', updatePublisher);
router.delete('/:id', deletePublisher);

module.exports = router;