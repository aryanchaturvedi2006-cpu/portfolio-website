# Aryan Chaturvedi - Full Stack Developer Portfolio

A modern, high-performance portfolio web application built with the MERN stack (MongoDB, Express, React, Node.js) and Vite. Features a flat Emerald, Gold, and Black design system, smooth Framer Motion micro-interactions, responsive mobile-first layouts, and clean RESTful API architecture.

## Live Deployment Links

- Frontend (Client): [LIVE_FRONTEND_URL](LIVE_FRONTEND_URL)
- Backend API (Server): [LIVE_BACKEND_URL](LIVE_BACKEND_URL)

## Features

- Dynamic Hero Section: Interactive typewriter role animation, introduction stats counter, and quick-info sidecard.
- Theme Management: Dark and light modes with system preference detection and localStorage persistence using CSS variables.
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
│   │   ├── components/         # Shared UI (Navbar, Footer, SectionTitle, CustomCursor, ParticleBackground)
│   │   ├── context/            # ThemeContext (dark/light mode)
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
| GET | `/api/health` | Health check endpoint returning `{ status: "ok" }` |
| POST | `/api/contact` | Validates input, checks rate limit (5 req / 15 min), and saves contact to MongoDB |
| GET | `/api/resume/pdf` | Downloads `Aryan_Chaturvedi_Resume.pdf` via `res.download()` (returns 404 JSON if absent) |
| GET | `/api/resume/docx` | Downloads `Aryan_Chaturvedi_Resume.docx` via `res.download()` (returns 404 JSON if absent) |

## Environment Variables

### Client (`client/.env`)

```env
VITE_API_URL=
```

### Server (`server/.env`)

```env
PORT=
MONGO_URI=
CLIENT_URL=
```

*Note: In production, `CLIENT_URL` can include one or multiple comma-separated URLs (e.g. `https://your-portfolio.vercel.app`). The server automatically trims whitespace, normalizes trailing slashes, and allows local development on `http://localhost:5173`.*

## Local Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB instance (local or MongoDB Atlas connection URI)

### 1. Clone Repository

```bash
git clone https://github.com/aryanchaturvedi2006-cpu/portfolio-website.git
cd portfolio-website
```

### 2. Server Setup

```bash
cd server
npm install
copy .env.example .env    # On macOS/Linux: cp .env.example .env
```

Configure your `.env` values in `server/.env`:
- Set `PORT=5000`
- Set `MONGO_URI` to your MongoDB connection string
- Set `CLIENT_URL=http://localhost:5173`

Start the server:

```bash
npm run dev
```

### 3. Client Setup

Open a new terminal session in the project root:

```bash
cd client
npm install
copy .env.example .env    # On macOS/Linux: cp .env.example .env
```

Configure your `.env` in `client/.env`:
- Set `VITE_API_URL=http://localhost:5000`

Start the frontend development server:

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
3. Add Environment Variables:
   - `PORT`: `5000` (or leave default assigned by Render)
   - `MONGO_URI`: Your production MongoDB Atlas connection string
   - `CLIENT_URL`: `https://your-client-domain.vercel.app`
4. Deploy the service and verify `/api/health`.

### Frontend on Vercel

1. Import the repository into Vercel as a new project.
2. Configure project settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add Environment Variables:
   - `VITE_API_URL`: Your deployed Render backend URL (e.g. `https://your-api.onrender.com`)
4. Deploy. Routing will be handled by `client/vercel.json` SPA rewrites.

## Author

Aryan Chaturvedi
- GitHub: [https://github.com/aryanchaturvedi2006-cpu](https://github.com/aryanchaturvedi2006-cpu)
- LinkedIn: [https://www.linkedin.com/in/aryan-chaturvedi-401181329/](https://www.linkedin.com/in/aryan-chaturvedi-401181329/)
