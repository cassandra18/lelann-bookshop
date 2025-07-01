const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authenticateUser');
const { addPublisher, getPublishers, getPublisherById, updatePublisher, deletePublisher } = require('../controllers/publisherController');


router.use(authenticateJWT);

router.post('/add', addPublisher);
router.get('/', getPublishers);
router.get('/:id', getPublisherById);
router.put('/update/:id', updatePublisher);
router.delete('/delete/:id', deletePublisher);

module.exports = router;