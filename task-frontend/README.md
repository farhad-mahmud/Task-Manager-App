# #️⃣ AnyTasks - FrontEnd
---

# 🛠️ Tech Stack & Features

* **🚀 Framework:** Next.js (App Router)
* **⚛️ Library:** React (v19)
* **🎨 Styling:** Tailwind CSS (v4)
* **📝 Language:** TypeScript
* **🔒 Task Isolation:** Uses browser `localStorage` to generate a unique session UUID, sending it via custom headers (`X-Session-ID`) to ensure device privacy.
* **📱 Design:** Fully responsive, clean layouts with modern typography and interface transitions.

---

# ⚡ Getting Started & Running Locally

Follow these steps to run the frontend server locally.

## 📋 Prerequisites

Make sure you have Node.js installed on your machine.

## 🏃 Setup Steps

```bash
# Navigate to the frontend directory
cd task-frontend

# Install dependencies
npm install

# Create a .env.local file to connect to your backend API
echo "NEXT_PUBLIC_API_URL=http://localhost:5050/api/task" > .env.local

# Start the development server
npm run dev
