const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Function to add a new subcategory
const createSubcategory = async (req, res) => {
    try {
        const { name, parentId, categoryId } = req.body;

        // Validate required fields
        if (!name || !categoryId) {
            return res.status(400).json({ message: 'Name and category ID are required fields' });
        }

        // Create a new subcategory
        const subcategory = await prisma.subcategory.create({
            data: {
                name,
                parent_id: parentId,
                category_id: categoryId,
            },
        });

        res.status(201).json(subcategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to get all subcategories
const getSubcategories = async (req, res) => {
    try {
        const subcategories = await prisma.subcategory.findMany();
        res.status(200).json(subcategories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to get a single subcategory by ID
const getSubcategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const subcategory = await prisma.subcategory.findUnique({
            where: { id },
        });

        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        res.status(200).json(subcategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to update a subcategory
const updateSubcategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, parentId, categoryId } = req.body;

        // Validate required fields
        if (!name || !categoryId) {
            return res.status(400).json({ message: 'Name and category ID are required' });
        }

        // Check if the subcategory exists
        const existingSubcategory = await prisma.subcategory.findUnique({
            where: { id },
        });

        if (!existingSubcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        // Update the subcategory
        const updatedSubcategory = await prisma.subcategory.update({
            where: { id },
            data: {
                name,
                parent_id: parentId,
                category_id: categoryId,
            },
        });

        res.status(200).json(updatedSubcategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to delete a subcategory
const deleteSubcategory = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the subcategory exists
        const existingSubcategory = await prisma.subcategory.findUnique({
            where: { id },
        });

        if (!existingSubcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        // Delete the subcategory
        await prisma.subcategory.delete({
            where: { id },
        });

        res.status(200).json({ message: 'Subcategory deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { createSubcategory, getSubcategories, getSubcategoryById, updateSubcategory, deleteSubcategory };
