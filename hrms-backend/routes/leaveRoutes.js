const express = require("express");
const router = express.Router();
const { applyLeave, getAllLeaves, updateLeaveStatus, getMyLeaves } = require("../controllers/leaveController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Employee applies
router.post("/apply", protect, applyLeave);
router.get("/my-requests", protect, getMyLeaves);

// Admin views all and updates status
router.get("/", protect, adminOnly, getAllLeaves);
router.put("/:id", protect, adminOnly, updateLeaveStatus);


module.exports = router;