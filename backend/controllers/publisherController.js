const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Add publisher
const addPublisher = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Please provide a name' });
    }

    try {
        const newPublisher = await prisma.publisher.create({
            data: { name },
        });

        res.status(201).json(newPublisher);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all publishers
const getPublishers = async (req, res) => {
    try {
        const publishers = await prisma.publisher.findMany();
        res.status(200).json(publishers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get publisher by ID
const getPublisherById = async (req, res) => {
    const { id } = req.params;

    try {
        const publisher = await prisma.publisher.findUnique({
            where: { id },
        });

        if (!publisher) {
            return res.status(404).json({ message: 'Publisher not found' });
        }

        res.status(200).json(publisher);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update publisher
const updatePublisher = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const publisher = await prisma.publisher.findUnique({
            where: { id },
        });

        if (!publisher) {
            return res.status(404).json({ message: 'Publisher not found' });
        }

        const updatedPublisher = await prisma.publisher.update({
            where: { id },
            data: { name },
        });

        res.status(200).json(updatedPublisher);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete publisher
const deletePublisher = async (req, res) => {
    const { id } = req.params;

    try {
        const publisher = await prisma.publisher.findUnique({
            where: { id },
        });

        if (!publisher) {
            return res.status(404).json({ message: 'Publisher not found' });
        }

        await prisma.publisher.delete({
            where: { id },
        });

        res.status(200).json({ message: 'Publisher deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    addPublisher,
    getPublishers,
    getPublisherById,
    updatePublisher,
    deletePublisher,
};
