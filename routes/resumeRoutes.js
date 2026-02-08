const express = require("express");

const {
  generateResumeController,
  regenerateResume,
  createResume,
  getUserResumes,
  updateResume,
  deleteResume,
} = require("../controllers/resumeController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/generate", protect, generateResumeController);
router.post("/:id/regenerate", protect, regenerateResume);
router.post("/create", protect, createResume);
router.get("/my", protect, getUserResumes);
router.put("/:id", protect, updateResume);
router.delete("/:id", protect, deleteResume);

module.exports = router;
