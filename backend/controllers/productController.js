const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Add a new product
const addProduct = async (req, res) => {
    try {
        const { name, price, condition = 'NEW', authorId, publisherId, subcategoryId, subject, featured = false, company, cta } = req.body;
        
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

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
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
        const { name, price, condition, authorId, publisherId, subcategoryId, subject, featured, company, cta } = req.body;

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

// Get featured products
const getFeaturedProducts = async (req, res) => {
    const { featured } = req.query;
    try {
        const whereCondition = featured === 'true' ? { featured: true }: {};
        const featuredProducts = await prisma.product.findMany({
            where: whereCondition,
            select: {
                id: true,
                name: true,
                price: true,
                image: true,
                cta: true,
            },
        });

        res.status(200).json(featuredProducts);
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
    getFeaturedProducts,
};
