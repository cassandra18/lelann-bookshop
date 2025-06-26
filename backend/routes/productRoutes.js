const express = require('express');
const authenticateJWT = require('../middleware/authenticateUser');
const { addProduct, getProductById, getProducts, deleteProduct, updateProduct} = require('../controllers/productController');
const upload = require('../middleware/uploadImage');
const router = express.Router();


// Route to add a new product
router.post('/product/add', authenticateJWT, upload.single('image'), addProduct);

// Route to update an existing product
router.put('/product/update/:id', authenticateJWT, upload.single('image'), updateProduct);

// Route to delete a product
router.delete('/product/delete/:id', authenticateJWT, deleteProduct);

// Route to get a product by id
router.get('/product/:id', getProductById);

// Route to get all products
router.get('/products', getProducts);


module.exports = router;