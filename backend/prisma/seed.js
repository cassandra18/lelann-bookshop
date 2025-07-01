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

  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();