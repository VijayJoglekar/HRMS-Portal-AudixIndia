import { LayoutDashboard, Users, CalendarCheck, FileText, LogOut, X } from "lucide-react";
import "../styles/sidebar.css";

const handleLogout = () => {
  localStorage.clear();
  window.location.href = "/"; // Redirect to login
};
function Sidebar({ setView, activeView, isOpen, toggleSidebar }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard /> },
    { id: "employees", label: "Employees", icon: <Users /> },
    { id: "attendance", label: "Attendance", icon: <CalendarCheck /> },
    { id: "leaves", label: "Leave Requests", icon: <FileText /> },
  ];

  return (
    <>
      <div className={`sidebar-backdrop ${isOpen ? 'active' : ''}`} onClick={toggleSidebar}></div>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-top">
          <div className="brand">HRMS PRO</div>
          <button className="close-sidebar" onClick={toggleSidebar}><X /></button>
        </div>
        <nav className="nav-list">
          {menuItems.map(item => (
            <button 
              key={item.id}
              className={`nav-link ${activeView === item.id ? 'active' : ''}`}
              onClick={() => { setView(item.id); if(window.innerWidth < 768) toggleSidebar(); }}
            >
              {item.icon} <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
  <button className="logout-button" onClick={handleLogout}>
    <LogOut size={20}/> <span>Logout</span>
  </button>
</div>
      </aside>
    </>
  );
}
export default Sidebar;