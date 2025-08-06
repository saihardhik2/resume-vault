const express = require("express");
const { exec } = require("child_process");
const path = require("path");

const router = express.Router();

// POST /api/analyze
router.post("/", (req, res) => {
  const { filePath, jobRole } = req.body;

  if (!filePath || !jobRole) {
    return res.status(400).json({ error: "File path and job role are required" });
  }

  // Absolute path to resume file
  const absolutePath = path.resolve(__dirname, "../uploads", path.basename(filePath));

  // Run Python script with absolute path + job role
  const command = `python "${path.resolve(__dirname, "../ml/analyze.py")}" "${absolutePath}" "${jobRole}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Python Error:", stderr);
      return res.status(500).json({ error: "Error analyzing resume" });
    }

    try {
      const result = JSON.parse(stdout);
      res.json(result);
    } catch (err) {
      console.error("JSON Parse Error:", err);
      res.status(500).json({ error: "Error parsing analysis result" });
    }
  });
});

module.exports = router;
