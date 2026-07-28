const express = require("express");
const dotenv = require("dotenv");
const prisma = require("./config/prisma");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Movie Reservation API is running",
  });
});

app.get("/api/health/database", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,
      message: "Database connection is working",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});