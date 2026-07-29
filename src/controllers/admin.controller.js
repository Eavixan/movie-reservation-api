const adminTest = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Admin access confirmed",
    data: {
      user: req.user,
    },
  });
};

module.exports = { adminTest };