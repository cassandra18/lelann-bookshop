const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Add a new product
const addProduct = async (req, res) => {
    try {
        const { name, price, condition = 'NEW', authorId, publisherId, subcategoryId, subject, featured = false, company, cta,
            wishlist = false, promotion = false, bestseller = false, newarrival = false, oldPrice, discount
         } = req.body;
        
        // Validate required fields
        if (!name || !price) {
            return res.status(400).json({ message: 'Name and price are required fields' });
        }

        // Check if image file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        // Convert price to float
        const priceFloat = parseFloat(price);
        if (isNaN(priceFloat)) {
            return res.status(400).json({ message: 'Price must be a valid number' });
        }

        // Convert oldPrice and discount to float if provided
        let oldPriceFloat;
        if (oldPrice) {
            oldPriceFloat = parseFloat(oldPrice);
            if (isNaN(oldPriceFloat)) {
                return res.status(400).json({ message: 'oldPrice must be a valid number' });
            }
        }

        let discountFloat;
        if (discount) {
            discountFloat = parseFloat(discount);
            if (isNaN(discountFloat)) {
                return res.status(400).json({ message: 'Discount must be a valid number' });
            }
        }
        

        // Construct image URL
        const image = `http://localhost:5000/uploads/${req.file.filename}`;

        // Create product data object
        const productData = {
            name,
            price: priceFloat,
            condition,
            subject,
            featured: featured === 'true', // Convert to boolean
            company,
            subcategory: { connect: { id: subcategoryId } },
            image,
            cta,
            oldPrice: oldPriceFloat,
            discount: discountFloat,
            promotion: promotion === 'true',
            bestseller: bestseller === 'true',
            newarrival: newarrival === 'true',
            wishlist: wishlist === 'true',
        };

        // Conditionally add author and publisher if IDs are provided
        if (authorId) {
            productData.author = { connect: { id: authorId } };
        }

        if (publisherId) {
            productData.publisher = { connect: { id: publisherId } };
        }

        // Create a new product
        const product = await prisma.product.create({ data: productData });
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all products with optional filters
const getProducts = async (req, res) => {
    try {
        // Extract query parameters from the request
        const { featured, bestseller, promotion, newarrival, wishlist } = req.query;

        // Build the `where` condition based on the query parameters
        const whereCondition = {};

        // Apply conditions only if the respective query parameters are present
        if (featured === 'true') whereCondition.featured = true;
        if (bestseller === 'true') whereCondition.bestseller = true;
        if (promotion === 'true') whereCondition.promotion = true;
        if (newarrival === 'true') whereCondition.newarrival = true;
        if (wishlist === 'true') whereCondition.wishlist = true;

        // Fetch products based on the built condition
        const products = await prisma.product.findMany({
            where: whereCondition,
            include: {
                author: true,
                publisher: true,
                subcategory: true,
            },
        });

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                author: true,
                publisher: true,
                subcategory: true,
            },
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    } 
};

// Update a product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, condition, authorId, publisherId, subcategoryId, subject, featured, company, cta, promotion, bestseller, newarrival, wishlist, oldPrice, discount } = req.body;

        // Check if the product exists
        const existingProduct = await prisma.product.findUnique({ where: { id } });

        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Prepare the product data object for update
        const productData = {
            name,
            price: price !== undefined ? parseFloat(price) : existingProduct.price,
            condition,
            subject,
            featured: featured !== undefined ? (featured === 'true') : existingProduct.featured,
            company,
            subcategory: subcategoryId ? { connect: { id: subcategoryId } } : existingProduct.subcategory,
            image: req.file ? `http://localhost:5000/uploads/${req.file.filename}` : existingProduct.image,
            cta,
            oldPrice: oldPrice !== undefined ? parseFloat(oldPrice) : existingProduct.oldPrice,
            discount: discount !== undefined ? parseFloat(discount) : existingProduct.discount,
            promotion: promotion !== undefined ? (promotion === 'true') : existingProduct.promotion,
            bestseller: bestseller !== undefined ? (bestseller === 'true') : existingProduct.bestseller,
            newarrival: newarrival !== undefined ? (newarrival === 'true') : existingProduct.newarrival,
            wishlist: wishlist !== undefined ? (wishlist === 'true') : existingProduct.wishlist,
        };

        // Conditionally add author and publisher if IDs are provided
        if (authorId) {
            productData.author = { connect: { id: authorId } };
        }

        if (publisherId) {
            productData.publisher = { connect: { id: publisherId } };
        }

        // Update the product
        const product = await prisma.product.update({
            where: { id },
            data: productData,
        });

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the product exists
        const existingProduct = await prisma.product.findUnique({ where: { id } });

        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await prisma.product.delete({ where: { id } });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



module.exports = {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
