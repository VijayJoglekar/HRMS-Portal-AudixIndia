const express = require("express");
const router = express.Router();
const { markAttendance, getAllAttendance } = require("../controllers/attendanceController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const Attendance = require("../models/Attendance");


router.post("/", protect, markAttendance);

// Admin can see all attendance
router.get("/", protect, adminOnly, getAllAttendance);
router.get("/employee/:id", protect, adminOnly, async (req, res) => {
  try {
    const records = await Attendance.find({ user: req.params.id })
      .sort({ date: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get MY attendance history 
router.get("/my-attendance", protect, async (req, res) => {
  try {
   
    const records = await Attendance.find({ user: req.user._id })
      .sort({ date: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/user/:userId", protect, async (req, res) => {
  try {
    const logs = await Attendance.find({ user: req.params.userId });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user attendance" });
  }
});
module.exports = router;