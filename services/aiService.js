async function generateResume(resumeText, jobDescription) {
    return `
  Optimized Resume
  
  Original Resume:
  ${resumeText}
  
  Tailored for Job:
  ${jobDescription}
  
  (Sample AI-generated content)
  `;
  }
  
  module.exports = { generateResume };
  