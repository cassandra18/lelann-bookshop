const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');


async function main() {
  try {
    const hashedPassword = await bcrypt.hash('SuperSecureAdmin123', 10);
      await prisma.user.create({
        data: {
          name: 'Super Admin',
          email: 'admin@example.com',
          password: hashedPassword,
          role: 'admin',
        },
      });

      console.log('Admin user created');
    }

    // Add authors
    const authorA = await prisma.author.create({ data: { name: 'Author A' } });
    const authorB = await prisma.author.create({ data: { name: 'Author B' } });

    // Add publishers
    const publisherA = await prisma.publisher.create({ data: { name: 'Publisher A' } });
    const publisherB = await prisma.publisher.create({ data: { name: 'Publisher B' } });

    // Create categories
    const educationalBooksCategory = await prisma.category.create({
      data: {
        name: 'Educational Books',
        description: 'Books for educational purposes',
      },
    });

    // create subcategories
    const prePrimaryEcdeSubcategory = await prisma.subcategory.create({
      data: {
        name: 'Pre-primary & ECDE',
        category: { connect: { id: educationalBooksCategory.id } },
      },
    });

    const ecdeSubcategory = await prisma.subcategory.create({
      data: {
        name: 'ECDE',
        category: { connect: { id: educationalBooksCategory.id } },
        parent: { connect: { id: prePrimaryEcdeSubcategory.id } },
      },
    });

    const prePrimarySubcategory = await prisma.subcategory.create({
      data: {
        name: 'Pre-primary',
        category: { connect: { id: educationalBooksCategory.id } },
        parent: { connect: { id: prePrimaryEcdeSubcategory.id } },
      },
    });

    const competencyBasedCurriculumCategory = await prisma.subcategory.create({
      data: {
        name: 'Competency Based Curriculum',
        category: { connect: { id: educationalBooksCategory.id } },
      },
    });

    // Create products
    const ecdePrimaryProduct = await prisma.product.create({
      data: {
        name: 'ECDE Book 1',
        price: 10.99,
        condition: 'NEW',
        description: 'A new ECDE book',
        author_id: authorA.id,
        publisher_id: publisherA.id,
        imageUrl: 'lelann_bookshop/backend/uploads/queenex_g5_encyclopedia.png',
        subcategory_id: ecdeSubcategory.id,
      },
    });

    console.log('ECDE Primary Product:', ecdePrimaryProduct);

    const prePrimaryProduct = await prisma.product.create({
      data: {
        name: 'Pre-primary Book 1',
        price: 8.99,
        condition: 'NEW',
        description: 'A new Pre-primary book',
        author_id: authorB.id,
        publisher_id: publisherB.id,
        imageUrl: 'lelann_bookshop/backend/uploads/queenex_g5_encyclopedia.png',
        subcategory_id: prePrimarySubcategory.id,
      },
    });

    console.log('PrePrimary Product:', prePrimaryProduct);

    const grade1Product = await prisma.product.create({
      data: {
        name: 'Grade 1 Book',
        price: 12.99,
        condition: 'NEW',
        description: 'A new Grade 1 book',
        author_id:  authorB.id,
        publisher_id: publisherB.id,
        imageUrl: 'lelann_bookshop/backend/uploads/queenex_g5_encyclopedia.png',
        subcategory_id: competencyBasedCurriculumCategory.id
      },
    });

    console.log('Grade 1 Product:', grade1Product);

    // Include products in the output
    const educationalBooksWithProducts = await prisma.category.findUnique({
      where: {
        id: educationalBooksCategory.id,
      },
      include: {
        subcategories: {
          include: {
            products: true,
          },
        },
      },
    });

    console.log('Database has been seeded.', educationalBooksWithProducts);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }

main();
