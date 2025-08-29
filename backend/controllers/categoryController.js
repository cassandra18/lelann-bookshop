const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Function to add a new category
const createCategory = async (req, res) => {
    try {
        const { name } = req.body

        // Validate required fields
        if (!name) {
            return res.status(400).json({ message: 'Name is a required field' })
        }

        // Create a new category
        const category = await prisma.category.create({
            data: {
                name,
            },
        })

        if (!category) {
            return res.status(400).json({ message: 'Failed to create category' })
        }

        res.status(201).json(category)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
};

// Function to get all categories
const getCategories = async (req, res) => {
    try {
        const { name } = req.query;

        if (name) {
            // Case 1: Fetch a single category by its unique name
            const category = await prisma.category.findUnique({
                where: { name: name },
            });

            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            return res.status(200).json(category); // Return a single object
        } else {
            // Case 2: Fetch all categories
            const categories = await prisma.category.findMany();
            return res.status(200).json(categories); // Return an array of objects
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Function to get category by name
const getCategoryByName = async (req, res) => {
    try {
        const { name } = req.query; // Get the 'name' from the query parameters
        
        if (!name) {
            return res.status(400).json({ message: 'Category name is required' });
        }

        const existingCategory = await prisma.category.findUnique({
            where: { name: name }, // Query by the unique name field
        });

        if (!existingCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(existingCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to get a single category by ID
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params
        
        const existingCategory = await prisma.category.findUnique({
            where: { id },
        });

        if (!existingCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(existingCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name} = req.body;

        // Validate required fields
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        // Check if the category exists
        const existingCategory = await prisma.category.findUnique({
            where: { id },
        });

        if (!existingCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Update the category
        const updatedCategory = await prisma.category.update({
            where: { id },
            data: {
                name,
            },
        });

        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the category exists
        const existingCategory = await prisma.category.findUnique({
            where: { id },
        });

        if (!existingCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Delete the category
        await prisma.category.delete({
            where: { id },
        });

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { createCategory, getCategories, getCategoryByName, getCategoryById, updateCategory, deleteCategory };