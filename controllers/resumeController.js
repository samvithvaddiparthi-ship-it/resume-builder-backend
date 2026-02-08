const Resume = require("../models/Resume");
const { generateResume } = require("../services/aiService");

const generateResumeController = async (req, res) => {
  try {
    const { name, resumeText, jobDescription, role = "general" } = req.body;

    if (!name || !resumeText || !jobDescription) {
      return res.status(400).json({
        success: false,
        error: "name, resumeText and jobDescription are required"
      });
    }

    const aiResponse = await generateResume(
      resumeText,
      jobDescription,
      role
    );

    let parsedContent;
    try {
      parsedContent = JSON.parse(aiResponse);
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: "AI response was not valid JSON"
      });
    }

    const resume = await Resume.create({
      user: req.user.id,
      name,
      aiGeneratedContent: parsedContent
    });

    res.status(201).json({
      success: true,
      data: resume
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to generate resume"
    });
  }
};

const regenerateResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    if (resume.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const aiResponse = await generateResume(
      JSON.stringify(resume.aiGeneratedContent),
      "Improve this resume with stronger wording and better ATS optimization",
      "general"
    );

    const parsedContent = JSON.parse(aiResponse);

    resume.aiGeneratedContent = parsedContent;
    await resume.save();

    res.status(200).json({
      success: true,
      data: resume
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to regenerate resume"
    });
  }
};

const createResume = async (req, res) => {
  try {
    const resume = await Resume.create({
      user: req.user.id,
      ...req.body
    });

    res.status(201).json({
      success: true,
      data: resume
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to create resume"
    });
  }
};

const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id });

    res.status(200).json({
      success: true,
      data: resumes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch resumes"
    });
  }
};

const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    if (resume.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updatedResume
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to update resume"
    });
  }
};

const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    if (resume.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await resume.deleteOne();

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete resume"
    });
  }
};

module.exports = {
  generateResumeController,
  regenerateResume,
  createResume,
  getUserResumes,
  updateResume,
  deleteResume
};
