const prisma = require("../config/prisma");

const promoteUserToAdmin = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (user.role === "ADMIN") {
    const error = new Error("User is already an admin");
    error.statusCode = 409;
    throw error;
  }

  return prisma.user.update({
    where: { id: userId },
    data: { role: "ADMIN" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
};

module.exports = { promoteUserToAdmin };