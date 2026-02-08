const Resume = require("../models/Resume");
const { generateResume } = require("../services/aiService");

const generateResumeController = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        success: false,
        error: "resumeText and jobDescription are required",
      });
    }

    const result = await generateResume(resumeText, jobDescription);

    res.status(200).json({
      success: true,
      data: {
        optimizedResume: result,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

const createResume = async (req, res) => {
  try {
    const resume = await Resume.create({
      user: req.user.id,
      ...req.body,
    });

    res.status(201).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to create resume",
    });
  }
};

const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id });

    res.status(200).json({
      success: true,
      data: resumes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch resumes",
    });
  }
};

module.exports = {
  generateResumeController,
  createResume,
  getUserResumes,
};
