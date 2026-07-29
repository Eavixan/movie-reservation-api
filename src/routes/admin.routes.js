const express = require("express");
const { adminTest } = require("../controllers/admin.controller");
const {
  authenticate,
  authorizeRoles,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.get(
  "/test",
  authenticate,
  authorizeRoles("ADMIN"),
  adminTest
);

module.exports = router;