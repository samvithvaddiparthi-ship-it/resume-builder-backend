const express = require("express");

const {
  generateResumeController,
  createResume,
  getUserResumes
} = require("../controllers/resumeController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/generate", protect, generateResumeController);
router.post("/create", protect, createResume);
router.get("/my", protect, getUserResumes);

module.exports = router;
