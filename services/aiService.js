const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateResume = async (resumeText, jobDescription) => {
  const prompt = `
You are a professional resume writer and ATS optimization expert.

Task:
Rewrite the resume to match the given job description.
Use strong action verbs.
Make it ATS-friendly.
Be concise and professional.

Return the output strictly in JSON format with these keys:
- summary
- experience (array of bullet points)
- skills (array)
- projects (array)

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.4,
  });

  return response.choices[0].message.content;
};

module.exports = { generateResume };
