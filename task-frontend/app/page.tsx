"use client";

import { useEffect, useState } from "react";
import type { Task } from "@/lib/api";
import {
  getTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
} from "@/lib/api";

import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";

const COLUMNS: { status: Task["status"]; label: string }[] = [
  { status: "To Do", label: "To Do" },
  { status: "In Progress", label: "In Progress" },
  { status: "Done", label: "Done" },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setError(null);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError("Couldn't load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (title: string, description: string) => {
    try {
      const newTask = await createTask(title, description);
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      console.error(err);
      setError("couldn't add that task. Try again.");
    }
  };

  const handleStatusChange = async (id: number, status: Task["status"]) => {
    try {
      const updated = await updateTaskStatus(id, status);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      console.error(err);
      setError("couldn't update that task.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      setError("couldn't remove that task.");
    }
  };

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
      <header className="mb-8">
        <h1 className="font-display text-4xl font-semibold text-ink">
          Task Manager
        </h1>
        <p className="text-ink-soft mt-1">
          A quiet little place to keep track of what's ahead.
        </p>
      </header>

      <TaskForm onAdd={handleAdd} />

      {error && (
        <div className="bg-terracotta/10 border border-terracotta/30 text-terracotta-dark rounded-xl px-4 py-3 mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-ink-soft">Gathering your tasks…</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {COLUMNS.map((col) => {
            const columnTasks = tasks.filter((t) => t.status === col.status);
            return (
              <div key={col.status} className="bg-sage/10 rounded-2xl p-4">
                <h2 className="font-display text-lg font-semibold text-sage-dark mb-4 flex items-center justify-between">
                  {col.label}
                  <span className="text-sm bg-sage/20 text-sage-dark rounded-full px-2.5 py-0.5">
                    {columnTasks.length}
                  </span>
                </h2>

                <div className="flex flex-col gap-3">
  {columnTasks.length === 0 ? (
    <p className="text-sm text-ink-soft/70 italic">
      Nothing here yet.
    </p>
  ) : (
    columnTasks.map((task) => (
      <TaskCard
        key={task.id}
        task={task}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    ))
  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}