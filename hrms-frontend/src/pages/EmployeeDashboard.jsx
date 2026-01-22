import { useState, useEffect } from "react";
import api from "../services/api";
import { LogOut, Send, Clock, ListChecks, Award, Calendar } from "lucide-react";
import "../styles/employee.css";

import loginImg from "../assets/Login_banner.jpg"; 

function EmployeeDashboard() {
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || {});
  const [leaveData, setLeaveData] = useState({ startDate: "", endDate: "", reason: "" });
  const [attendanceStatus, setAttendanceStatus] = useState("Not Marked");
  const [myLeaves, setMyLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const [attRes, leaveRes] = await Promise.all([
        api.get("/attendance/my-attendance"),
        api.get("/leaves/my-requests")
      ]);

      if (Array.isArray(attRes.data)) {
        const alreadyMarked = attRes.data.some(record => record.date === today);
        if (alreadyMarked) setAttendanceStatus("Present");
      }
      setMyLeaves(leaveRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDashboardData(); }, []);

  const applyLeave = async (e) => {
    e.preventDefault();
    try {
      await api.post("/leaves/apply", leaveData);
      alert("Leave application submitted!");
      setLeaveData({ startDate: "", endDate: "", reason: "" });
      fetchDashboardData();
    } catch (err) {
      alert("Failed to apply for leave");
    }
  };

  const markAttendance = async () => {
    try {
      setLoading(true);
      await api.post("/attendance", { status: "Present" });
      setAttendanceStatus("Present");
      alert("Attendance marked!");
    } catch (err) {
      alert(err.response?.data?.message || "Error marking attendance");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (loading && attendanceStatus === "Not Marked") {
    return <div className="loading-screen">Verifying session...</div>;
  }

  return (
    <div className="emp-dashboard">
      <nav className="emp-nav">
        <div className="brand">HRMS <span>Portal</span></div>
        <div className="user-info">
          <span>Welcome, <strong>{user.fullName || user.name}</strong></span>
          <button onClick={handleLogout} className="logout-icon-btn"><LogOut size={18}/></button>
        </div>
      </nav>

      <main className="emp-content">
        <div className="emp-main-grid">
          
          {/* LEFT & MIDDLE COLUMN: MAIN CONTENT */}
          <div className="emp-left-section">
            <div className="top-row-grid">
               {/* Attendance Section */}
              <section className="emp-card attendance-card">
                <div className="card-header"><Clock className="icon-indigo" /><h3>Attendance</h3></div>
                <div className="card-body">
                  <p className="date-display">{new Date().toDateString()}</p>
                  <div className={`status-badge ${attendanceStatus.toLowerCase()}`}>Status: {attendanceStatus}</div>
                  <button className="primary-btn full-btn" onClick={markAttendance} disabled={attendanceStatus === "Present"}>
                    {attendanceStatus === "Present" ? "Already Marked" : "Mark Present"}
                  </button>
                </div>
              </section>

              {/* Leave Application Section */}
              <section className="emp-card leave-card">
                <div className="card-header"><Send className="icon-indigo" /><h3>Apply for Leave</h3></div>
                <form onSubmit={applyLeave} className="leave-form">
                  <div className="form-row">
                    <div className="form-group"><label>From</label><input type="date" required value={leaveData.startDate} onChange={(e) => setLeaveData({...leaveData, startDate: e.target.value})} /></div>
                    <div className="form-group"><label>To</label><input type="date" required value={leaveData.endDate} onChange={(e) => setLeaveData({...leaveData, endDate: e.target.value})} /></div>
                  </div>
                  <div className="form-group"><label>Reason</label><textarea required value={leaveData.reason} onChange={(e) => setLeaveData({...leaveData, reason: e.target.value})}></textarea></div>
                  <button type="submit" className="secondary-btn full-btn">Submit Application</button>
                </form>
              </section>
            </div>

            {/* Leave Status History Section */}
            <section className="emp-card history-card full-width">
              <div className="card-header"><ListChecks className="icon-indigo" /><h3>My Leave Status</h3></div>
              <div className="table-responsive">
                <table className="history-table">
                  <thead>
                    <tr><th>Dates</th><th>Reason</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {myLeaves.length > 0 ? myLeaves.map((l) => (
                      <tr key={l._id}>
                        <td>{l.startDate} to {l.endDate}</td>
                        <td>{l.reason}</td>
                        <td>
                          <span className={`status-pill ${l.status.toLowerCase()}`}>
                            {l.status}
                          </span>
                        </td>
                      </tr>
                    )) : <tr><td colSpan="3" style={{textAlign:'center'}}>No applications yet</td></tr>}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* NEW RIGHT SIDEBAR: FILLING THE EMPTY SPACE */}
          <aside className="emp-right-sidebar">
            <div className="welcome-banner-card">
               <img src={loginImg} alt="Workspace Banner" className="banner-img" />
               <div className="banner-overlay">
                  <h4>Employee Portal</h4>
                  <p>Have a great work day!</p>
               </div>
            </div>

            <div className="emp-card info-card">
               <div className="card-header"><Award className="icon-indigo" size={18}/> <h3>Quick Links</h3></div>
               <div className="links-list">
                  <div className="link-item"><Calendar size={16}/> <span>Holiday Calendar</span></div>
                  <div className="link-item"><Award size={16}/> <span>Company Policies</span></div>
               </div>
            </div>
            
            <div className="emp-card quote-card">
               <p>"Focus on being productive instead of busy."</p>
               <small>— Team HRMS</small>
            </div>
          </aside>
          
        </div>
      </main>
    </div>
  );
}

export default EmployeeDashboard;