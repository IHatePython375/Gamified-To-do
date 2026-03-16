# Gamified To-Do — Backend

## Setup

```bash
cd gamified_backend
npm install
npm run dev
```

Go to http://localhost:3001/api/health to verify it works.

## .env

Create a `.env` file in the `gamified_backend` folder with:

```
PORT=3001
JWT_SECRET=change-this-to-a-random-string
```

## API Endpoints

All protected routes need this header: `Authorization: Bearer <token>`

### Auth
- `POST /api/auth/register` — body: `{ username, password }` → returns `{ user, token }`
- `POST /api/auth/login` — body: `{ username, password }` → returns `{ user, token }`

### Tasks (all protected)
- `GET /api/tasks/today` — get today's tasks
- `GET /api/tasks` — get all tasks
- `POST /api/tasks` — body: `{ title, category, priority, scheduled_date }` → create task
- `PATCH /api/tasks/:id` — body: `{ title?, category?, priority?, scheduled_date? }` → edit task
- `PATCH /api/tasks/:id/complete` — mark task done (awards XP if gamified)
- `PATCH /api/tasks/:id/uncomplete` — undo complete (removes XP if gamified)
- `DELETE /api/tasks/:id` — delete task

### Progress (protected, gamified users only)
- `GET /api/progress` — get XP, level, today/week stats
- `GET /api/progress/history` — daily completion counts (past 7 days)

### Evaluation (protected)
- `GET /api/evaluation/summary` — your stats (completion rate, avg time, by category/priority)
- `GET /api/evaluation/all` — all users grouped by gamified vs control with averages
- `GET /api/evaluation/activity-log` — raw activity log for analysis

## Testing

Install the **REST Client** extension in VS Code, open `test.http`, and click "Send Request" on any block.