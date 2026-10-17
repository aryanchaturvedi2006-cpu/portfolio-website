export const REPO_URL_CAFEBUDDY = "REPO_URL_CAFEBUDDY";
export const REPO_URL_EDUSYNC = "REPO_URL_EDUSYNC";
export const REPO_URL_IPL = "REPO_URL_IPL";
export const REPO_URL_TELEMEDICINE = "REPO_URL_TELEMEDICINE";
export const LIVE_URL_TELEMEDICINE = "LIVE_URL_TELEMEDICINE";
export const CERT_URL_1 = "CERT_URL_1";
export const CERT_URL_2 = "CERT_URL_2";

export const portfolioData = {
  about: {
    bio: "B.Tech CSE & AI student at JK Lakshmipat University who builds full-stack web apps with real moving parts: OAuth, payments, scrapers and ML-powered features. Currently interning on a rural telemedicine platform and focused on MERN and AI/ML development.",
    location: "Jaipur, Rajasthan, India",
    status: "Student, open to internships",
    degree: "B.Tech CSE & AI, JKLU (2024-2028)",
    photo: "/profile.jpg"
  },
  skills: {
    frontend: [
      { name: "React", percent: 86 },
      { name: "Next.js", percent: 84 },
      { name: "JavaScript (ES6+)", percent: 88 },
      { name: "TypeScript", percent: 82 },
      { name: "Tailwind CSS", percent: 92 },
      { name: "Framer Motion", percent: 78 },
      { name: "Zustand", percent: 80 },
      { name: "HTML5/CSS3", percent: 90 }
    ],
    backend: [
      { name: "Node.js", percent: 80 },
      { name: "Express.js", percent: 80 },
      { name: "Python", percent: 90 },
      { name: "Flask", percent: 80 },
      { name: "REST APIs", percent: 85 }
    ],
    tools: [
      { name: "MongoDB", percent: 70 },
      { name: "Firebase", percent: 82 },
      { name: "SQL/SQLite", percent: 80 },
      { name: "Git & GitHub", percent: 85 },
      { name: "Razorpay API", percent: 75 },
      { name: "OAuth 2.0", percent: 80 },
      { name: "Scikit-Learn", percent: 70 }
    ]
  },
  projects: [
    {
      id: 1,
      title: "CafeBuddy",
      subtitle: "Full-Stack Cafeteria Application",
      description: "Zomato-inspired food ordering platform with Google OAuth (NextAuth + Firebase), persistent Zustand cart and Razorpay payments.",
      tags: ["Next.js", "React", "Tailwind", "Firebase", "Razorpay", "Zustand", "Framer Motion"],
      live: "https://cafeteria-app-two.vercel.app/",
      github: REPO_URL_CAFEBUDDY,
      category: "Full Stack",
      image: "/projects/cafebuddy.png"
    },
    {
      id: 2,
      title: "EduSync",
      subtitle: "Student Management System",
      description: "Multi-role (Admin/Student) academic platform with attendance threshold alerts, auto GPA, fee tracking, quizzes, PBKDF2 hashing and Google OAuth.",
      tags: ["Python", "Flask", "SQLite", "OAuth 2.0", "JavaScript"],
      live: "https://edusync-portal.onrender.com",
      github: REPO_URL_EDUSYNC,
      category: "Full Stack",
      image: "/projects/edusync.png"
    },
    {
      id: 3,
      title: "IPL Predictor",
      subtitle: "Analytics App",
      description: "Match outcome predictor using head-to-head and player stats, with a Node/Express + Cheerio + Axios live news scraper and 6 interactive pages.",
      tags: ["Node.js", "Express", "Cheerio", "Axios", "JavaScript"],
      live: "https://ipl-predictor-w6lj.onrender.com",
      github: REPO_URL_IPL,
      category: "Backend",
      image: "/projects/ipl.png"
    },
    {
      id: 4,
      title: "Telemedicine Rural Healthcare",
      subtitle: "Internship Project",
      description: "Aarogya AI symptom checker (Scikit-Learn, 14+ Indian languages), WebRTC video consultations, Patient/Doctor/Admin dashboards, Emergency SOS and Ayushman Bharat scheme guidance.",
      tags: ["React", "Node.js", "Express", "Python", "Flask", "Scikit-Learn", "WebRTC", "SQLite"],
      live: LIVE_URL_TELEMEDICINE,
      github: REPO_URL_TELEMEDICINE,
      category: "AI/ML",
      image: "/projects/telemedicine.png"
    }
  ],
  timeline: [
    {
      id: 1,
      type: "experience",
      title: "Backend & AI/ML Intern (PS-1)",
      org: "JK Lakshmipat University",
      period: "May 2026 - Jul 2026",
      description: "Working on a telemedicine platform for rural healthcare: Aarogya AI multi-lingual symptom checker, WebRTC video consultations, role-based dashboards, Emergency SOS and government scheme guidance. Focus on backend and AI/ML development."
    },
    {
      id: 2,
      type: "experience",
      title: "Discipline Coordinator, College Hackathon 2026",
      org: "JK Lakshmipat University",
      period: "2026",
      description: "Ensured smooth conduct and discipline across all hackathon zones, coordinated with event teams and managed participants."
    },
    {
      id: 3,
      type: "experience",
      title: "Boys' Hostel Coordinator",
      org: "JK Lakshmipat University",
      period: "Sep 2025 - Sep 2026",
      description: "Managed hostel administration, student welfare and inter-hostel coordination for the entire boys' wing, building leadership and organizational skills."
    },
    {
      id: 4,
      type: "education",
      title: "B.Tech in Computer Science & Engineering (AI)",
      org: "JK Lakshmipat University, Jaipur",
      period: "2024 - 2028",
      description: "Focus on full stack development and AI/ML."
    }
  ],
  certifications: [
    {
      id: 1,
      title: "Introduction to Generative AI",
      issuer: "Google Cloud & Simplilearn (SkillUp)",
      date: "June 2025",
      credentialId: "8497142",
      link: CERT_URL_1,
      image: "/certs/genai-skillup.jpg"
    },
    {
      id: 2,
      title: "What Is Generative AI?",
      issuer: "LinkedIn Learning",
      date: "April 2025",
      link: CERT_URL_2,
      image: "/certs/linkedin-genai.jpg"
    }
  ],
  achievements: [
    "Discipline Coordinator, College Hackathon 2026 (JKLU)",
    "Boys' Hostel Coordinator, JKLU (Sep 2025 - Sep 2026)"
  ]
};

export default portfolioData;
