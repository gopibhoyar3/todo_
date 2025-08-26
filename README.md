# Todo App

A simple, polished **Todo** application.

- **Frontend:** Next.js (App Router) + Tailwind CSS + TypeScript  
- **Backend:** Express.js + Prisma + MySQL (TypeScript)

- Screenshots
<img width="1066" height="758" alt="Screenshot 2025-08-26 at 4 12 06 AM" src="https://github.com/user-attachments/assets/840bdd8d-1587-426e-a9f5-936b9cdf9f1c" />

- Screenshots
<img width="1066" height="758" alt="Screenshot 2025-08-26 at 4 13 17 AM" src="https://github.com/user-attachments/assets/63728046-43fc-4ba4-a8eb-82a6e5ebe30c" />

- Screenshots
<img width="1066" height="758" alt="Screenshot 2025-08-26 at 4 13 28 AM" src="https://github.com/user-attachments/assets/ef1bec57-4c60-4656-bd64-a6ee3b46a70f" />

- Screenshots
<img width="1066" height="758" alt="Screenshot 2025-08-26 at 4 13 42 AM" src="https://github.com/user-attachments/assets/984a21c7-79df-4f02-bba2-8e1465dde5b3" />


## Features

- Add / Edit / Delete tasks
- Toggle **Completed / Not Completed** from the list
- Task counters on Home (“**Tasks**” in blue, “**Completed**” in purple)
- 8 color swatches per task: `red | orange | yellow | green | blue | purple | pink | brown`
- Completed tasks show a **purple filled circle** with a **white tick**
- Create form:
  - Button starts as **PlusCircle**, changes to **Check** and label “**Save**” once you type
  - Labels “Title” and “Color” are blue
  - Back control is a **white left arrow** (no background)
- Header: rocket + **Todo** (cyan gradient) **App** (purple gradient)
- Unified soft grey divider line under header (matches empty state divider)

---

## Repo Layout


---

## Prerequisites

- **Node.js** 18+ (Node **20 LTS** recommended)
- **npm**
- **MySQL 8+** (local install or Docker)

---

## Environment Variables

Create local env files from the included examples:

**Frontend** → `todo-frontend/.env.local`
```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
