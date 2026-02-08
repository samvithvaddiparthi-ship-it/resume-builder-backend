const OpenAI = require("openai").default;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const generateResume = async (resumeText, jobDescription, role = "general") => {
  const prompt = `
You are a professional resume writer and ATS optimization expert.

Target Role: ${role}

Rules:
- Use strong action verbs
- Focus on skills relevant to the target role
- Optimize for ATS keyword matching
- Keep content concise and impactful

Return ONLY valid JSON with these keys:
summary
experience
skills
projects

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.4
  });

  return response.choices[0].message.content;
};

module.exports = { generateResume };
