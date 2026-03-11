require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbReady } = require("./db/database");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Wait for database to be ready, then start the server
dbReady.then(() => {
  const authRoutes = require("./routes/auth");
  const taskRoutes = require("./routes/tasks");
  const progressRoutes = require("./routes/progress");

  app.use("/api/auth", authRoutes);
  app.use("/api/tasks", taskRoutes);
  app.use("/api/progress", progressRoutes);

  app.listen(PORT, () => {
    console.log(`Gamified To-Do backend running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to start:", err);
});