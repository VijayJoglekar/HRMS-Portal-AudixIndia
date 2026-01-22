import { useState } from "react";
import { Search, Calendar } from "lucide-react";

function AttendanceView({ attendance }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const filteredData = attendance.filter(log => {
    const nameMatch = log.user?.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const dateMatch = filterDate ? log.date === filterDate : true;
    return nameMatch && dateMatch;
  });

  return (
    <div className="table-card">
      <div className="filter-header">
        <div className="search-box">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search by name..." 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="date-box">
          <Calendar size={18} />
          <input 
            type="date" 
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
      </div>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((log) => (
              <tr key={log._id}>
                <td>{log.user?.fullName || 'Unknown'}</td>
                <td>{log.date}</td>
                <td>
                  <span className={`status-pill ${log.status.toLowerCase()}`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceView;