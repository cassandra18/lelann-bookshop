const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  const category_id = req.query.categoryId;

  if (!category_id) {
    return res.status(400).json({ error: "category_id is required" });
  }

  try {
    const subcategories = await prisma.subcategory.findMany({
      where: { category_id },
      select: {
        id: true,
        name: true,
        category_id: true,
      },
    });

    const authors = await prisma.author.findMany({
      where: {
        books: {
          some: {
            subcategory: {
              category_id,
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
        books: {
          some: {
            subcategory: {
              category_id,
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
