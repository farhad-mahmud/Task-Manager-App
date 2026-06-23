# #️⃣ AnyTasks - Backend API

The backend server and API for the Task Manager application. It handles CRUD operations for tasks and routes them using session-based isolation.

---

# 🛠️ Tech Stack & Features

* **💻 Server Runtime:** Node.js
* **⚡ Framework:** Express.js
* **🐘 Database:** PostgreSQL (Hosted on Neon Serverless PostgreSQL)
* **🔌 Driver:** pg (node-postgres)
* **🛡️ Session-Based Scoping:** Checks for the `X-Session-ID` header in every request, restricting read, create, update, and delete actions exclusively to that session.

---

# ⚡ Getting Started & Running Locally

Follow these steps to run the backend API server locally.

## 📋 Prerequisites

Make sure you have Node.js installed on your machine.

## 🏃 Setup Steps
The backend is deployed on render.com
The databse is deployed on neon.com

### 1. Database Setup
Ensure you have a PostgreSQL database connection string (e.g., from Neon). The database should have a `tasks` table with the following schema:
```sql
CREATE TYPE task_status AS ENUM ('To Do', 'In Progress', 'Done');
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status task_status DEFAULT 'To Do',
  session_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
### 2. Backend setup 
```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file in the root of the backend directory and add your PostgreSQL connection string:
 DATABASE_URL=your_postgresql_connection_string
 PORT=5050

# Start the server (development mode with Nodemon auto-reload)
npm run dev
