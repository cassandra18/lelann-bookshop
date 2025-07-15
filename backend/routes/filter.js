const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  const categoryId = req.query.categoryId;

  if (!categoryId) {
    return res.status(400).json({ error: "categoryId is required" });
  }

  try {
    const subcategories = await prisma.subcategory.findMany({
      where: { categoryId },
      select: {
        id: true,
        name: true,
        categoryId: true,
      },
    });

    const authors = await prisma.author.findMany({
      where: {
        products: {
          some: {
            subcategory: {
              categoryId,
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
      },
      distinct: ['id'],
    });

    const publishers = await prisma.publisher.findMany({
      where: {
        products: {
          some: {
            subcategory: {
              categoryId,
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
      },
      distinct: ['id'],
    });

    res.json({ authors, publishers, subcategories });
  } catch (error) {
    console.error("Error fetching filter options:", error);
    res.status(500).json({ error: "Server error fetching filters" });
  }
});

module.exports = router;
