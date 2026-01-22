const Attendance = require("../models/Attendance");


exports.markAttendance = async (req, res) => {
  try {
    const { status } = req.body;
    const userId = req.user._id; 
    const today = new Date().toISOString().split("T")[0]; 

    const attendance = await Attendance.create({
      user: userId,
      date: today,
      status: status || "Present",
    });

    res.status(201).json({ message: "Attendance marked successfully", attendance });
  } catch (error) {
   
    if (error.code === 11000) {
      return res.status(400).json({ message: "You have already marked attendance for today." });
    }
    res.status(500).json({ message: error.message });
  }
};


exports.getAllAttendance = async (req, res) => {
  try {
    const { date } = req.query; 
    
    let filter = {};
    if (date) {
      filter.date = date;
    }

    const records = await Attendance.find(filter)
      .populate("user", "fullName employeeId department")
      .sort({ createdAt: -1 });

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};