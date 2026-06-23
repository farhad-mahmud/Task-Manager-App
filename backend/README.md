# ⚙️ AnyTasks - Backend API

The backend server and API for the Task Manager application. It handles CRUD operations for tasks and routes them using session-based isolation.

---

## 🛠️ Tech Stack & Features

* **💻 Server Runtime:** Node.js
* **⚡ Framework:** Express.js
* **🐘 Database:** PostgreSQL (Hosted on Neon Serverless PostgreSQL)
* **🔌 Driver:** pg (node-postgres)
* **🛡️ Session-Based Scoping:** Checks for the `X-Session-ID` header in every request, restricting read, create, update, and delete actions exclusively to that session.

---

## ⚡ Getting Started & Running Locally

Follow these steps to run the backend API server locally.

### 📋 Prerequisites

Make sure you have Node.js installed on your machine.

### 🏃 Setup Steps

1. Navigate to the backend directory:
   ```bash
   cd backend
