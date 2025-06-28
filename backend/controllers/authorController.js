const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Add a new author
const addAuthor = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        // Check if author already exists
        const existingAuthor = await prisma.author.findUnique({
            where: { name },
        });

        if (existingAuthor) {
            return res.status(400).json({ message: 'Author with this name already exists' });
        }

        // Create new author
        const author = await prisma.author.create({
            data: { name },
        });

        res.status(201).json(author);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all authors
const getAuthors = async (req, res) => {
    try {
        const authors = await prisma.author.findMany();
        res.status(200).json(authors);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get author by ID
const getAuthorById = async (req, res) => {
    try {
        const { id } = req.params;
        const author = await prisma.author.findUnique({
            where: { id },
        });

        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        res.status(200).json(author);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update author
const updateAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const author = await prisma.author.findUnique({
            where: { id },
        });

        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        const updatedAuthor = await prisma.author.update({
            where: { id },
            data: { name },
        });

        res.status(200).json(updatedAuthor);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete author
const deleteAuthor = async (req, res) => {
    try {
        const { id } = req.params;

        const author = await prisma.author.findUnique({
            where: { id },
        });

        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        await prisma.author.delete({
            where: { id },
        });

        res.status(200).json({ message: 'Author deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    addAuthor,
    getAuthors,
    getAuthorById,
    updateAuthor,
    deleteAuthor
};
