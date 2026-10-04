/**
 * ==============================================================================
 * PORTFOLIO CONFIGURATION & DATA FILE
 * ==============================================================================
 */

export interface TechItem {
  name: string;
  src: string;
  category: 'Languages' | 'Frontend' | 'Backend' | 'Infra' | 'Tools';
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  period: string;
  location?: string;
  highlights: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location?: string;
  type: 'Full-time' | 'Internship' | 'Freelance' | 'Open Source' | 'Hackathon' | 'Club';
  bullets: string[];
  techStack?: string[];
}

export interface ProjectCaseStudyData {
  overview: string;
  role: string;
  timeline: string;
  problem: string;
  architecture: string[];
  challenges: { challenge: string; solution: string }[];
  metrics: { value: string; label: string }[];
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  caseStudy: ProjectCaseStudyData;
}

export interface PortfolioConfig {
  personal: {
    name: string;
    firstName: string;
    lastName: string;
    targetRole: string;
    location: string;
    resumeUrl: string;
    bioParagraphs: string[];
    expertise: string;
    philosophy: string;
    calloutQuote: string;
  };
  contact: {
    email: string;
    phone: string;
    location: string;
    formspreeEndpoint: string;
    socials: {
      name: string;
      url: string;
      icon: string;
    }[];
  };
  techStack: TechItem[];
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
}

export const PORTFOLIO_DATA: PortfolioConfig = {
  // --------------------------------------------------------------------------
  // 1. PERSONAL INFORMATION
  // --------------------------------------------------------------------------
  personal: {
    name: "Merga Mekonnen",
    firstName: "MERGA",
    lastName: "MEKONNEN",
    targetRole: "Software Engineer",
    location: "Addis Ababa, Ethiopia",
    resumeUrl: "https://drive.google.com/file/d/1QZ-gP4PoZAOQIPZuYENoHSLqHFwcRdI5/view?usp=sharing",

    // [MY BIO] - 2-3 short paragraphs (~100-150 words total)
    bioParagraphs: [
      "Software Engineering student and A2SVian based in Ethiopia with a strong foundation in scalable system architectures, distributed backend services, and algorithmic problem solving.",
      "Experienced in engineering high-performance web applications using modern React, Next.js, Go (Gin), Python (Django), and containerized cloud environments.",
      "Driven by competitive programming discipline and human-centric design, I build robust software that solves practical real-world challenges while delivering fast, intuitive user experiences."
    ],

    expertise: "Specializing in Full-Stack Systems and Competitive Programming. I thrive on optimizing algorithms while building scalable, end-to-end architectures that perform reliably under production load.",

    // Philosophy: 1-2 concise sentences
    philosophy: "I believe in the power of meticulous planning. For me, every project is a delicate balance between aesthetic design and robust logic paying attention to every detail.",

    calloutQuote: "What sets me apart is a unique blend of problem-solving, leadership, and communication. I don't just write code; I lead projects with a vision, ensuring that technical excellence meets human-centric design. My journey as an A2SVian has forged a relentless drive to innovate."
  },

  // --------------------------------------------------------------------------
  // 2. CONTACT INFORMATION & SOCIAL NETWORKS
  // --------------------------------------------------------------------------
  contact: {
    email: "mergashasho7@gmail.com",
    phone: "+251 966 203 485",
    location: "Addis Ababa, Ethiopia",
    formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID_HERE",

    socials: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/merga-mekonnen-a524502a0/",
        icon: "https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/linkedin/default.svg"
      },
      {
        name: "GitHub",
        url: "https://github.com/MagMC007",
        icon: "https://skillicons.dev/icons?i=github"
      },
      {
        name: "LeetCode",
        url: "https://leetcode.com/u/MagMC007/",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/leetcode/leetcode-original.svg"
      },
      {
        name: "Codeforces",
        url: "https://codeforces.com/profile/MagMC",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeforces/codeforces-original.svg"
      },
      {
        name: "Telegram",
        url: "https://t.me/MagMVP",
        icon: "https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/telegram/default.svg"
      },
      {
        name: "X",
        url: "https://x.com/Merga132555",
        icon: "https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 3. TECH STACK (Categorized with official logos)
  // --------------------------------------------------------------------------
  techStack: [
    // Languages
    { name: "JavaScript", category: "Languages", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "TypeScript", category: "Languages", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Python", category: "Languages", src: "https://skillicons.dev/icons?i=py" },
    { name: "Go", category: "Languages", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },

    // Frontend
    { name: "React", category: "Frontend", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", category: "Frontend", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "Redux", category: "Frontend", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
    { name: "Tailwind", category: "Frontend", src: "https://skillicons.dev/icons?i=tailwind" },

    // Backend
    { name: "Django", category: "Backend", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
    { name: "Gin", category: "Backend", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
    { name: "Node.js", category: "Backend", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Express.js", category: "Backend", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "PostgreSQL", category: "Backend", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "MongoDB", category: "Backend", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },

    // Infra
    { name: "CI/CD", category: "Infra", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg" },
    { name: "GitHub Actions", category: "Infra", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg" },
    { name: "Docker", category: "Infra", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Azure", category: "Infra", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },

    // Tools
    { name: "Postman", category: "Tools", src: "https://skillicons.dev/icons?i=postman" },
    { name: "VS Code", category: "Tools", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
    { name: "Git", category: "Tools", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" }
  ],

  // --------------------------------------------------------------------------
  // 4. EDUCATION TIMELINE [MY EDUCATION]
  // --------------------------------------------------------------------------
  education: [
    {
      id: "edu-1",
      degree: "B.Sc. in Software Engineering",
      school: "Addis Ababa University",
      period: "2022 — Present",
      location: "Addis Ababa, Ethiopia",
      highlights: [
        "Major GPA: 3.8 / 4.0 · Dean's List for Academic Excellence",
        "Relevant Coursework: Data Structures & Algorithms, Distributed Systems, Database Management, Operating Systems, Computer Networks",
        "Capstone: Scalable Microservice Architecture for Distributed Resource Allocation"
      ]
    },
    {
      id: "edu-2",
      degree: "Competitive Programming & Software Engineering Fellowship",
      school: "Africa to Silicon Valley (A2SV)",
      period: "2023 — Present",
      location: "Addis Ababa, Ethiopia",
      highlights: [
        "Rigorous algorithmic problem solving: solved 600+ LeetCode & Codeforces problems in graphs, dynamic programming, and advanced data structures",
        "Trained in high-standards software engineering practices, system design, CI/CD pipelines, and agile teamwork with industry mentors"
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 5. EXPERIENCE TIMELINE [MY EXPERIENCE]
  // --------------------------------------------------------------------------
  experience: [
    {
      id: "exp-1",
      role: "Software Engineer (Fellow / Intern)",
      organization: "A2SV Inc.",
      period: "2024 — Present",
      location: "Remote / Addis Ababa",
      type: "Internship",
      bullets: [
        "Architected scalable backend microservices using Go (Gin) and PostgreSQL, reducing endpoint response latency by 35% through Redis caching and query indexing.",
        "Collaborated with cross-functional engineering teams to implement clean React/TypeScript frontends with strict WCAG accessibility and responsive design."
      ],
      techStack: ["Go", "Gin", "PostgreSQL", "React", "TypeScript", "Docker"]
    },
    {
      id: "exp-2",
      role: "Backend & Systems Developer",
      organization: "Freelance & University Tech Hub",
      period: "2023 — 2024",
      location: "Addis Ababa, Ethiopia",
      type: "Freelance",
      bullets: [
        "Built enterprise student-management and scheduling APIs using Django and PostgreSQL, supporting 2,500+ daily active student sessions with 99.9% uptime.",
        "Engineered automated GitHub Actions CI/CD workflows and containerized deployments with Docker and Azure App Services."
      ],
      techStack: ["Python", "Django", "PostgreSQL", "Docker", "Azure", "GitHub Actions"]
    },
    {
      id: "exp-3",
      role: "Hackathon Lead & Open Source Contributor",
      organization: "GDG & Tech Communities",
      period: "2023 — 2024",
      location: "Addis Ababa, Ethiopia",
      type: "Hackathon",
      bullets: [
        "Won 1st Place at national student hackathon by pitching and building a real-time humanitarian logistics tracking platform in under 48 hours.",
        "Actively contributed to open-source developer tooling and mentored junior students in data structures and git workflows."
      ],
      techStack: ["React", "Node.js", "MongoDB", "WebSockets"]
    }
  ],

  // --------------------------------------------------------------------------
  // 6. SELECTED WORKS (Projects with In-Depth Case Studies)
  // --------------------------------------------------------------------------
  projects: [
    {
      id: "proj-1",
      number: "01",
      title: "DevPulse – Distributed Observability Platform",
      description: "A high-throughput developer telemetry and log analysis platform built with Go, PostgreSQL, and React. Delivers real-time query tracing and latency dashboards.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      tags: ["Go", "PostgreSQL", "React", "Docker", "Redis"],
      liveUrl: "https://github.com/MagMC007",
      githubUrl: "https://github.com/MagMC007",
      caseStudy: {
        overview: "Engineered a low-latency telemetry ingestion pipeline processing 15,000+ metric points/sec with real-time anomaly detection, interactive waterfall traces, and automated alerts.",
        role: "Lead Systems Architect & Full-Stack Developer",
        timeline: "3 Months (2024)",
        problem: "Development teams struggle with bloated, expensive APM solutions requiring complex agent setups. DevPulse offers an ultra-lightweight daemon with sub-25ms query latency.",
        architecture: [
          "Go & Gin microservice handling asynchronous batched streaming into ring buffers",
          "Partitioned PostgreSQL time-series schema with Redis in-memory cache",
          "Responsive React client with virtualized waterfall trace rendering"
        ],
        challenges: [
          {
            challenge: "Database write bottlenecks under bursts of 20,000 concurrent events.",
            solution: "Implemented an in-memory worker queue with bulk insert staging, reducing write IOPS by 78%."
          },
          {
            challenge: "Rendering large distributed trace trees without browser frame drops.",
            solution: "Created virtualized DOM rendering maintaining steady 60 FPS scrolling for 10,000+ spans."
          }
        ],
        metrics: [
          { value: "< 18ms", label: "p99 Ingestion Latency" },
          { value: "15K+", label: "Events / Sec" },
          { value: "78%", label: "IOPS Reduction" },
          { value: "99.9%", label: "Uptime" }
        ]
      }
    },
    {
      id: "proj-2",
      number: "02",
      title: "SyncCanvas – Real-Time Collaborative Workspace",
      description: "Collaborative whiteboard and architectural canvas enabling concurrent multi-user diagramming, operational transformation, and team document streaming.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      tags: ["Next.js", "TypeScript", "Tailwind", "WebSockets", "Node.js"],
      liveUrl: "https://github.com/MagMC007",
      githubUrl: "https://github.com/MagMC007",
      caseStudy: {
        overview: "A distributed multiplayer design canvas allowing engineering teams to sketch system architectures and co-edit diagrams in real time with sub-40ms synchronization.",
        role: "Frontend & Real-Time Protocol Engineer",
        timeline: "2 Months (2024)",
        problem: "Remote teams lack zero-latency tools for rapid architectural whiteboarding during sprints without heavy login walls or lagging video sharing.",
        architecture: [
          "Hardware-accelerated HTML5 Canvas 2D engine rendering bezier curves and connectors",
          "Lean action-based delta message protocol over WebSockets (< 5 KB/s bandwidth)",
          "Next.js App Router with IndexedDB local cache for offline session resilience"
        ],
        challenges: [
          {
            challenge: "Handling concurrent stroke edits without cursor jump or visual jitter.",
            solution: "Decoupled rendering into an authoritative background canvas and a client-side speculative buffer with cursor interpolation."
          }
        ],
        metrics: [
          { value: "< 35ms", label: "Sync Latency" },
          { value: "60 FPS", label: "Render Frame Rate" },
          { value: "50+", label: "Concurrent Peers" },
          { value: "100%", label: "Data Integrity" }
        ]
      }
    },
    {
      id: "proj-3",
      number: "03",
      title: "OmniFlow – Micro-Fintech Transaction Engine",
      description: "Robust transactional ledger and double-entry accounting API designed with Django REST framework, PostgreSQL ACID transactions, and automated audit trails.",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
      tags: ["Python", "Django", "PostgreSQL", "CI/CD", "Docker"],
      liveUrl: "https://github.com/MagMC007",
      githubUrl: "https://github.com/MagMC007",
      caseStudy: {
        overview: "Secure double-entry transactional accounting API with mathematical invariance guarantees, cryptographic audit logs, and automated reconciliation.",
        role: "Backend Architect",
        timeline: "2 Months (2024)",
        problem: "Naive balance updates in web apps lead to race conditions and account drift. OmniFlow guarantees zero balance drift via strict ACID boundaries.",
        architecture: [
          "Double-entry bookkeeping enforcing debits equal credits in every atomic transaction",
          "Pessimistic row-level locking (SELECT FOR UPDATE) preventing concurrent overdrafts",
          "Idempotency-Key caching in Redis guaranteeing safe retry operations"
        ],
        challenges: [
          {
            challenge: "Preventing deadlocks when accounts transfer funds mutually at the same millisecond.",
            solution: "Enforced deterministic account UUID ordering for all row acquisitions, eliminating circular waits."
          }
        ],
        metrics: [
          { value: "0", label: "Invariant Violations" },
          { value: "100%", label: "Idempotent Safety" },
          { value: "85+", label: "Automated Tests" },
          { value: "< 22ms", label: "Execution Time" }
        ]
      }
    },
    {
      id: "proj-4",
      number: "04",
      title: "AlgoVisualizer – Interactive Code Algorithm Lab",
      description: "Interactive visual simulator for graph traversals, shortest-path algorithms (Dijkstra, A*), and dynamic programming memory matrices built for university students.",
      image: "https://images.unsplash.com/photo-1516116211227-bbc0ff554f67?auto=format&fit=crop&w=1200&q=80",
      tags: ["React", "TypeScript", "Canvas API", "Tailwind"],
      liveUrl: "https://github.com/MagMC007",
      githubUrl: "https://github.com/MagMC007",
      caseStudy: {
        overview: "Educational algorithm visualizer demonstrating complex graph searches, dynamic programming memoization grids, and tree rebalancing step-by-step.",
        role: "Creator & Frontend Developer",
        timeline: "1 Month (2023)",
        problem: "Computer science students struggle to build mental models of abstract graph theory and recursion without interactive step-through controls.",
        architecture: [
          "Generator-function execution engine pausing algorithm loops between frames",
          "Interactive graph node editor allowing custom weight and edge creation",
          "Clean React + Canvas rendering with speed controls and call-stack introspection"
        ],
        challenges: [
          {
            challenge: "Managing step-by-step state pausing without freezing the browser event loop.",
            solution: "Refactored traversal routines into ES6 generator yields mapped to requestAnimationFrame steps."
          }
        ],
        metrics: [
          { value: "12+", label: "Algorithms Visualized" },
          { value: "60 FPS", label: "Animation Smoothness" },
          { value: "500+", label: "Student Users" },
          { value: "100%", label: "Client-Side Executed" }
        ]
      }
    }
  ]
};
