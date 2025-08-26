"use client";

import { Task } from "@/types";
import { updateTask, deleteTask } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2, Check } from "lucide-react";

const COLOR_RING: Record<Task["color"], string> = {
  red: "ring-red-400",
  orange: "ring-orange-400",
  yellow: "ring-yellow-400",
  green: "ring-green-400",
  blue: "ring-blue-400",
  purple: "ring-purple-400",
  pink: "ring-pink-400",
  brown: "ring-amber-500",
};

export default function TaskCard({
  task,
  onMutate,
}: {
  task: Task;
  onMutate?: () => void;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const toggleCompleted = async () => {
    setLoading(true);
    try {
      await updateTask(task.id, { completed: !task.completed });
      onMutate?.();
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    if (!confirm("Delete this task?")) return;
    setLoading(true);
    try {
      await deleteTask(task.id);
      onMutate?.();
    } finally {
      setLoading(false);
    }
  };

  const colorRing = COLOR_RING[task.color] ?? "ring-blue-400";

  return (
    <div
      role="button"
      onClick={() => router.push(`/tasks/${task.id}`)}
      className={[
        "group flex items-center justify-between gap-4 rounded-2xl",
        "border border-white/10 bg-white/5 hover:bg-white/10 transition",
        "px-4 py-3",
        loading ? "opacity-60 pointer-events-none" : "",
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleCompleted();
          }}
          aria-label={task.completed ? "Mark as not completed" : "Mark as completed"}
          className={[
            "relative flex items-center justify-center rounded-full ring-2 leading-none",
            "h-5 w-5 aspect-square flex-none", // <-- key bits
            task.completed ? "bg-violet-600 ring-violet-400" : `bg-transparent ${colorRing}`,
          ].join(" ")}
        >
          {task.completed && <Check className="h-3 w-3 text-white" />}
        </button>

        <div className="flex flex-col">
          <span
            className={[
              "font-medium",
              task.completed ? "line-through text-white/50" : "",
            ].join(" ")}
          >
            {task.title}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          aria-label="Delete task"
          title="Delete"
          className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition px-2.5 py-2"
        >
          <Trash2 className="size-4 text-white/80" />
        </button>
      </div>
    </div>
  );
}
