const Leave = require("../models/Leave");


exports.applyLeave = async (req, res) => {
  try {
    const { reason, startDate, endDate } = req.body;
    const leave = await Leave.create({
      user: req.user._id, 
      reason,
      startDate,
      endDate,
    });
    res.status(201).json({ message: "Leave applied successfully", leave });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("user", "fullName employeeId department")
      .sort({ createdAt: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body; // "Approved" or "Rejected"
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!leave) return res.status(404).json({ message: "Leave not found" });
    res.json({ message: `Leave ${status} successfully`, leave });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getMyLeaves = async (req, res) => {
  try {
 
    const leaves = await Leave.find({ user: req.user._id }).sort({ createdAt: -1 });
    
    if (!leaves) {
      return res.status(200).json([]); 
    }
    
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: "Error fetching your leave history" });
  }
};