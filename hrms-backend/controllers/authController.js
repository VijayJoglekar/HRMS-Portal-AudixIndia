
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};


exports.loginEmployee = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  console.log("Login attempt for:", email);
  try {
   
    const employee = await Employee.findOne({ email });

  
    if (employee && (await bcrypt.compare(password, employee.password))) {
      
   
      if (employee.status === "Inactive") {
        return res.status(403).json({ message: "Access denied. Employee is inactive." });
      }

    
      res.json({
        _id: employee._id,
        name: employee.fullName,
        email: employee.email,
        role: "employee",
        token: generateToken(employee._id), // Generating token for the employee
      });
    } else {
      res.status(401).json({ message: "Invalid employee credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

