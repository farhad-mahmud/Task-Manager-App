# #️⃣ AnyTasks 

A minimal, modern, and beautifully responsive user interface built to manage tasks. It features a board divided into To Do, In Progress, and Done stages, along with device-based session isolation.

# #️⃣ Features of the application

* **➕ Add a Task:** Add tasks with a Title, Description, and Status.
* **👁️ View Tasks:** View all tasks on a responsive, column-based board layout (To Do, In Progress, Done).
* **🔄 Update Status:** Move tasks between status columns dynamically.
* **❌ Delete Task:** Delete tasks permanently.
* **🔌 Dynamic Backend Connection:** Fully connected to a Node/Express backend API with zero hardcoded data.
* **🔒 Multi-Tenant Privacy (Bonus):** Implemented device-based task isolation using a browser-generated session UUID in request headers (`X-Session-ID`), ensuring that different reviewers testing the app concurrently do not overwrite or delete each other's tasks.
