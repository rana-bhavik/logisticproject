# Project Documentation

## Cover Page

**Project Title:** Logistis - Global Logistics Management System

**Submitted By:**
1. Rana Shubham — Group Leader
2. Rana Shahil
3. Rana Bhavik

**Course:** [Information not available in the provided project files.]
**College/University:** [Information not available in the provided project files.]
**Academic Year:** [Information not available in the provided project files.]

---

# Chapter 1 — Introduction

The logistics and supply chain industry forms the backbone of global trade. However, managing fleets, shipments, and warehouses involves complex coordination that is often prone to human error and delays. The "Logistis" project is a comprehensive logistics management system designed to streamline these operations. 

The purpose of this project is to provide an integrated platform where administrators, dispatchers, warehouse managers, drivers, and corporate clients can interact seamlessly. By bringing all logistics operations into a single digital ecosystem, the system aims to improve efficiency, provide real-time tracking, optimize routes using Artificial Intelligence, and enhance overall transparency for clients. 

# Chapter 2 — Problem Statement

In traditional logistics environments, data is often siloed across different departments. Manual systems and fragmented software tools lead to miscommunication between dispatchers and drivers, inaccurate estimated times of arrival (ETAs), and inefficient routing. 

The existing problem is that when a client places an order for a shipment, tracking that shipment across multiple transit points (warehouses, sea ports, highways) requires constant manual updates. Furthermore, without intelligent routing, fleets consume excess fuel and face unexpected delays due to traffic and weather conditions. The proposed "Logistis" system solves this by unifying data into a central database and providing role-specific dashboards that update in real-time, augmented by AI tools to predict delays before they occur.

# Chapter 3 — Objectives

The main objectives of the Logistis project are to:
1. Develop an easy-to-use, unified dashboard for different user roles (Super Admin, Company Admin, Dispatcher, Warehouse Manager, Driver).
2. Automate the tracking and management of shipments and orders.
3. Provide secure, role-based data access and user authentication using JWT.
4. Implement AI functionality to predict accurate ETAs based on distance, transport mode, weather, and traffic.
5. Provide a responsive, real-time frontend interface that interacts smoothly with the backend database.

# Chapter 4 — Existing System

Traditionally, logistics management relies on a combination of spreadsheets, manual data entry, phone calls to drivers, and disconnected tracking software. 
The limitations of this existing method include:
- High margin for human error during data entry.
- Lack of real-time visibility for clients waiting for their shipments.
- Sub-optimal route planning relying solely on human intuition.
- Difficulty in auditing logs and tracking historical performance.
Because of these disadvantages, there is a strong need for an automated, centralized, and intelligent system like Logistis.

# Chapter 5 — Proposed System

The proposed system is a full-stack web application with the following major features:
- **Role-Based Portals:** Dedicated interfaces for Admin, Customer, and Driver.
- **Frontend Architecture:** Built with React, Vite, and Tailwind CSS for a modern, responsive user experience.
- **Backend Architecture:** Built on Node.js and Express to handle RESTful APIs.
- **Database:** MongoDB is used to store unstructured data for Users, Companies, Orders, and Shipments flexibly.
- **Authentication:** Secure login and registration using JSON Web Tokens (JWT).
- **AI Center:** An integrated AI module that simulates predictive ETAs and optimizes delivery routes.
- **Admin Functionality:** Ability to approve pending users, manage fleets, oversee warehouse inventory, and review financial analytics.

# Chapter 6 — Technology Used

| Technology | Purpose |
| --- | --- |
| React | Frontend interface and component rendering |
| JavaScript / TypeScript | Frontend logic and backend server scripting |
| Tailwind CSS | UI styling and responsive design |
| Node.js | Backend runtime environment |
| Express.js | Backend server framework and API routing |
| MongoDB | Database storage |
| Mongoose | Database object modeling and interaction |
| Socket.io | Real-time communication |
| JWT (JSON Web Token) | User authentication and session security |

# Chapter 7 — System Requirements

### Hardware Requirements
- **Processor:** Intel Core i3 / AMD Ryzen 3 or higher
- **RAM:** 4GB minimum (8GB recommended for smooth development server running)
- **Storage:** 1GB of free space

### Software Requirements
- **Operating System:** Windows 10/11, macOS, or Linux
- **Browser:** Google Chrome, Mozilla Firefox, or Microsoft Edge
- **Development Tools:** VS Code
- **Environment:** Node.js (v18+)
- **Database:** MongoDB locally installed or MongoDB Atlas cloud

# Chapter 8 — System Architecture

The project follows a standard MERN-like Client-Server architecture.

**User Interaction Flow:**
User  
↓  
React Frontend (Vite)  
↓  
Axios API Request (`/api/...`)  
↓  
Express.js Backend Controller  
↓  
Mongoose Model  
↓  
MongoDB Database  
↓  
JSON Response back to Frontend

**AI Module Flow:**
User inputs route details  
↓  
Frontend AI Center Component  
↓  
Backend AI Route (`/api/ai/predict-eta`)  
↓  
Processing/Calculation Logic  
↓  
Response with optimal route & ETA  
↓  
Frontend Display

# Chapter 9 — Project Modules

### 1. Authentication & User Management Module
- **Purpose:** To manage who can access the system and what they can see.
- **Functionality:** Registration, login, role assignment (Admin, Driver, etc.), and approving pending registrations.
- **Technologies:** React, Node.js, JWT, MongoDB.
- **Responsible Members:** Rana Shubham (Backend APIs), Rana Bhavik (Frontend UI).

### 2. Admin Dashboard & Operations Module
- **Purpose:** To provide a central command center for Super Admins.
- **Functionality:** Viewing analytics, managing fleet vehicles, dispatching drivers, managing warehouse inventory, and viewing audit logs.
- **Technologies:** React (lucide-react icons), Express.js, MongoDB.
- **Responsible Members:** Rana Shahil (Backend APIs & DB Operations), Rana Bhavik (Frontend components).

### 3. Customer Portal Module
- **Purpose:** To allow clients to view their active shipments.
- **Functionality:** Customer dashboard, viewing orders, submitting support tickets, viewing company profile.
- **Technologies:** React, Express, MongoDB.
- **Responsible Members:** Rana Bhavik (Frontend), Rana Shahil (Backend).

### 4. AI Center Module
- **Purpose:** To optimize logistics routing and predict delays.
- **Functionality:** Calculates ETAs based on weather/traffic parameters and optimizes multi-stop routes.
- **Technologies:** React state management, Node.js processing logic.
- **Responsible Member:** Rana Bhavik.

# Chapter 10 — Frontend Module

**Maintained by: Rana Bhavik**

The frontend of Logistis is built as a Single Page Application (SPA) using React and Vite. 
- **Routing:** Handled via `react-router-dom`. The application is divided into `AuthLayout`, `AdminLayout`, and `CustomerLayout` to ensure users only see navigation links relevant to their role.
- **State Management:** Handled natively using React Hooks (`useState`, `useEffect`).
- **UI/UX:** Tailwind CSS is used extensively to create a dark, modern, "glassmorphism" aesthetic. Icons are provided by `lucide-react`.
- **API Integration:** A centralized API service (`src/services/api.ts`) is used to manage all `fetch` calls to the backend, attaching the JWT token automatically to protected routes.
- **Validation:** Forms (like login and registration) use basic HTML and React-state validation to prevent empty submissions before reaching the server.

# Chapter 11 — Backend Module

The backend operations are handled via a Node.js/Express server and divided between the backend team members.

### Rana Shubham (Group Leader)
- **Authentication & Security:** Created the JWT authentication middleware (`authenticate`) that parses the `Authorization` header and validates the token signature before allowing access to protected routes.
- **Server Architecture:** Set up the main `server.ts` file, configuring CORS, Helmet, and environmental variables.

### Rana Shahil
- **Entity APIs:** Implemented the CRUD routes for `orders.ts`, `fleet.ts`, `warehouse.ts`, and `shipments.ts`.
- **Database Operations:** Wrote the Mongoose queries (e.g., `Order.find()`, `Shipment.updateOne()`) to retrieve and update data securely based on the requests coming from the frontend.

# Chapter 12 — Database Module

The system uses MongoDB, a NoSQL database, which is ideal for storing dynamic logistics documents.

**Responsibilities:**
- **Rana Shubham:** Designed the initial schema architecture and established relationships between collections.
- **Rana Shahil:** Implemented the Mongoose models and executed database testing.

**Database Structure:**
| Collection/Model | Purpose | Important Fields | Responsible Member |
| --- | --- | --- | --- |
| User | Stores credentials & roles | email, password, role, status | Rana Shubham |
| Company | Stores client business details | name, industry, plan | Rana Shubham |
| Order | Stores client shipment requests | trackingNumber, status, origin | Rana Shahil |
| Shipment | Tracks live transit data | orderId, currentLocation | Rana Shahil |

# Chapter 13 — AI Module

**Maintained by: Rana Bhavik**

The AI Module (located in the frontend at `AiCenter.tsx` and backed by the `ai.ts` API route) was added to modernize the logistics process.
- **Purpose:** To shift from manual guessing of arrival times to data-driven predictions.
- **Workflow:** The user selects a transport mode (Truck, Air, Sea), inputs distance, weather severity, and traffic factors via range sliders on the frontend.
- **Processing:** When the user clicks "Simulate", the frontend sends these parameters to the backend. The backend uses algorithmic logic to calculate estimated travel hours, CO2 emissions, and a route confidence percentage.
- **Integration:** The results are sent back as JSON and displayed dynamically in a sleek results card on the UI.
*(Note: This project utilizes internal algorithmic processing to simulate AI behavior for educational demonstration).*

# Chapter 14 — API Documentation

Below is a subset of the actual REST APIs implemented in the project:

| Method | Endpoint | Purpose | Responsible |
| --- | --- | --- | --- |
| POST | `/api/auth/login` | Authenticates a user and returns a JWT token | Rana Shubham |
| POST | `/api/auth/register` | Creates a new user with 'Pending' status | Rana Shubham |
| GET | `/api/users` | Fetches all users (protected by auth middleware) | Rana Shahil |
| POST | `/api/ai/predict-eta` | Submits route parameters for ETA calculation | Rana Bhavik |
| GET | `/api/orders` | Retrieves logistics orders from the database | Rana Shahil |

# Chapter 15 — Important Code Explanation

### 1. Backend Authentication Middleware (`auth.ts`)
```typescript
export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    console.error('[Auth Error] No token provided');
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
    req.user = decoded;
    next();
  } catch (error: any) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
```
**Explanation:** This code protects the server. When a request is made, it checks if a token exists in the header. If it does, it uses `jwt.verify` to decode it. If the token is valid, it allows the request to continue (`next()`); if not, it blocks it with a `401 Unauthorized` error.

### 2. Frontend User Filtering (`Users.tsx`)
```tsx
users
  .filter(user => user.status === 'Pending' || user.role === 'Super Admin' || user.role === 'Company Admin')
  .map((user) => (
  <tr key={user._id} className="hover:bg-white/[0.02] transition-colors">
```
**Explanation:** This simple React code filters the list of users fetched from the database. It ensures that the table only displays users who are 'Pending' approval, or high-level admins, keeping the UI clean and relevant for the person managing user access.

# Chapter 16 — User Flow

**User Registration Flow:**
User opens website → Clicks "Register" → Fills in details and selects role (e.g., Driver) → Submits form → Frontend sends POST request to `/api/auth/register` → Backend saves user with status 'Pending' → User waits for Admin approval.

# Chapter 17 — Admin Flow

**Admin Approval Flow:**
Super Admin Logs in → Receives JWT token → Redirected to Admin Dashboard → Navigates to "Users & Roles" → Frontend sends GET request to `/api/users` with Token → Backend verifies Token → Returns pending users → Admin clicks "Approve" → User status updates to 'Active'.

# Chapter 18 — AI Flow

**Dispatcher Route Optimization Flow:**
Dispatcher navigates to AI Center → Enters multiple delivery stops (e.g., Munich, Vienna) → Clicks "Optimize Route" → Frontend sends stops array to `/api/ai/optimize-route` → Backend processes logic → Returns reordered optimized path → Frontend updates the UI visualization.

# Chapter 19 — Testing

| Test Case ID | Module | Test Scenario | Input | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| TC-01 | Auth | Login with incorrect password | Wrong credentials | Deny access, show error message | Access denied, error shown | Pass |
| TC-02 | Auth | Login with correct password | Correct credentials | Generate JWT, redirect to portal | JWT generated, redirected | Pass |
| TC-03 | UI | Click "Team & Users" without token | No token | Redirect to Login page | Redirected to Login | Pass |
| TC-04 | AI | Predict ETA with High Traffic | Traffic slider = 2.0 | Increased estimated travel time | Travel time increased | Pass |

# Chapter 20 — Security

The following security mechanisms were implemented:
- **JWT (JSON Web Tokens):** Used to maintain stateless, secure sessions.
- **Password Hashing:** Passwords are not saved as plain text; they are secured using `bcrypt` before being stored in the database.
- **Route Protection:** React Router is used alongside backend middleware to ensure users cannot view pages or access data outside their authorized role.
- **CORS:** Cross-Origin Resource Sharing is enabled on the backend to only accept requests from authorized frontend origins.

# Chapter 21 — Error Handling

- **Frontend Errors:** Uses `try...catch` blocks during API calls. If an error occurs (e.g., network failure or 401 Unauthorized), the UI displays a Javascript alert or on-screen text to notify the user seamlessly.
- **Backend Errors:** Controllers use `try...catch` blocks to prevent the server from crashing. Database query failures respond with a `500 Internal Server Error` and a descriptive JSON message.

# Chapter 22 — Screenshots / UI Documentation

*(Information not available in the provided project files — screenshots must be attached manually by the students before final submission).*
- **Screen 1: Login Page:** Features a 1-Click Role Switcher and standard email/password inputs.
- **Screen 2: Admin Dashboard:** Displays high-level statistics, active orders, and quick actions.
- **Screen 3: AI Center:** Features input sliders for distance and weather, alongside a predictive output card.

# Chapter 23 — Team Member Contribution

| Member | Area | Modules/Features | Main Work |
| --- | --- | --- | --- |
| Rana Shubham | Backend + DB + Leadership | Auth API, DB schemas, server.ts | Architecture design, JWT implementation, coordination |
| Rana Shahil | Backend + DB | Entity APIs (Orders, Fleet), DB Ops | CRUD operations, backend endpoints, route logic |
| Rana Bhavik | Frontend + AI | UI/UX, AI Center, API Integration | React components, Tailwind styling, AI simulation |

# Chapter 24 — Individual Responsibilities

### Rana Shubham
As the group leader, I was responsible for coordinating the project and designing the backend foundation. I set up the initial Node.js and Express server environment, configured the database connections using Mongoose, and implemented the core authentication system using JSON Web Tokens (JWT). I also ensured that the backend securely communicated with the frontend.

### Rana Shahil
My main responsibility was to flesh out the backend features. I developed the various API routes required for the platform, including the Fleet, Warehouse, and Order management routes. I wrote the Mongoose queries to ensure data could be created, read, updated, and deleted reliably by the system users.

### Rana Bhavik
I focused on bringing the project to life visually. I built the entire frontend using React and Vite, utilizing Tailwind CSS to create a modern, dark-themed dashboard. I also integrated the frontend with the backend APIs via Axios/Fetch, and conceptualized and implemented the AI Center module where users can simulate ETAs.

# Chapter 25 — Challenges Faced

1. **Authentication Token Bugs:** We faced a major issue where the frontend was getting stuck in an infinite redirect loop because a mock token was being saved to local storage, which the live backend continually rejected as unauthorized.
2. **Environment Variable Loading:** We encountered a cryptographic bug where the JWT token was signed with a fallback secret instead of the `.env` secret because the `auth.ts` routes were imported before `dotenv.config()` was called.

# Chapter 26 — Solutions Implemented

**Problem:** Infinite redirect loop upon login.
**Investigation:** We realized the frontend error-handling was retaining a corrupted token in local storage instead of clearing it upon receiving a 401 error.
**Solution:** We updated the `Users.tsx` fetch catch-block to explicitly execute `localStorage.removeItem('token')` if the API returns a 401 or 403 status.
**Result:** The frontend correctly wipes broken sessions and redirects the user safely to the login screen, resolving the loop.

# Chapter 27 — Advantages

- Centralized management of global logistics operations.
- Beautiful, highly responsive user interface that is easy to navigate.
- Role-based security prevents unauthorized data manipulation.
- AI-driven estimations save dispatchers time when planning routes.

# Chapter 28 — Limitations

- **Dependency on Internet:** As a web-based application, it cannot operate without an active internet connection.
- **Simulated AI:** The current AI module utilizes internal algorithms rather than calling an external machine learning model, limiting its real-world predictive accuracy.
- **Limited Real-Time GPS:** The fleet tracking relies on simulated data updates rather than live hardware telemetry.

# Chapter 29 — Future Scope

- **Frontend:** Implement map integrations (like Google Maps API) for visual live-tracking of vehicles.
- **Backend:** Add robust automated email and SMS notification systems for when shipments are delayed.
- **AI Improvements:** Integrate an actual Machine Learning model via Python APIs to predict delays based on historical logistics datasets.

# Chapter 30 — Conclusion

In conclusion, the "Logistis" project successfully demonstrates a modern solution to logistics management. By utilizing React for a dynamic frontend, Node.js for a robust backend, and MongoDB for flexible data storage, the team was able to create a highly functional prototype. 

Through this project, the team learned how to coordinate module development, handle secure JWT authentication, build responsive interfaces, and debug complex integration issues. The division of labor allowed us to explore different domains of web development effectively, resulting in a cohesive system that meets the proposed objectives.

# Chapter 31 — References

1. React Documentation: https://react.dev/
2. Node.js Documentation: https://nodejs.org/en/docs/
3. Express.js Routing Guide: https://expressjs.com/en/guide/routing.html
4. Mongoose Documentation: https://mongoosejs.com/docs/
5. Tailwind CSS Utility Classes: https://tailwindcss.com/docs
