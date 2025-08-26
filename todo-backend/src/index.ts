import "dotenv/config";
import express from "express";
import cors from "cors";
import { prisma } from "./prisma";
import { createTaskSchema, updateTaskSchema } from "./validators";

const app = express();

const PORT = Number(process.env.PORT ?? 4000);
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? "http://localhost:3000";

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// Health
app.get("/health", (_req, res) => res.json({ ok: true }));

// GET /tasks
app.get("/tasks", async (_req, res) => {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" }
  });
  res.json(tasks);
});

// GET /tasks/:id
app.get("/tasks/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) return res.status(404).json({ error: "Not found" });
  res.json(task);
});

// POST /tasks
app.post("/tasks", async (req, res) => {
  const parse = createTaskSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });

  const { title, color } = parse.data;
  const created = await prisma.task.create({
    data: { title, color }
  });
  res.status(201).json(created);
});

// PUT /tasks/:id
app.put("/tasks/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

  const parse = updateTaskSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });

  try {
    const updated = await prisma.task.update({
      where: { id },
      data: parse.data
    });
    res.json(updated);
  } catch (e: any) {
    if (e?.code === "P2025") {
      return res.status(404).json({ error: "Not found" });
    }
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /tasks/:id
app.delete("/tasks/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

  try {
    const deleted = await prisma.task.delete({ where: { id } });
    res.json({ ok: true, id: deleted.id });
  } catch (e: any) {
    if (e?.code === "P2025") {
      return res.status(404).json({ error: "Not found" });
    }
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 404
app.use((_req, res) => res.status(404).json({ error: "Route not found" }));

// Global error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
