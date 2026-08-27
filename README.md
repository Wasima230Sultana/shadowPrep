# 🚀 ShadowPrep — AI Interview Practice Platform

**ShadowPrep** is an AI-powered interview practice platform that helps students and job seekers prepare for interviews through realistic questions, timed practice, voice input, and AI-powered feedback.

Users can practice interviews, submit their answers, receive AI evaluation, and track their performance through a personalized dashboard.

## 🌐 Live Demo

👉 [**Try ShadowPrep**](https://shadowprep-3164b.web.app/)

## ✨ Features

* 🔐 **Authentication** — Email/password and Google login with Firebase
* 🎯 **Interview Practice** — Choose categories and number of questions
* ⏱️ **Timed Interviews** — Practice under real interview time pressure
* 🎤 **Voice Input** — Answer questions using speech-to-text
* 🔊 **Text-to-Speech** — Listen to interview questions
* 🤖 **AI Evaluation** — Get AI-powered answer analysis and feedback
* 📊 **Performance Dashboard** — View scores, statistics, and interview history
* 💾 **Data Storage** — Interview results stored securely in MongoDB
* 📱 **Responsive UI** — Works across desktop and mobile devices
* 🎨 **Modern Design** — Interactive and glassmorphism-inspired interface

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* DaisyUI
* Firebase Authentication
* React Router
* Framer Motion
* Recharts
* React Speech Recognition

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* REST API
* AI API

### Deployment

* **Frontend:** Firebase Hosting
* **Backend:** Render
* **Database:** MongoDB Atlas

## 🔄 How It Works

```text
User Login
    ↓
Select Interview Category
    ↓
Choose Number of Questions
    ↓
Answer Interview Questions
    ↓
AI Evaluates Answers
    ↓
Receive Score & Feedback
    ↓
View Performance Dashboard
```

## 🤖 AI Evaluation

ShadowPrep sends the user's interview answer to the backend, where it is processed by the AI evaluation service.

```text
User Answer
     ↓
React Frontend
     ↓
Node.js / Express Backend
     ↓
AI Evaluator
     ↓
AI Model
     ↓
Score + Feedback
     ↓
Dashboard
```

The evaluation helps users understand their strengths, weaknesses, and areas for improvement.

## 📊 Performance Tracking

After completing an interview, users can review:

* Overall score
* Answered and skipped questions
* Individual question performance
* AI-generated feedback
* Interview history
* Performance charts

## 🔒 Security

* API keys are stored in environment variables
* MongoDB credentials are stored securely
* `.env` files are excluded from Git
* Firebase handles user authentication
* Sensitive credentials are never exposed in the frontend

## ⚙️ Local Setup

### 1. Clone the Frontend

```bash
git clone https://github.com/Wasima230Sultana/shadowPrep.git
cd shadowPrep
npm install
npm run dev
```

### 2. Clone the Backend

```bash
git clone https://github.com/Wasima230Sultana/shadowPrep-Server.git
cd shadowPrep-Server
npm install
npm run dev
```

Create a `.env` file in the backend and add required environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
AI_API_KEY=your_ai_api_key
PORT=10000
```

## 🎯 Future Improvements

* Follow-up interview questions
* Resume-based interview practice
* Job-specific interview preparation
* More advanced AI scoring
* Personalized interview recommendations
* Advanced performance analytics
* Technical coding interview mode
* Behavioral interview mode

## 👩‍💻 Developer

**Wasima Sultana**

Computer Science & Engineering Student
Interested in **Web Development, App Development, Software Development, and AI/ML**.
