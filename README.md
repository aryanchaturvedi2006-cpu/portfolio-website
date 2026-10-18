# Aryan Chaturvedi - Full Stack Developer Portfolio

A modern, high-performance portfolio web application built with the MERN stack (MongoDB, Express, React, Node.js) and Vite. Features a flat Emerald, Gold, and Black design system, smooth Framer Motion micro-interactions, responsive mobile-first layouts, and clean RESTful API architecture.

## Live Deployment Links

- Frontend (Client): [LIVE_FRONTEND_URL](LIVE_FRONTEND_URL)
- Backend API (Server): [LIVE_BACKEND_URL](LIVE_BACKEND_URL)

## Features

- Dynamic Hero Section: Interactive typewriter role animation, introduction stats counter, and quick-info sidecard.
- Multi-Theme System: 5 selectable dark themes (Emerald Gold, Cyber Cyan, Violet Rose, Crimson Gold, Royal Mint) with near-black bases, instant 250ms CSS variable transitions, zero flash pre-paint initialization, WCAG AA compliance (all >= 4.5:1), and localStorage persistence.
- Interactive Skills Matrix: Animated horizontal progress indicators with tooltips for desktop hover and mobile tap.
- Filterable Projects Showcase: Animated category switching (Full Stack, Backend, AI/ML) using Framer Motion layout transitions.
- Interactive Timeline: Vertical animated drawing line scaling with scroll, alternating milestone cards, and status node badges.
- Certifications & Credentials: Verified course credentials with external verification links and fallback rendering.
- Resume Downloads: Direct streaming of PDF and DOCX resume documents served by Express `res.download()`.
- Contact Integration: Client-validated contact form with honeypot bot trap, submission rate limiting, and MongoDB persistence.

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, Vite, React Router v7, Framer Motion, Axios, React Icons, React Type Animation |
| Backend | Node.js, Express.js (ES Modules), Mongoose, Helmet, Express Rate Limit, CORS, Dotenv |
| Database | MongoDB Atlas |
| Hosting & Deployment | Vercel (Client SPA), Render (Server Web Service) |
| Fonts & Design | Google Fonts (Outfit, JetBrains Mono), Pure CSS Design Tokens |

## Repository Structure

```
portfolio-website/
├── client/                     # Vite + React Frontend SPA
│   ├── public/                 # Static assets (favicons, svgs)
│   ├── src/
│   │   ├── components/         # Shared UI (Navbar, Footer, SectionTitle, CustomCursor, ParticleBackground, ThemePicker)
│   │   ├── context/            # ThemeContext (5 selectable dark themes)
│   │   ├── data/               # portfolioData.js (content & constants)
│   │   ├── pages/              # Home.jsx and NotFound.jsx (404)
│   │   ├── sections/           # Hero, About, Skills, Projects, Timeline, Certifications, Contact
│   │   ├── App.jsx             # Router and Providers root
│   │   ├── index.css           # Global tokens and design system
│   │   └── main.jsx            # Application entrypoint
│   ├── .env.example            # Client environment template
│   ├── package.json            # Client dependencies and scripts
│   ├── vercel.json             # Vercel SPA rewrite configuration
│   └── vite.config.js          # Vite build and development configuration
├── server/                     # Node.js + Express REST API
│   ├── config/                 # db.js (Mongoose connection logic)
│   ├── controllers/            # contactController.js, resumeController.js
│   ├── files/                  # Resume PDFs and DOCX storage
│   ├── middleware/             # rateLimiter.js
│   ├── models/                 # Contact.js (Mongoose schema)
│   ├── routes/                 # contact.js, resume.js
│   ├── .env.example            # Server environment template
│   ├── package.json            # Server dependencies and scripts
│   └── server.js               # Express application entrypoint
├── legacy-static/              # Original static site archive (for reference)
├── .env.example                # Root environment template
├── .gitignore                  # Git ignore rules
└── README.md                   # Project documentation
```

## REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check returning status, uptime, and MongoDB connection state |
| POST | `/api/contact` | Validates input (name, email, message min 10 chars), rate-limits (5 req / 15 min), and persists to MongoDB Atlas |
| GET | `/api/resume/pdf` | Streams `Aryan_Chaturvedi_Resume.pdf` via `res.download()` |
| GET | `/api/resume/docx` | Streams `Aryan_Chaturvedi_Resume.docx` via `res.download()` |

## Environment Variables

### Client (`client/.env`)

```env
# URL of your backend Express API
# Local development: leave empty to use Vite proxy, or set to http://localhost:5000
# Production (Vercel): set to your deployed backend URL
VITE_API_URL=http://localhost:5000
```

### Server (`server/.env`)

```env
# Server listen port
PORT=5000

# MongoDB Atlas connection string (use MONGODB_URI or legacy MONGO_URI)
# Replace <db_password> with your actual database user password
MONGODB_URI=mongodb+srv://portfolioUser:<db_password>@cluster0.tayddhn.mongodb.net/portfolio?retryWrites=true&w=majority

# Allowed Frontend Origins for CORS (comma-separated for multiple origins)
# In production on Render, set this to your deployed Vercel domain
CLIENT_URL=http://localhost:5173
```

*Note: In production on Render, `CLIENT_URL` can include one or multiple comma-separated URLs (e.g. `http://localhost:5173,https://your-portfolio.vercel.app`). The server automatically trims whitespace, normalizes trailing slashes, and accepts localhost ports (`5173`, `3000`, `127.0.0.1:5173`) by default.*

## Local Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB Atlas cluster credentials (or local MongoDB instance)

### 1. Server Setup

```bash
cd server
npm install
copy .env.example .env    # On macOS/Linux: cp .env.example .env
```

Configure your `server/.env`:
- Set `PORT=5000`
- Set `MONGODB_URI=mongodb+srv://portfolioUser:<your_actual_password>@cluster0.tayddhn.mongodb.net/portfolio?retryWrites=true&w=majority`
- Set `CLIENT_URL=http://localhost:5173`

Start the Express backend:

```bash
npm run dev
```

Verify backend health by opening `http://localhost:5000/api/health` in your browser. It will return:
```json
{
  "status": "ok",
  "uptime": 12,
  "timestamp": "2026-10-18T16:00:00.000Z",
  "database": {
    "connected": true,
    "state": "connected"
  }
}
```

### 2. Client Setup

Open a separate terminal in the project root:

```bash
cd client
npm install
copy .env.example .env    # On macOS/Linux: cp .env.example .env
```

Configure `client/.env`:
- Set `VITE_API_URL=http://localhost:5000` (or leave empty to let Vite proxy `/api` requests)

Start the Vite development server:

```bash
npm run dev
```

The frontend application will be accessible at `http://localhost:5173`.

## Deployment Guide

### Backend on Render

1. Create a new **Web Service** on Render and link this repository.
2. Configure settings:
   - **Root Directory**: `server`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
3. Add Environment Variables in Render:
   - `PORT`: `5000` (or Render default)
   - `MONGODB_URI`: `mongodb+srv://portfolioUser:<your_password>@cluster0.tayddhn.mongodb.net/portfolio?retryWrites=true&w=majority`
   - `CLIENT_URL`: `https://your-portfolio.vercel.app` (your deployed Vercel frontend URL)
4. Deploy the service and verify `https://your-backend.onrender.com/api/health`.

### Frontend on Vercel

1. Import the repository into Vercel as a new project.
2. Configure project settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add Environment Variables in Vercel:
   - `VITE_API_URL`: Your deployed Render backend URL (e.g. `https://your-portfolio-api.onrender.com`)
4. Deploy. Routing will be handled by `client/vercel.json` SPA rewrites.

## Author

Aryan Chaturvedi
- GitHub: [https://github.com/aryanchaturvedi2006-cpu](https://github.com/aryanchaturvedi2006-cpu)
- LinkedIn: [https://www.linkedin.com/in/aryan-chaturvedi-401181329/](https://www.linkedin.com/in/aryan-chaturvedi-401181329/)
