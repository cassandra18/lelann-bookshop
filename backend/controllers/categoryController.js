const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Function to add a new category
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body

        // Validate required fields
        if (!name) {
            return res.status(400).json({ message: 'Name is a required field' })
        }

        // Create a new category
        const category = await prisma.category.create({
            data: {
                name,
                description
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
        const categories = await prisma.category.findMany()
        res.status(200).json(categories)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
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
        const { name, description } = req.body;

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
                description,
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

module.exports = { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory };