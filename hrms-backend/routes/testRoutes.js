const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({ message: "Welcome Admin", user: req.user });
});

router.get("/employee", protect, (req, res) => {
  res.json({ message: "Welcome Employee", user: req.user });
});

module.exports = router;
