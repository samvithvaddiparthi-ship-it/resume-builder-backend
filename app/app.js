const express = require("express");
const resumeRoutes = require("../routes/resumeRoutes");

const app = express();

app.use(express.json());

app.use("/api/resume", resumeRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🚀" });
});

module.exports = app;
