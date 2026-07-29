require("dotenv").config();

const bcrypt = require("bcryptjs");
const prisma = require("../src/config/prisma");

const seedAdmin = async () => {
  try {
    const passwordHash = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      12
    );

    const admin = await prisma.user.upsert({
      where: {
        email: process.env.ADMIN_EMAIL.toLowerCase(),
      },
      update: {
        name: process.env.ADMIN_NAME,
        passwordHash,
        role: "ADMIN",
      },
      create: {
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL.toLowerCase(),
        passwordHash,
        role: "ADMIN",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    console.log("Admin user ready:", admin);
  } catch (error) {
    console.error("Admin seed failed:", error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
};

seedAdmin();