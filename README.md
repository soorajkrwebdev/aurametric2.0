# Aurametric 2.0

Student productivity workspace for planning, tasks, focus, and progress.

This is a new project. It does not depend on any previous Aurametric codebase.

## Stack

| Area | Choice |
| --- | --- |
| Frontend | React, TypeScript, Vite, Tailwind CSS, React Router, TanStack Query |
| Backend | Node.js, Express, TypeScript, REST |
| Database | Supabase PostgreSQL (not wired up yet) |
| Auth | Supabase Auth (not wired up yet) |
| AI | Hugging Face + Qwen chatbot (not implemented yet) |

## Folder structure

```
aurametric2.0/
├── frontend/     React app
├── backend/      Express API
├── database/     Future Supabase SQL and policies
└── README.md
```

## Run locally

Use two terminals. Docker is not required.

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

API: `http://localhost:4000`  
Health check: `http://localhost:4000/api/health`

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

App: `http://localhost:5173`

The Vite dev server proxies `/api` to the backend, so the dashboard can report API status without extra CORS setup in development.

## Environment files

Copy the examples if you need local overrides:

- `backend/.env.example` → `backend/.env`
- `frontend/.env.example` → `frontend/.env`

## Not in this first step

- Supabase
- authentication
- AI chatbot
- task/planner/focus data
