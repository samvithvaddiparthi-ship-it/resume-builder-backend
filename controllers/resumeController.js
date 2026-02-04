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

module.exports = {
  generateResumeController,
};
