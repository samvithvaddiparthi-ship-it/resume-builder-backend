const express = require("express");
const router = express.Router();
const { generateResume } = require("../services/aiService");

router.post("/generate", async (req, res) => {
  const { resumeText, jobDescription } = req.body;

  if (!resumeText || !jobDescription) {
    return res.status(400).json({
      error: "resumeText and jobDescription are required",
    });
  }

  const result = await generateResume(resumeText, jobDescription);

  res.json({
    optimizedResume: result,
  });
});

module.exports = router;
