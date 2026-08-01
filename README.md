# Portfolio Admin – Backend (Express + MongoDB)

Matches the frontend in `client/my_app` exactly — same routes, same response shapes.

## Setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env`:
- `MONGO_URI` → your MongoDB connection string (local or Atlas)
- `JWT_SECRET` → any long random string
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` → credentials for the admin you want to log in with

## Create the admin account (one time)

There is no public signup — you seed the first admin from `.env`:

```bash
npm run seed:admin
```

This creates the admin, or updates their password if the email already exists.

## Run the server

```bash
npm run dev     # nodemon, auto-restart
# or
npm start
```

Server runs at `http://localhost:5000`, matching `baseURL: "http://localhost:5000/api"` in the frontend's `src/services/api.js`.

## API Routes

| Method | Route | Access | Description |
|---|---|---|---|
| POST | /api/admin/login | Public | Login, returns `{ token, admin }` |
| GET | /api/admin/profile | Private | Get logged-in admin's profile |
| PUT | /api/admin/profile | Private | Update profile fields |
| GET | /api/dashboard/stats | Private | Dashboard counters |
| POST | /api/contact | Public | Visitor submits contact form |
| GET | /api/contact | Private | List all messages |
| PUT | /api/contact/:id/read | Private | Mark message as read |
| DELETE | /api/contact/:id | Private | Delete a message |
| GET | /api/projects | Public | List all projects |
| POST | /api/projects | Private | Add a project |
| DELETE | /api/projects/:id | Private | Delete a project |

Private routes require header: `Authorization: Bearer <token>` (the frontend already sends this from `localStorage`).
