"use client";

import { Task, TaskColor } from "@/types";
import { createTask, updateTask } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui";
import { ArrowLeft, PlusCircle, Check } from "lucide-react";

const COLORS: TaskColor[] = ["red","orange","yellow","green","blue","purple","pink","brown"];

const COLOR_BG: Record<TaskColor, string> = {
  red: "bg-red-500",
  orange: "bg-orange-500",
  yellow: "bg-yellow-400",
  green: "bg-green-500",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
  brown: "bg-amber-600",
};

export default function TaskForm({ initial }: { initial?: Task }) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [color, setColor] = useState<TaskColor>(initial?.color ?? "blue");
  const [saving, setSaving] = useState(false);

  const isEdit = Boolean(initial);
  const hasTyped = title.trim().length > 0;

  const ctaLabel = isEdit ? "Save Changes" : hasTyped ? "Save" : "Add Task";
  const CtaIcon = isEdit || hasTyped ? Check : PlusCircle;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    setSaving(true);
    try {
      if (isEdit) {
        await updateTask(initial!.id, { title, color });
      } else {
        await createTask({ title, color });
      }
      router.push("/");
      router.refresh();
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-8">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Back"
        className="bg-transparent text-white hover:opacity-80 transition inline-flex"
        style={{ lineHeight: 0 }}
      >
        <ArrowLeft className="size-6" />
      </button>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-sky-400">Title</label>
        <input
          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-sky-500"
          placeholder="Ex. Brush your teeths."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={120}
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-semibold text-sky-400">Color</label>
        <div className="flex flex-wrap gap-3">
          {COLORS.map((c) => {
            const isActive = color === c;
            return (
              <button
                key={c}
                type="button"
                aria-label={c}
                aria-pressed={isActive}
                onClick={() => setColor(c)}
                className={[
                  "size-11 rounded-full",
                  COLOR_BG[c],
                  "border-2",
                  isActive ? "border-white" : "border-transparent",
                  "transition hover:opacity-90 outline-none focus:ring-2 focus:ring-white/40",
                ].join(" ")}
              />
            );
          })}
        </div>
      </div>

      <div className="max-w-2xl">
        <Button type="submit" disabled={saving} className="flex items-center justify-center gap-2">
          {ctaLabel}
          <CtaIcon className="size-4" />          
        </Button>
      </div>
    </form>
  );
}
