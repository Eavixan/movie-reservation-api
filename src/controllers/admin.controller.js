const {
  promoteUserToAdmin,
} = require("../services/admin.service");

const adminTest = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Admin access confirmed",
    data: {
      user: req.user,
    },
  });
};

const promoteUser = async (req, res) => {
  try {
    const user = await promoteUserToAdmin(req.params.userId);

    return res.status(200).json({
      success: true,
      message: "User promoted to admin successfully",
      data: { user },
    });
  } catch (error) {
    console.error("Promote user error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "Internal server error",
    });
  }
};

module.exports = {
  adminTest,
  promoteUser,
};