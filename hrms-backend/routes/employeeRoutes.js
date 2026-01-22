const express = require("express");
const {
  addEmployee,
  getEmployees,
  updateEmployee,
  deactivateEmployee,
  getAllEmployees,

} = require("../controllers/employeeController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/", protect, adminOnly, addEmployee);
router.get("/", protect, adminOnly, getEmployees);
router.put("/:id", protect, adminOnly, updateEmployee);
router.put("/:id/deactivate", protect, adminOnly, deactivateEmployee);


module.exports = router;
