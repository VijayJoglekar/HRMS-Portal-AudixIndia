import { useState, useEffect } from "react";
import { X } from "lucide-react";
import api from "../services/api";

function EmployeeForm({ closeForm, refreshData, editData }) {
  const [formData, setFormData] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    password: "",
    department: "",
    salary: "",
    joiningDate: ""
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        ...editData,
        password: "", 
        joiningDate: editData.joiningDate ? editData.joiningDate.split('T')[0] : "" 
      });
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
      
        const updatePayload = { ...formData };
        if (!updatePayload.password) {
          delete updatePayload.password;
        }
        
        await api.put(`/employees/${editData._id}`, updatePayload);
        alert("Employee Updated successfully!");
      } else {
        await api.post("/employees", formData);
        alert("Employee Registered successfully!");
      }
      refreshData();
      closeForm();
    } catch (err) {
    
      alert(err.response?.data?.message || "Error saving employee");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h3>{editData ? "Edit Employee Details" : "Register New Employee"}</h3>
          <button className="close-icon-btn" onClick={closeForm}><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="employee-form-grid">
          <div className="form-field">
            <label>Employee ID</label>
            <input 
              type="text" value={formData.employeeId}
              onChange={(e) => setFormData({...formData, employeeId: e.target.value})} 
              required disabled={!!editData} 
            />
          </div>

          <div className="form-field">
            <label>Full Name</label>
            <input 
              type="text" value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})} 
              required 
            />
          </div>

          <div className="form-field">
            <label>Email Address</label>
            <input 
              type="email" value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              required 
            />
          </div>

          <div className="form-field">
            <label>Joining Date</label>
            <input 
              type="date" value={formData.joiningDate}
              onChange={(e) => setFormData({...formData, joiningDate: e.target.value})} 
              required 
            />
          </div>

          <div className="form-field">
            <label>{editData ? "New Password (Leave blank to keep current)" : "Initial Password"}</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              required={!editData}
            />
          </div>

          <div className="form-field">
            <label>Department</label>
            <select value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} required>
              <option value="">Select</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          <div className="form-field">
            <label>Monthly Salary</label>
            <input 
              type="number" value={formData.salary}
              onChange={(e) => setFormData({...formData, salary: e.target.value})} 
              required 
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={closeForm}>Cancel</button>
            <button type="submit" className="save-btn">{editData ? "Update Changes" : "Create Employee"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;