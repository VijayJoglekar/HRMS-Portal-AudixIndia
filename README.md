# HRMS Portal - AudixIndia Technical Assessment

A full-stack MERN application developed for the AudixIndia.in Intern evaluation. This system provides a Basic Human Resource Management System with secure, role-based access for Admins and Employees.

## 🚀 Features
* [cite_start]**Role-Based Access Control:** Separate dashboards and permissions for Admins and Employees[cite: 16, 25].
* [cite_start]**Admin Module:** Complete Employee CRUD (Add, Edit, View, Deactivate) [cite: 31-36].
* [cite_start]**Attendance Tracking:** Mark daily attendance with duplicate prevention [cite: 46-54].
* [cite_start]**Leave Management:** Employee leave application with Admin approval/rejection workflow [cite: 55-66].
* [cite_start]**Dashboard Stats (Bonus):** Real-time visualization of total staff and today's attendance [cite: 85-87].

## 🛠 Tech Stack
* [cite_start]**Frontend:** React.js, Lucide-React[cite: 11].
* [cite_start]**Backend:** Node.js, Express.js[cite: 11].
* [cite_start]**Database:** MongoDB Atlas[cite: 12].
* [cite_start]**Security:** JWT-based authentication and password encryption[cite: 13, 24, 28].

## [cite_start]📋 API Endpoints [cite: 95]
### Auth
- `POST /api/auth/login`: User authentication and JWT generation.

### Admin Only
- `GET /api/employees`: Fetch all employee records.
- `POST /api/employees`: Create new employee profile.
- `PUT /api/employees/:id`: Update employee details.
- `PUT /api/employees/:id/deactivate`: Set status to Inactive.

### Attendance & Leaves
- `POST /api/attendance`: Mark daily status.
- `GET /api/leaves`: View pending requests.
- `PUT /api/leaves/:id`: Approve/Reject leave.

## [cite_start]⚙️ Setup Instructions [cite: 94]
1. **Clone Repo:** `git clone <your-repo-link>`
2. **Backend:** - `cd hrmsbackend`
   - `npm install`
   - Create `.env` with `PORT`, `MONGO_URI`, and `JWT_SECRET`.
   - `npm start`
3. **Frontend:**
   - `cd hrmsfrontend`
   - `npm install`
   - `npm run dev`

## [cite_start]🔐 Role-Based Access Explanation [cite: 96]
- **Admin:** Can manage all employee data, view organization-wide attendance, and process leave requests.
- **Employee:** Can only mark their own attendance, view their own history, and apply for leaves.