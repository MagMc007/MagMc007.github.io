/**
 * ==============================================================================
 * PORTFOLIO CONFIGURATION & DATA FILE
 * ==============================================================================
 */

import experienceData from "./experience.json";
import projectsData from "./projects.json";
import contactData from "./contact.json";

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
  team?: string;
  contribution?: string;
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
  tagline?: string;
  role?: string;
  team?: string;
  contribution?: string;
  duration?: string;
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
    email: contactData.directMessage.email,
    phone: contactData.directMessage.phone,
    location: "Addis Ababa, Ethiopia",
    formspreeEndpoint: contactData.directMessage.formspreeEndpoint,
    socials: contactData.socialsSection.socials
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
  education: experienceData.education.items as EducationItem[],

  // --------------------------------------------------------------------------
  // 5. EXPERIENCE TIMELINE [MY EXPERIENCE]
  // --------------------------------------------------------------------------
  experience: experienceData.experience.items as ExperienceItem[],

  // --------------------------------------------------------------------------
  // 6. SELECTED WORKS (Projects with In-Depth Case Studies)
  // --------------------------------------------------------------------------
  projects: projectsData.projects as unknown as ProjectItem[]
};
