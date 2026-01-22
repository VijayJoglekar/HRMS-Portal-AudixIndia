import { useEffect, useState } from "react";
import api from "../services/api";
import { CheckCircle, XCircle, Clock } from "lucide-react";

function LeaveRequestView({ refreshStats }) {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = async () => {
    try {
      const res = await api.get("/leaves");
    
      setLeaves(res.data.filter(l => l.status === "Pending"));
    } catch (err) {
      console.error("Error fetching leaves", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeaves(); }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/leaves/${id}`, { status });
    
      setLeaves(prev => prev.filter(leave => leave._id !== id));
     
      if(refreshStats) refreshStats(); 
      alert(`Leave ${status} successfully`);
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (loading) return <div className="p-4">Loading requests...</div>;

  return (
    <div className="table-card">
      <div className="card-header">
        <Clock size={20} className="icon-indigo" />
        <h3>Pending Leave Requests ({leaves.length})</h3>
      </div>
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr><th>Employee</th><th>Reason</th><th>Dates</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {leaves.length > 0 ? leaves.map((leave) => (
              <tr key={leave._id}>
                <td><strong>{leave.user?.fullName || "Employee"}</strong></td>
                <td>{leave.reason}</td>
                <td>{leave.startDate} to {leave.endDate}</td>
                <td className="action-cell">
                  <button onClick={() => handleStatusUpdate(leave._id, 'Approved')} className="approve-btn"><CheckCircle size={16} /> Approve</button>
                  <button onClick={() => handleStatusUpdate(leave._id, 'Rejected')} className="reject-btn"><XCircle size={16} /> Reject</button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="4" style={{textAlign: 'center', padding: '40px'}}>All requests processed!</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaveRequestView;