"use client";

import { useEffect, useState } from "react";
import { fetchTasks } from "@/lib/api";
import { Task } from "@/types";
import TaskCard from "@/components/TaskCard";
import { Badge, Button, Divider } from "@/components/ui";
import { PlusCircle, NotebookText } from "lucide-react";

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    try {
      setError(null);
      const data = await fetchTasks();
      setTasks(data);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load");
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const total = tasks?.length ?? 0;
  const done = tasks?.filter((t) => t.completed).length ?? 0;

  return (
    <div className="space-y-8">
      <div className="max-w-2xl mx-auto">
        <a href="/tasks/new" className="block">
          <Button className="flex items-center justify-center gap-2 text-[15px]">
            Create Task
            <PlusCircle className="size-4" />            
          </Button>
        </a>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-sky-400">Tasks</span>
          <Badge>{total}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-violet-400">Completed</span>
          <Badge>
            {done} de {total}
          </Badge>
        </div>
      </div>

      <Divider />

      {error && (
        <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4">
          {error}
        </div>
      )}

      {!tasks && !error && <div className="text-white/70">Loading tasks…</div>}

      {tasks && tasks.length === 0 && (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
          <div className="rounded-full bg-white/10 p-3">
            <NotebookText className="size-6 text-white/70" />
          </div>
          <p className="text-white/90 font-semibold">You don’t have any tasks registered yet.</p>
          <p className="text-white/60 text-sm">Create tasks and organize your to-do items.</p>
        </div>
      )}

      <div className="grid gap-3">
        {tasks?.map((t) => (
          <TaskCard key={t.id} task={t} onMutate={refresh} />
        ))}
      </div>
    </div>
  );
}
