import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, User, ShieldCheck } from "lucide-react"; 
import api from "../services/api";
import "../styles/auth.css";
import loginImg from "../assets/Login_banner.jpg"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee"); 
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = role === "admin" ? "/auth/login" : "/auth/employee/login";
      const res = await api.post(endpoint, { email, password });
      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("role", res.data.role);

      res.data.role === "admin" ? navigate("/admin") : navigate("/employee");
    } catch (err) {
      setError("Invalid credentials. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-root">
      <div className="split-container">
        <div className="auth-image-panel">
          <img src={loginImg} alt="HRMS Banner" />
          <div className="image-overlay">
            <h2>Streamline Your Workforce</h2>
            <p>Experience the all-in-one platform for modern HR management.</p>
          </div>
        </div>

        <div className="auth-form-panel">
          <div className="auth-content-wrapper">
            <div className="auth-brand">
              <div className="brand-logo">H</div>
              <h1>HRMS<span>Portal</span></h1>
            </div>

            <div className="auth-card">
              <div className="auth-card-header">
                <h2>Welcome Back</h2>
                <p>Please select your role and sign in.</p>
              </div>

              <div className="role-selector">
                <button 
                  type="button"
                  className={`role-btn ${role === "employee" ? "active" : ""}`}
                  onClick={() => setRole("employee")}
                >
                  <User size={18} /> Employee
                </button>
                <button 
                  type="button"
                  className={`role-btn ${role === "admin" ? "active" : ""}`}
                  onClick={() => setRole("admin")}
                >
                  <ShieldCheck size={18} /> Admin
                </button>
              </div>

              {error && <div className="error-message">{error}</div>}

              <form onSubmit={handleLogin} className="login-form">
                <div className="input-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group">
                  <div className="label-row">
                    <label>Password</label>
                  
                  </div>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button" 
                      className="eye-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="signin-submit-btn" disabled={loading}>
                  {loading ? "Verifying..." : `Sign In as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
                </button>
              </form>

              {/* NEW SIGNUP FOOTER */}
              <div className="auth-card-footer">
                <p>New Administrator? <Link to="/admin/register">Create an Admin Account</Link></p>
              </div>
            </div>

            <div className="auth-footer-note">
              © 2026 HRMS PORTAL. SECURE ACCESS ONLY.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;