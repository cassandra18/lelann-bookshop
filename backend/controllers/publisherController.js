const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const addPublisher = async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: 'Please provide a name and an email' });
    }

    try {
        const newPublisher = await prisma.publisher.create({
            data: { name, email },
        });

        if (!newPublisher) {
            return res.status(500).json({ message: 'Failed to add publisher' });
        }

        res.status(201).json(newPublisher);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getPublishers = async (req, res) => {
    try {
        const publishers = await prisma.publisher.findMany();
        if (!publishers) {
            return res.status(404).json({ message: 'No publishers found' });
        }
        res.status(200).json(publishers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

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

const updatePublisher = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
        const publisher = await prisma.publisher.findUnique({
            where: { id },
        });

        if (!publisher) {
            return res.status(404).json({ message: 'Publisher not found' });
        }

        const updatedPublisher = await prisma.publisher.update({
            where: { id },
            data: { name, email },
        });

        res.status(200).json(updatedPublisher);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

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