const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api/task";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
  created_at: string;
  updated_at: string;
};

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(API_BASE_URL);
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
    headers: { "Content-Type": "application/json" },
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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete task");
}