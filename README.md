# HRMS Portal - AudixIndia Technical Assessment

A full-stack Human Resource Management System built with the MERN (MongoDB, Express, React, Node) stack. Developed for the MERN Stack Intern evaluation at AudixIndia.in.

## 📺 Project Walkthrough & Demo
[![HRMS Project Preview](https://img.youtube.com/vi/M6IDRD2BvZE/maxresdefault.jpg)](https://youtu.be/M6IDRD2BvZE "Click to watch the Demo")
*Click the image above to watch the live system demonstration.*

---

## 🚀 Features
* **Role-Based Access Control (RBAC):** Distinct dashboards and permissions for **Admin** and **Employee** roles.
* **Admin Module:** Complete Employee management lifecycle including Add, Edit, View, and Deactivate (CRUD).
* **Attendance Management:** Daily attendance marking for employees with backend logic to prevent duplicate entries for the same day.
* **Leave Workflow:** Employees can apply for leaves while Admins possess the authority to Approve or Reject requests.
* **Dashboard Stats (Bonus):** Real-time data visualization of Total Staff and Today's Attendance metrics.

---

## 🛠 Tech Stack
* **Frontend:** React.js, Lucide-React (Icons), CSS3.
* **Backend:** Node.js, Express.js (RESTful Architecture).
* **Database:** MongoDB Atlas (Logical schema design).
* **Authentication:** JWT (JSON Web Token) with password encryption.

---

## 📋 API Endpoints
### Authentication
- `POST /api/auth/login`: User authentication and JWT generation.

### Employee Management (Admin Only)
- `GET /api/employees`: Fetch all employee records.
- `POST /api/employees`: Create a new employee profile.
- `PUT /api/employees/:id`: Update specific employee details.
- `PUT /api/employees/:id/deactivate`: Update employee status to 'Inactive'.

### Attendance & Leaves
- `POST /api/attendance`: Mark daily attendance status.
- `GET /api/leaves`: View pending leave requests (Admin).
- `PUT /api/leaves/:id`: Approve or Reject specific leave requests (Admin).

---

## ⚙️ Setup Instructions
1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/VijayJoglekar/HRMS-Portal-AudixIndia.git](https://github.com/VijayJoglekar/HRMS-Portal-AudixIndia.git)
