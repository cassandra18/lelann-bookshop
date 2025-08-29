const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

const buildSubcategoryTree = (flatList, parentId = null) => {
  return flatList
    .filter(item => item.parent_id === parentId)
    .map(item => ({
      ...item,
      // Recursively find and attach children
      children: buildSubcategoryTree(flatList, item.id),
    }));
};

router.get("/", async (req, res) => {
  const category_id = req.query.categoryId;

  if (!category_id) {
    return res.status(400).json({ error: "category_id is required" });
  }

  try {
    const allSubcategories = await prisma.subcategory.findMany({
      where: { category_id },
      select: {
        id: true,
        name: true,
        parent_id: true,
      },
    });

    const subcategories = buildSubcategoryTree(allSubcategories);

    const authors = await prisma.author.findMany({
      where: {
        books: {
          some: {
            subcategories: {
              some: {
                category_id,
              },
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
            subcategories: {
              some: {
                category_id,
              },
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

    const companies = await prisma.product.findMany({
      where: {
        company: { not: ''},
        subcategories: {
          some: {
            category_id: category_id,
          },
        },
      },
      select: {
        company: true,
      },
      distinct: ['company'],
    });

    // Map companies to the desired format { id: string, name: string }
    const companyOptions = companies.map(c => ({ id: c.company, name: c.company }));

    res.json({ authors, publishers, subcategories, companies: companyOptions });
  } catch (error) {
    console.error("Error fetching filter options:", error);
    res.status(500).json({ error: "Server error fetching filters" });
  }
});

module.exports = router;