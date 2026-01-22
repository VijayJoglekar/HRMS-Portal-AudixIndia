# HRMS Portal - AudixIndia Technical Assessment

[cite_start]A full-stack Human Resource Management System built with the MERN (MongoDB, Express, React, Node) stack[cite: 8, 11, 12]. [cite_start]This application was developed for the MERN Stack Intern evaluation at AudixIndia.in, focusing on secure role-based access control and organizational management[cite: 3, 15, 16].

## 📺 Project Preview & Demo
Watch the full project walkthrough and live demo here: 
**[MERN HRMS Demo - Vijay Joglekar](https://youtu.be/M6IDRD2BvZE)**

---

## 🚀 Features
* [cite_start]**Role-Based Access Control (RBAC):** Distinct dashboards and permissions for **Admin** and **Employee** roles[cite: 17, 25, 70].
* [cite_start]**Admin Module:** Complete Employee management lifecycle including Add, Edit, View, and Deactivate (CRUD) [cite: 31-36].
* [cite_start]**Attendance Management:** Daily attendance marking for employees with backend logic to prevent duplicate entries for the same day[cite: 48, 54].
* [cite_start]**Leave Workflow:** Employees can apply for leaves while Admins possess the authority to Approve or Reject requests[cite: 57, 62].
* [cite_start]**Dashboard Stats (Bonus):** Real-time data visualization of Total Staff and Today's Attendance metrics [cite: 85-87].

---

## 🛠 Tech Stack
* [cite_start]**Frontend:** React.js, Lucide-React (Icons), CSS3[cite: 11, 68].
* [cite_start]**Backend:** Node.js, Express.js (RESTful Architecture)[cite: 11, 75].
* [cite_start]**Database:** MongoDB Atlas (Logical schema design)[cite: 12, 79].
* [cite_start]**Authentication:** JWT (JSON Web Token) with password encryption[cite: 13, 24, 28].

---

## [cite_start]📋 API Endpoints [cite: 95]
### Authentication
- [cite_start]`POST /api/auth/login`: User authentication and JWT generation[cite: 23, 24].

### Employee Management (Admin Only)
- [cite_start]`GET /api/employees`: Fetch all employee records[cite: 36].
- [cite_start]`POST /api/employees`: Create a new employee profile[cite: 33].
- [cite_start]`PUT /api/employees/:id`: Update specific employee details[cite: 34].
- [cite_start]`PUT /api/employees/:id/deactivate`: Update employee status to 'Inactive'[cite: 35, 45].

### Attendance & Leaves
- [cite_start]`POST /api/attendance`: Mark daily attendance status[cite: 48].
- [cite_start]`GET /api/leaves`: View pending leave requests (Admin)[cite: 61].
- [cite_start]`PUT /api/leaves/:id`: Approve or Reject specific leave requests (Admin)[cite: 62].

---

## [cite_start]⚙️ Setup Instructions [cite: 94]
1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/VijayJoglekar/HRMS-Portal-AudixIndia.git](https://github.com/VijayJoglekar/HRMS-Portal-AudixIndia.git)
