import { Task } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${API_URL}/tasks`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function createTask(data: { title: string; color: string }) {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

export async function updateTask(
  id: number,
  data: Partial<Pick<Task, "title" | "color" | "completed">>
) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

export async function deleteTask(id: number) {
  const res = await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete task");
  return res.json();
}

export async function fetchTask(id: number): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Task not found");
  return res.json();
}
