import TaskForm from "@/components/TaskForm";
import { fetchTask } from "@/lib/api";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function EditTaskPage({ params }: Props) {
  const id = Number(params.id);
  if (Number.isNaN(id)) notFound();

  try {
    const task = await fetchTask(id);
    return (
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Edit Task</h2>
        <TaskForm initial={task} />
      </div>
    );
  } catch {
    notFound();
  }
}
