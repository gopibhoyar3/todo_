import { z } from "zod";

const ColorEnum = z.enum(["red","orange","yellow","green","blue","purple","pink","brown"]);

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(120),
  color: ColorEnum,
});

export const updateTaskSchema = z.object({
  title: z.string().trim().min(1).max(120).optional(),
  color: ColorEnum.optional(),
  completed: z.boolean().optional(),
});
