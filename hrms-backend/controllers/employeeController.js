
const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");

exports.addEmployee = async (req, res) => {
  try {
    const { password, ...details } = req.body;

    // Hash the password before saving to make it secure
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const employee = await Employee.create({
      ...details,
      password: hashedPassword,
    });// Saving employee details to the database

    res.status(201).json({
      message: "Employee created successfully",
      employee: {
        id: employee._id,
        fullName: employee.fullName,
        email: employee.email
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getEmployees = async (req, res) => {
  try {
    const { includeInactive } = req.query;

    const filter = (req.user.role === 'admin' || includeInactive === "true") 
               ? {} 
               : { status: "Active" };

    const employees = await Employee.find(filter);

    res.json(employees);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};


exports.updateEmployee = async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(employee);
};

exports.deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Employee removed" });
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);

  }
};


exports.deactivateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { status: "Inactive" },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({
      message: "Employee deactivated successfully",
      employee
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);

  }
};
