const express = require("express");

const {
  adminTest,
  promoteUser,
} = require("../controllers/admin.controller");

const {
  authenticate,
  authorizeRoles,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authenticate);
router.use(authorizeRoles("ADMIN"));

router.get("/test", adminTest);
router.patch("/users/:userId/promote", promoteUser);

module.exports = router;