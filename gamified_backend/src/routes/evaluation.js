const express = require("express");
const auth = require("../middleware/auth");
const db = require("../db/database");

const router = express.Router();
router.use(auth);

// GET /api/evaluation/summary - per-user summary stats
router.get("/summary", (req, res) => {
  try {
    const userId = req.user.id;

    // Total tasks created and completed
    const taskStats = db.prepare(`
      SELECT 
        COUNT(*) as total_tasks,
        SUM(CASE WHEN is_completed = 1 THEN 1 ELSE 0 END) as completed_tasks,
        SUM(xp_earned) as total_xp_earned
      FROM tasks WHERE user_id = ?
    `).get(userId);

    // Completion rate
    const completionRate = taskStats.total_tasks > 0
      ? Math.round((taskStats.completed_tasks / taskStats.total_tasks) * 100)
      : 0;

    // Average time to complete a task (in minutes)
    const avgTime = db.prepare(`
      SELECT AVG(
        (julianday(completed_at) - julianday(created_at)) * 1440
      ) as avg_minutes
      FROM tasks WHERE user_id = ? AND is_completed = 1 AND completed_at IS NOT NULL
    `).get(userId);

    // Tasks per category
    const byCategory = db.prepare(`
      SELECT 
        category,
        COUNT(*) as total,
        SUM(CASE WHEN is_completed = 1 THEN 1 ELSE 0 END) as completed
      FROM tasks WHERE user_id = ?
      GROUP BY category
    `).all(userId);

    // Tasks per priority
    const byPriority = db.prepare(`
      SELECT 
        priority,
        COUNT(*) as total,
        SUM(CASE WHEN is_completed = 1 THEN 1 ELSE 0 END) as completed
      FROM tasks WHERE user_id = ?
      GROUP BY priority
    `).all(userId);

    // Daily activity (tasks completed per day)
    const dailyActivity = db.prepare(`
      SELECT 
        DATE(completed_at) as date,
        COUNT(*) as tasks_completed,
        SUM(xp_earned) as xp_earned
      FROM tasks 
      WHERE user_id = ? AND is_completed = 1 AND completed_at IS NOT NULL
      GROUP BY DATE(completed_at)
      ORDER BY date ASC
    `).all(userId);

    res.json({
      user: {
        id: req.user.id,
        username: req.user.username,
        condition: req.user.condition,
        xp: req.user.xp,
        level: req.user.level,
        created_at: req.user.created_at,
      },
      tasks: {
        total: taskStats.total_tasks,
        completed: taskStats.completed_tasks,
        completionRate: completionRate + "%",
        avgCompletionMinutes: avgTime.avg_minutes ? Math.round(avgTime.avg_minutes) : null,
      },
      byCategory,
      byPriority,
      dailyActivity,
    });
  } catch (err) {
    console.error("Evaluation summary error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/evaluation/all - all users summary (for comparing gamified vs control)
router.get("/all", (req, res) => {
  try {
    const users = db.prepare(`
      SELECT 
        u.id,
        u.username,
        u.condition,
        u.xp,
        u.level,
        u.created_at,
        COUNT(t.id) as total_tasks,
        SUM(CASE WHEN t.is_completed = 1 THEN 1 ELSE 0 END) as completed_tasks,
        SUM(t.xp_earned) as total_xp_earned
      FROM users u
      LEFT JOIN tasks t ON u.id = t.user_id
      GROUP BY u.id
      ORDER BY u.condition, u.id
    `).all();

    // Group by condition for easy comparison
    const gamified = users.filter((u) => u.condition === "gamified");
    const control = users.filter((u) => u.condition === "control");

    // Calculate averages per group
    function groupAvg(group) {
      if (group.length === 0) return { avgTasks: 0, avgCompleted: 0, avgCompletionRate: "0%" };
      const avgTasks = Math.round(group.reduce((sum, u) => sum + u.total_tasks, 0) / group.length);
      const avgCompleted = Math.round(group.reduce((sum, u) => sum + (u.completed_tasks || 0), 0) / group.length);
      const avgRate = avgTasks > 0 ? Math.round((avgCompleted / avgTasks) * 100) : 0;
      return { avgTasks, avgCompleted, avgCompletionRate: avgRate + "%" };
    }

    res.json({
      gamified: { users: gamified, summary: groupAvg(gamified) },
      control: { users: control, summary: groupAvg(control) },
    });
  } catch (err) {
    console.error("Evaluation all error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/evaluation/activity-log - raw activity log for detailed analysis
router.get("/activity-log", (req, res) => {
  try {
    const logs = db.prepare(`
      SELECT 
        a.id,
        a.user_id,
        u.username,
        u.condition,
        a.action,
        a.task_id,
        a.xp_gained,
        a.timestamp
      FROM activity_log a
      JOIN users u ON a.user_id = u.id
      ORDER BY a.timestamp ASC
    `).all();

    res.json({ logs, total: logs.length });
  } catch (err) {
    console.error("Activity log error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;