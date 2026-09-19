# Aurametric 2.0

Aurametric is a student productivity workspace with a dashboard, homework tracking, exam planning, tasks, study sessions, notifications, and an AI assistant.

## Stack

| Area | Choice |
| --- | --- |
| Frontend | React, TypeScript, Vite, Tailwind CSS, React Router, TanStack Query |
| Backend | Node.js, Express, TypeScript, REST |
| Database | Supabase PostgreSQL |
| Auth | Supabase Auth |
| AI | Hugging Face Inference API with a Qwen model |

## Project structure

```
aurametric2.0/
├── frontend/      React app
├── backend/       Express API
├── database/      Supabase schema and migration notes
├── README.md
├── .gitignore
└── package-lock.json (if present)
```

## Local development

Use two terminals.

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

API base: http://localhost:4000  
Health endpoint: http://localhost:4000/api/health

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

App: http://localhost:5173

The frontend reads the Supabase session token and sends authenticated requests to the backend API.

## Environment files

Copy the examples before starting local development:

- backend/.env.example -> backend/.env
- frontend/.env.example -> frontend/.env

Required backend values include:

- PORT
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SECRET_KEY
- HF_TOKEN
- AI_MODEL

Required frontend values include:

- VITE_SUPABASE_URL
- VITE_SUPABASE_PUBLISHABLE_KEY
- VITE_API_URL

Keep the Hugging Face token on the backend only. Do not expose it in the frontend.

## Current capabilities

- Authenticated dashboard and protected routing
- Real user-scoped dashboard data from the backend
- Homework, tasks, exams, subjects, hobbies, study sessions
- Notifications and profile management
- AI chat endpoint backed by the Hugging Face Qwen model
- Production build verification for both frontend and backend
