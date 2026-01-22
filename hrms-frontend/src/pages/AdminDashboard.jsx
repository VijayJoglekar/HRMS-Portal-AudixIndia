import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import EmployeeForm from "../components/EmployeeForm";
import AttendanceView from "../components/AttendanceView";
import LeaveRequestView from "../components/LeaveRequestView";
import { UserX, Edit, Users, CalendarCheck, FileText, Plus, RefreshCw } from "lucide-react"; 
import "../styles/admin.css";

function AdminDashboard() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [leaveCount, setLeaveCount] = useState(0); 
  const [showForm, setShowForm] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchData = async () => {
    setIsSyncing(true);
    try {
      const [empRes, attRes, leaveRes] = await Promise.all([
        api.get("/employees?includeInactive=true"), 
        api.get("/attendance"),
        api.get("/leaves") 
      ]);
      setEmployees(empRes.data);
      setAttendance(attRes.data);
      const pending = leaveRes.data.filter(l => l.status === "Pending").length;
      setLeaveCount(pending);
    } catch (err) {
      console.error("Error fetching dashboard data", err);
    } finally {
      // Small timeout so the user sees the spin effect
      setTimeout(() => setIsSyncing(false), 500);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDeactivate = async (id) => {
    if (window.confirm("Are you sure you want to deactivate this employee?")) {
      try {
        await api.put(`/employees/${id}/deactivate`); 
        fetchData(); 
      } catch (err) {
        alert(err.response?.data?.message || "Action failed");
      }
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar setView={setActiveView} activeView={activeView} />
      
      <main className="admin-main">
        <header className="dashboard-header">
          <div className="header-info">
            <h1 className="header-title">{activeView.charAt(0).toUpperCase() + activeView.slice(1)} Control</h1>
            <p className="header-subtitle">Manage your organization's operations</p>
          </div>

          <div className="header-actions">
            {/* NEW: Professional Refresh/Sync Button */}
            <button 
              className={`icon-btn refresh-sync ${isSyncing ? 'spinning' : ''}`} 
              onClick={fetchData} 
              title="Sync Data"
            >
              <RefreshCw size={20} />
            </button>

            {(activeView === "dashboard" || activeView === "employees") && (
              <button className="glass-btn primary" onClick={() => setShowForm(true)}>
                <Plus size={18} /> Add Employee
              </button>
            )}
          </div>
        </header>

        {showForm && (
          <EmployeeForm 
            closeForm={() => {setShowForm(false); setSelectedEmployee(null);}} 
            refreshData={fetchData} 
            editData={selectedEmployee} 
          />
        )}

        <section className="view-content">
          {activeView === "dashboard" && (
            <div className="dashboard-content-wrapper">
              <div className="main-stats-column">
                <div className="stats-grid">
                  <div className="stat-card blue">
                    <Users className="stat-icon" />
                    <div className="stat-data">
                      <h3>Total Staff</h3>
                      <p>{employees.length}</p>
                    </div>
                  </div>
                  <div className="stat-card green">
                    <CalendarCheck className="stat-icon" />
                    <div className="stat-data">
                      <h3>Today's Present</h3>
                      <p>{attendance.filter(a => a.date === new Date().toISOString().split('T')[0]).length}</p>
                    </div>
                  </div>
                  <div className="stat-card orange">
                    <FileText className="stat-icon" />
                    <div className="stat-data">
                      <h3>Leave Requests</h3>
                      <p>{leaveCount} Pending</p> 
                    </div>
                  </div>
                </div>

                <div className="insights-grid">
                  <div className="insight-card chart-placeholder">
                    <div className="card-header-sm">
                      <h3>Attendance Trend</h3>
                      <span className="badge-small">Last 7 Days</span>
                    </div>
                    <div className="visual-area">
                      <div className="bar-container">
                        {[40, 70, 45, 90, 65, 80, 95].map((h, i) => (
                          <div key={i} className="bar" style={{height: `${h}%`}}></div>
                        ))}
                      </div>
                      <div className="bar-labels"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
                    </div>
                  </div>

                  <div className="insight-card distribution">
                    <div className="card-header-sm">
                      <h3>Department Split</h3>
                    </div>
                    <div className="dept-list">
                      <div className="dept-item"><span>Engineering</span><div className="progress-bg"><div className="progress-fill" style={{width: '60%'}}></div></div></div>
                      <div className="dept-item"><span>Sales</span><div className="progress-bg"><div className="progress-fill" style={{width: '25%'}}></div></div></div>
                      <div className="dept-item"><span>HR</span><div className="progress-bg"><div className="progress-fill" style={{width: '15%'}}></div></div></div>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="activity-sidebar">
                <div className="activity-card">
                  <h3>Recent Activity</h3>
                  <div className="activity-list">
                    <div className="activity-item">
                      <div className="dot blue"></div>
                      <div className="activity-info">
                        <p><strong>System</strong> updated payroll</p>
                        <span>2 hours ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="dot green"></div>
                      <div className="activity-info">
                        <p><strong>Attendance</strong> sync complete</p>
                        <span>4 hours ago</span>
                      </div>
                    </div>
                  </div>
                  <button className="view-all-link">View Audit Log</button>
                </div>
              </aside>
            </div>
          )}

          {activeView === "employees" && (
            <div className="glass-table-container">
              <table className="aesthetic-table">
                <thead>
                  <tr><th>ID</th><th>Name</th><th>Dept</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp._id} className={emp.status === 'Inactive' ? 'row-inactive' : ''}>
                      <td><strong>{emp.employeeId}</strong></td>
                      <td>{emp.fullName}</td>
                      <td>{emp.department}</td>
                      <td><span className={`status-pill ${emp.status.toLowerCase()}`}>{emp.status}</span></td>
                      <td className="actions-cell">
                        <button className="icon-btn edit" onClick={() => {setSelectedEmployee(emp); setShowForm(true);}}><Edit size={16} /></button>
                        {emp.status === 'Active' && (
                          <button className="icon-btn delete" onClick={() => handleDeactivate(emp._id)}><UserX size={16} /></button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeView === "attendance" && <AttendanceView attendance={attendance} />}
          {activeView === "leaves" && <LeaveRequestView refreshStats={fetchData} />}
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;