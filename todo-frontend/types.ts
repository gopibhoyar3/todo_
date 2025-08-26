export type TaskColor =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "brown";

export interface Task {
  id: number;
  title: string;
  color: TaskColor;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}
