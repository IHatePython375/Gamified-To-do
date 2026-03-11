const express = require("express");
const auth = require("../middleware/auth");
const db = require("../db/database");

const router = express.Router();
router.use(auth);

const LEVEL_THRESHOLDS = [0, 0, 500, 1200, 2100, 3500, 5500, 8000, 11000, 15000, 20000];

function xpToNextLevel(totalXP, currentLevel) {
  const nextLevel = currentLevel + 1;
  if (nextLevel >= LEVEL_THRESHOLDS.length) return 0;
  return LEVEL_THRESHOLDS[nextLevel] - totalXP;
}

// GET /api/progress
router.get("/", (req, res) => {
  try {
    if (req.user.condition === "control") {
      return res.json({ condition: "control" });
    }

    const today = new Date().toISOString().split("T")[0];

    const todayXP = db.prepare(
      "SELECT COALESCE(SUM(xp_gained), 0) as total FROM activity_log WHERE user_id = ? AND action = 'task_completed' AND DATE(timestamp) = ?"
    ).get(req.user.id, today);

    const weekXP = db.prepare(
      "SELECT COALESCE(SUM(xp_gained), 0) as total FROM activity_log WHERE user_id = ? AND action = 'task_completed' AND timestamp >= DATE('now', '-7 days')"
    ).get(req.user.id);

    res.json({
      condition: "gamified",
      xp: req.user.xp,
      level: req.user.level,
      xpToNextLevel: xpToNextLevel(req.user.xp, req.user.level),
      todayXP: todayXP.total,
      weekXP: weekXP.total,
    });
  } catch (err) {
    console.error("Get progress error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/progress/history
router.get("/history", (req, res) => {
  try {
    if (req.user.condition === "control") {
      return res.json({ condition: "control" });
    }

    const days = db.prepare(`
      SELECT 
        DATE(scheduled_date) as date,
        COUNT(*) as total,
        SUM(CASE WHEN is_completed = 1 THEN 1 ELSE 0 END) as completed
      FROM tasks 
      WHERE user_id = ? 
        AND scheduled_date >= DATE('now', '-7 days')
        AND scheduled_date <= DATE('now')
      GROUP BY DATE(scheduled_date)
      ORDER BY date ASC
    `).all(req.user.id);

    res.json({ condition: "gamified", days });
  } catch (err) {
    console.error("Get history error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;