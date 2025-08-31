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

    const conditions = await prisma.product.findMany({
        where: {
            condition: { not: '' },
            subcategories: {
                some: {
                    category_id: category_id,
                },
            },
        },
        select: {
            condition: true,
        },
        distinct: ['condition'],
    });

    const ageRanges = await prisma.product.findMany({
        where: {
            ageRange: { not: '' },
            subcategories: {
                some: {
                    category_id: category_id,
                },
            },
        },
        select: {
            ageRange: true,
        },
        distinct: ['ageRange'],
    });

    const levels = await prisma.product.findMany({
        where: {
            level: { not: '' },
            subcategories: {
                some: {
                    category_id: category_id,
                },
            },
        },
        select: {
            level: true,
        },
        distinct: ['level'],
    });

    const subjects = await prisma.product.findMany({
        where: {
            subject: { not: '' },
            subcategories: {
                some: {
                    category_id: category_id,
                },
            },
        },
        select: {
            subject: true,
        },
        distinct: ['subject'],
    });

    const editions = await prisma.product.findMany({
        where: {
            edition: { not: '' },
            subcategories: {
                some: {
                    category_id: category_id,
                },
            },
        },
        select: {
            edition: true,
        },
        distinct: ['edition'],
    });

    const yearsPublished = await prisma.product.findMany({
      where: {
          yearPublished: { not: null },
          subcategories: {
              some: {
                  category_id: category_id,
              },
          },
      },
      select: {
          yearPublished: true,
      },
      distinct: ['yearPublished'],
      orderBy: {
        yearPublished: 'desc', // Optional: Sort years in descending order
      },
    });

    const formatFilterOptions = (arr, key) => arr.map(item => ({ id: item[key], name: item[key] }));

    res.json({ 
      authors, 
      publishers, 
      subcategories, 
      companies: formatFilterOptions(companies, 'company'),
      conditions: formatFilterOptions(conditions, 'condition'),
      ageRanges: formatFilterOptions(ageRanges, 'ageRange'),
      levels: formatFilterOptions(levels, 'level'),
      subjects: formatFilterOptions(subjects, 'subject'),
      editions: formatFilterOptions(editions, 'edition'),
      yearsPublished: formatFilterOptions(yearsPublished, 'yearPublished'),
    });
  } catch (error) {
    console.error("Error fetching filter options:", error);
    res.status(500).json({ error: "Server error fetching filters" });
  }
});

module.exports = router;