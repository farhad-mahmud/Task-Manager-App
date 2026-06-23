"use client";

import { useState } from "react";

type TaskFormProps = {
  onAdd: (title: string, description: string) => void;
};

export default function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    onAdd(trimmedTitle, description.trim());
    setTitle("");
    setDescription("");
  };

  return (
    <div className="bg-cream border-2 border-dashed border-terracotta/30 rounded-2xl p-5 mb-8">
      <h2 className="font-display text-xl font-semibold text-ink mb-3">
        Write down a new task
      </h2>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="flex-1 bg-white/70 border border-ink-soft/20 rounded-xl px-4 py-2.5 text-ink placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-sage"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="flex-1 bg-white/70 border border-ink-soft/20 rounded-xl px-4 py-2.5 text-ink placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-sage"
        />
        <button
          onClick={handleSubmit}
          className="bg-terracotta hover:bg-terracotta-dark text-cream font-semibold rounded-xl px-5 py-2.5 transition-colors whitespace-nowrap"
        >
          Add task
        </button>
      </div>
    </div>
  );
}