# AI Resume Builder – Backend

This repository contains the backend for an AI-powered resume builder application.  
It handles user authentication, resume CRUD operations, and AI-based resume generation and improvement using OpenAI.

---

## 🚀 Features

- User authentication with JWT
- Secure, protected API routes
- Resume CRUD (Create, Read, Update, Delete)
- AI-powered resume generation
- Role-aware resume optimization
- Resume regeneration (improve existing AI output)
- MongoDB persistence with Mongoose

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- OpenAI API

---

## 📁 Project Structure

resume-builder-backend/
│
├── controllers/
│ ├── authController.js
│ └── resumeController.js
│
├── middleware/
│ └── authMiddleware.js
│
├── models/
│ ├── User.js
│ └── Resume.js
│
├── routes/
│ ├── authRoutes.js
│ └── resumeRoutes.js
│
├── services/
│ └── aiService.js
│
├── config/
│ └── db.js
│
├── server.js
├── package.json
├── .env.example
└── README.md

---

## 🔐 Authentication

Authentication is handled using **JWT tokens**.

After login or signup, the API returns a token.  
This token must be sent in the `Authorization` header for all protected routes.


---

## 📌 API Endpoints

### Auth Routes

| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

---

### Resume Routes (Protected)

| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/resume/generate` | Generate AI resume and save |
| POST | `/api/resume/:id/regenerate` | Regenerate/improve AI resume |
| POST | `/api/resume/create` | Create resume manually |
| GET | `/api/resume/my` | Get all user resumes |
| PUT | `/api/resume/:id` | Update a resume |
| DELETE | `/api/resume/:id` | Delete a resume |

---

## 🤖 AI Resume Generation

The AI service takes:
- Raw resume text
- Job description
- Target role (optional)

And returns structured, ATS-optimized resume content in JSON format.

### Example Request

```json
{
  "name": "Frontend Resume",
  "resumeText": "Worked with React, REST APIs, optimized UI performance",
  "jobDescription": "Frontend developer with strong React skills",
  "role": "frontend"
}

