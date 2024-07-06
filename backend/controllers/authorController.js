const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const addAuthor = async (req, res) => {
    try {
        const { name , email} = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' });
        };

        // Check if author already exists
        const existingAuthor = await prisma.author.findUnique({
            where: {
                email,
            },
        });
        if (existingAuthor) {
            return res.status(400).json({ message: 'Author with this name already exists' });
        }

        // Create a new author
        const author = await prisma.author.create({
            data: {
                name,
                email
            },
        });

        res.status(201).json(author);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    };
};

const getAuthors = async (req, res) => {
    try {
        const authors = await prisma.author.findMany();
        res.status(200).json(authors);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

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

const updateAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const author = await prisma.author.findUnique({
            where: { id },
        });
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        const updatedAuthor = await prisma.author.update({
            where: { id },
            data: { name, email },
        });

        res.status(200).json(updatedAuthor);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

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

module.exports = { addAuthor, getAuthors, getAuthorById, updateAuthor, deleteAuthor };