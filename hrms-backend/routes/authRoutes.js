const express = require("express");
const { registerUser, loginUser, loginEmployee } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/employee/login", loginEmployee);

module.exports = router;
