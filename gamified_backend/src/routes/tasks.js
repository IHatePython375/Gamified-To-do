const express = require("express");
const auth = require("../middleware/auth");
const db = require("../db/database");

const router = express.Router();
router.use(auth);

const XP_BY_PRIORITY = { high: 150, medium: 100, low: 50 };
const LEVEL_THRESHOLDS = [0, 0, 500, 1200, 2100, 3500, 5500, 8000, 11000, 15000, 20000];

function calculateLevel(totalXP) {
  let level = 1;
  for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
    if (totalXP >= LEVEL_THRESHOLDS[i]) level = i;
    else break;
  }
  return level;
}

function xpToNextLevel(totalXP, currentLevel) {
  const nextLevel = currentLevel + 1;
  if (nextLevel >= LEVEL_THRESHOLDS.length) return 0;
  return LEVEL_THRESHOLDS[nextLevel] - totalXP;
}

// GET /api/tasks/today
router.get("/today", (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const tasks = db.prepare(
      "SELECT * FROM tasks WHERE user_id = ? AND scheduled_date = ? ORDER BY is_completed ASC, priority DESC, created_at ASC"
    ).all(req.user.id, today);

    const completedCount = tasks.filter((t) => t.is_completed).length;
    res.json({ tasks, completedCount, totalCount: tasks.length, date: today });
  } catch (err) {
    console.error("Get today tasks error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/tasks
router.get("/", (req, res) => {
  try {
    const tasks = db.prepare(
      "SELECT * FROM tasks WHERE user_id = ? ORDER BY scheduled_date ASC, is_completed ASC, created_at ASC"
    ).all(req.user.id);
    res.json({ tasks });
  } catch (err) {
    console.error("Get all tasks error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/tasks
router.post("/", (req, res) => {
  try {
    const { title, category, priority, scheduled_date } = req.body;

    if (!title || !scheduled_date) {
      return res.status(400).json({ error: "Title and scheduled_date are required" });
    }

    const result = db.prepare(
      "INSERT INTO tasks (user_id, title, category, priority, scheduled_date) VALUES (?, ?, ?, ?, ?)"
    ).run(req.user.id, title, category || "personal", priority || "medium", scheduled_date);

    const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(result.lastInsertRowid);

    db.prepare(
      "INSERT INTO activity_log (user_id, action, task_id) VALUES (?, 'task_created', ?)"
    ).run(req.user.id, task.id);

    res.status(201).json({ task });
  } catch (err) {
    console.error("Create task error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// PATCH /api/tasks/:id/complete
router.patch("/:id/complete", (req, res) => {
  try {
    const task = db.prepare(
      "SELECT * FROM tasks WHERE id = ? AND user_id = ?"
    ).get(req.params.id, req.user.id);

    if (!task) return res.status(404).json({ error: "Task not found" });
    if (task.is_completed) return res.status(400).json({ error: "Task already completed" });

    const now = new Date().toISOString();

    if (req.user.condition === "gamified") {
      const xpEarned = XP_BY_PRIORITY[task.priority] || 100;
      const newXP = req.user.xp + xpEarned;
      const oldLevel = req.user.level;
      const newLevel = calculateLevel(newXP);
      const leveledUp = newLevel > oldLevel;

      db.prepare("UPDATE tasks SET is_completed = 1, completed_at = ?, xp_earned = ? WHERE id = ?").run(now, xpEarned, task.id);
      db.prepare("UPDATE users SET xp = ?, level = ? WHERE id = ?").run(newXP, newLevel, req.user.id);
      db.prepare("INSERT INTO activity_log (user_id, action, task_id, xp_gained) VALUES (?, 'task_completed', ?, ?)").run(req.user.id, task.id, xpEarned);

      const updatedTask = db.prepare("SELECT * FROM tasks WHERE id = ?").get(task.id);
      return res.json({ task: updatedTask, xpEarned, totalXP: newXP, level: newLevel, leveledUp, xpToNextLevel: xpToNextLevel(newXP, newLevel) });
    }

    db.prepare("UPDATE tasks SET is_completed = 1, completed_at = ? WHERE id = ?").run(now, task.id);
    db.prepare("INSERT INTO activity_log (user_id, action, task_id) VALUES (?, 'task_completed', ?)").run(req.user.id, task.id);

    const updatedTask = db.prepare("SELECT * FROM tasks WHERE id = ?").get(task.id);
    res.json({ task: updatedTask });
  } catch (err) {
    console.error("Complete task error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /api/tasks/:id
router.delete("/:id", (req, res) => {
  try {
    const task = db.prepare("SELECT * FROM tasks WHERE id = ? AND user_id = ?").get(req.params.id, req.user.id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    db.prepare("DELETE FROM tasks WHERE id = ?").run(task.id);
    res.json({ success: true });
  } catch (err) {
    console.error("Delete task error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;