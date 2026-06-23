const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api/task";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
  created_at: string;
  updated_at: string;
};

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sessionId = localStorage.getItem("task_manager_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("task_manager_session_id", sessionId);
  }
  return sessionId;
}

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(API_BASE_URL, {
    headers: {
      "X-Session-ID": getSessionId(),
    },
  });
  if (!res.ok) throw new Error("failed to fetch tasks");
  return res.json();
}

export async function createTask(
  title: string,
  description: string,
  status: Task["status"] = "To Do"
): Promise<Task> {
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Session-ID": getSessionId(),
    },
    body: JSON.stringify({ title, description, status }),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

export async function updateTaskStatus(
  id: number,
  status: Task["status"]
): Promise<Task> {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-Session-ID": getSessionId(),
    },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "X-Session-ID": getSessionId(),
    },
  });
  if (!res.ok) throw new Error("Failed to delete task");
}