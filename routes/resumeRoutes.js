const express = require("express");
const {
  generateResumeController,
} = require("../controllers/resumeController");

const router = express.Router();

router.post("/generate", generateResumeController);

module.exports = router;

