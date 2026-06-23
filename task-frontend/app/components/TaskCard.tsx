"use client";

import { Task } from "@/lib/api";

type TaskCardProps = {
  task: Task;
  onStatusChange: (id: number, status: Task["status"]) => void;
  onDelete: (id: number) => void;
};

const STATUS_OPTIONS: Task["status"][] = ["To Do", "In Progress", "Done"];

export default function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  return (
    <div className="bg-wheat/60 border border-terracotta/20 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-display text-lg font-semibold text-ink mb-1">
        {task.title}
      </h3>
      {task.description && (
        <p className="text-sm text-ink-soft mb-3 leading-relaxed">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between gap-2 mt-3">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as Task["status"])}
          className="text-sm bg-cream border border-terracotta/30 rounded-full px-3 py-1.5 text-ink focus:outline-none focus:ring-2 focus:ring-sage cursor-pointer"
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <button
          onClick={() => onDelete(task.id)}
          className="text-sm text-terracotta hover:text-terracotta-dark font-semibold px-2 py-1 rounded-full hover:bg-terracotta/10 transition-colors"
          aria-label={`Delete ${task.title}`}
        >
          Remove
        </button>
      </div>
    </div>
  );
}