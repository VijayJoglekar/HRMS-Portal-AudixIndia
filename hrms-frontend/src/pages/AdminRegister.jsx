import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User } from "lucide-react";
import "../styles/auth.css";

function AdminRegister() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "admin" });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", formData);
      alert("Admin registered successfully! Please login.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page-root">
      <div className="split-container">
        {/* LEFT PANEL - IMAGE (Matching your CSS) */}
        <div className="auth-image-panel">
          <img 
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Office" 
          />
          <div className="image-overlay">
            <h2>Join HRMS PRO</h2>
            <p>Empower your organization with our comprehensive management tools. Setup your administrator account in seconds.</p>
          </div>
        </div>

        {/* RIGHT PANEL - FORM */}
        <div className="auth-form-panel">
          <div className="auth-content-wrapper">
            <div className="auth-brand">
              <div className="brand-logo">H</div>
              <h1>HRMS <span>PRO</span></h1>
            </div>

            <div className="auth-card-header">
              <h2>Admin Registration</h2>
              <p>Create your management credentials</p>
            </div>

            <form onSubmit={handleRegister}>
              <div className="input-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  required 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                />
              </div>

              <div className="input-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  placeholder="admin@company.com" 
                  required 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                />
              </div>

              <div className="input-group">
                <label>Password</label>
                <div className="password-input-wrapper">
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    required 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                  />
                </div>
              </div>

              <button type="submit" className="signin-submit-btn">
                Create Admin Account
              </button>
            </form>

            <div className="auth-card-footer">
              <p>Already have an account? <Link to="/">Login here</Link></p>
            </div>
            
            <div className="auth-footer-note">
              © 2026 HRMS PRO. ALL RIGHTS RESERVED.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;