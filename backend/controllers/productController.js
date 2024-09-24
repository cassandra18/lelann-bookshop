const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// Add a new product
const addProduct = async (req, res) => {
    try {
        const { name, price, condition = 'NEW', authorId, publisherId, subcategoryId, subject, featured = false, company} = req.body;
        
        const isFeatured = featured === 'true' ? true : false;
        // const subcategory = await prisma.subcategory.findUnique({ where: { id: subcategoryId } });
        // const author = await prisma.author.findUnique({ where: { id: authorId } });
        // const publisher = await prisma.publisher.findUnique({ where: { id: publisherId } });

        // // Validate existence of subcategory, author, and publisher
        // if (!subcategory) {
        //     return res.status(400).json({ message: 'Invalid subcategory ID' });
        // }
        // if (!author) {
        //     return res.status(400).json({ message: 'Invalid author ID' });
        // }
        // if (!publisher) {
        //     return res.status(400).json({ message: 'Invalid publisher ID' });
        // }

        // Validate required fields
        if (!name || !price ) {
            return res.status(400).json({ message: 'Name and price are required fields' });
        }

        console.log(req.file);

        // Check if image file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        // Construct image URL based on server configuration
        const image = `../uploads/${req.file.filename}`;

        // Convert price to float
        const priceFloat = parseFloat(price);

        // Create a new product
        const product = await prisma.product.create({
            data: {
                name,
                price: priceFloat,
                condition,
                subject,
                featured: isFeatured,
                company,
                author: { connect: { id: authorId } },
                publisher: { connect: { id: publisherId } },
                subcategory: { connect: { id: subcategoryId } },
                image,
            },
        });
        
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
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    };

};

// Get a product by id
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
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    } 
};

// Update a product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, condition, authorId, publisherId, subcategoryId, subject, featured, company} = req.body;

        const isFeatured = featured !== undefined ? (featured === 'true') : undefined;

        // Check if the product exists
        const existingProduct = await prisma.product.findUnique({
            where: { id },
        });

        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        // Validate existence of subcategory if provided
        if (subcategoryId) {
            const subcategory = await prisma.subcategory.findUnique({ where: { id: subcategoryId } });
            if (!subcategory) {
                return res.status(400).json({ message: 'Invalid subcategory ID' });
            }
        }

        // Validate existence of author and publisher if provided
        if (authorId) {
            const author = await prisma.author.findUnique({ where: { id: authorId } });
            if (!author) {
                return res.status(400).json({ message: 'Invalid author ID' });
            }
        }

        if (publisherId) {
            const publisher = await prisma.publisher.findUnique({ where: { id: publisherId } });
            if (!publisher) {
                return res.status(400).json({ message: 'Invalid publisher ID' });
            }
        }

        const image = `../uploads/${req.file.filename}`;

        const product = await prisma.product.update({
            where: { id },
            data: {
                name,
                price,
                condition,
                subject,
                featured: isFeatured,
                company,
                image,
                author: { connect: { id: authorId } },
                publisher: { connect: { id: publisherId } },
                subcategory: { connect: { id: subcategoryId } },
            },
        });


        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the product exists
        const existingProduct = await prisma.product.findUnique({
            where: { id },
        });

        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await prisma.product.delete({
            where: { id },
        });

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getFeaturedProducts = async (req, res) => {
    try {
        const featuredProducts = await prisma.product.findMany({
            where: { featured: true },
            include: {
                author: true,
                publisher: true,
                subcategory: true,
            },
        });

        res.status(200).json(featuredProducts);
    
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    };
}

module.exports = { addProduct, getProducts, getProductById, updateProduct, deleteProduct, getFeaturedProducts };
