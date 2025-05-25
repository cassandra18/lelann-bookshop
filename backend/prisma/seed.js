// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function main() {
  try {
    // Seed Super Admin
    const hashedPassword = await bcrypt.hash('SuperSecureAdmin123', 10);

    const existingAdmin = await prisma.user.findUnique({
      where: {
        email: 'admin1@example.com',
      },
    });

    if (!existingAdmin) {
      await prisma.user.create({
        data: {
          name: 'Super Admin1',
          email: 'admin1@example.com',
          password: hashedPassword,
          role: 'admin',
        },
      });
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists, skipping creation.');
    }

    // Seed Authors (now requiring email)
    const authorA = await prisma.author.upsert({
      where: { email: 'authorA@example.com' }, // Use upsert to prevent duplicates
      update: {}, // No specific updates if found
      create: {
        name: 'Author A',
        email: 'authorA@example.com',
      },
    });

    const authorB = await prisma.author.upsert({
      where: { email: 'authorB@example.com' },
      update: {},
      create: {
        name: 'Author B',
        email: 'authorB@example.com',
      },
    });

    // Seed Publishers (now requiring email)
    const publisherA = await prisma.publisher.upsert({
      where: { email: 'publisherA@example.com' },
      update: {},
      create: {
        name: 'Publisher A',
        email: 'publisherA@example.com',
      },
    });

    const publisherB = await prisma.publisher.upsert({
      where: { email: 'publisherB@example.com' },
      update: {},
      create: {
        name: 'Publisher B',
        email: 'publisherB@example.com',
      },
    });

    // Seed Categories (using upsert for idempotency)
    const educationalBooksCategory = await prisma.category.upsert({
      where: { name: 'Educational Books' },
      update: {},
      create: {
        name: 'Educational Books',
        description: 'Books for educational purposes',
      },
    });

    // Seed Subcategories (using upsert for idempotency and linking to categories/parents)
    const prePrimaryEcdeSubcategory = await prisma.subcategory.upsert({
      where: { name: 'Pre-primary & ECDE' },
      update: {
        category: { connect: { id: educationalBooksCategory.id } }, // Ensure category is linked
      },
      create: {
        name: 'Pre-primary & ECDE',
        category: { connect: { id: educationalBooksCategory.id } },
      },
    });

    const ecdeSubcategory = await prisma.subcategory.upsert({
      where: { name: 'ECDE' },
      update: {
        category: { connect: { id: educationalBooksCategory.id } },
        parent: { connect: { id: prePrimaryEcdeSubcategory.id } },
      },
      create: {
        name: 'ECDE',
        category: { connect: { id: educationalBooksCategory.id } },
        parent: { connect: { id: prePrimaryEcdeSubcategory.id } },
      },
    });

    const prePrimarySubcategory = await prisma.subcategory.upsert({
      where: { name: 'Pre-primary' },
      update: {
        category: { connect: { id: educationalBooksCategory.id } },
        parent: { connect: { id: prePrimaryEcdeSubcategory.id } },
      },
      create: {
        name: 'Pre-primary',
        category: { connect: { id: educationalBooksCategory.id } },
        parent: { connect: { id: prePrimaryEcdeSubcategory.id } },
      },
    });

    const competencyBasedCurriculumCategory = await prisma.subcategory.upsert({
      where: { name: 'Competency Based Curriculum' },
      update: {
        category: { connect: { id: educationalBooksCategory.id } },
      },
      create: {
        name: 'Competency Based Curriculum',
        category: { connect: { id: educationalBooksCategory.id } },
      },
    });

    // Seed Products (updated with new required fields and enum for condition)
    const ecdePrimaryProduct = await prisma.product.upsert({
      where: { name: 'ECDE Book 1' }, // Assuming name is unique for products for upsert
      update: {},
      create: {
        name: 'ECDE Book 1',
        price: 500,
        condition: 'NEW', // Use the enum value directly
        description: 'A new ECDE book for early childhood development.', // New required field
        author_id: authorA.id,
        publisher_id: publisherA.id,
        image: 'lelann_bookshop/backend/uploads/queenex_g5_encyclopedia.png', // Renamed imageUrl to image
        subcategory_id: ecdeSubcategory.id,
        company: 'Example Publishing Co.', // New required field
        featured: true, // Example value
        bestseller: false,
        newarrival: true,
        wishlist: false,
        promotion: false,
        cta: 'Buy Now!', // Optional field
      },
    });

    const prePrimaryProduct = await prisma.product.upsert({
      where: { name: 'Pre-primary Book 1' },
      update: {},
      create: {
        name: 'Pre-primary Book 1',
        price: 8.99,
        condition: 'NEW',
        description: 'An engaging pre-primary book for young learners.',
        author_id: authorB.id,
        publisher_id: publisherB.id,
        image: 'lelann_bookshop/backend/uploads/queenex_g5_encyclopedia.png',
        subcategory_id: prePrimarySubcategory.id,
        company: 'Childrens Books Ltd.',
        featured: false,
        bestseller: true,
        newarrival: false,
        wishlist: false,
        promotion: false,
      },
    });

    const grade1Product = await prisma.product.upsert({
      where: { name: 'Grade 1 Book' },
      update: {},
      create: {
        name: 'Grade 1 Book',
        price: 12.99,
        condition: 'NEW',
        description: 'A comprehensive Grade 1 textbook following the CBC curriculum.',
        author_id: authorB.id,
        publisher_id: publisherB.id,
        image: 'lelann_bookshop/backend/uploads/queenex_g5_encyclopedia.png',
        subcategory_id: competencyBasedCurriculumCategory.id,
        company: 'Curriculum Publishers',
        featured: true,
        bestseller: true,
        newarrival: true,
        wishlist: false,
        promotion: false,
      },
    });

    // Display seeded data (ensure to include necessary relations for proper logging)
    const seededCategories = await prisma.category.findMany({
      include: {
        subcategories: {
          include: {
            products: true,
            parent: true, // Include parent for nested structure clarity
            subcategories: true, // Include nested subcategories
          },
        },
      },
    });

    console.log('Database has been seeded.', JSON.stringify(seededCategories, null, 2));
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();