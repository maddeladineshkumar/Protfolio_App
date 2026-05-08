import { Code2, Cpu, Database, Layout, Server, Sparkles, Binary, ChartBar } from 'lucide-react';

export const portfolioData = {
  hero: {
    name: "M Dinesh Kumar",
    title: "AI & Data Science Developer",
    tagline: "I design intelligent systems that combine data, logic, and user experience to solve real-world problems.",
    supportingLine: "Focused on building AI-driven applications with scalable architecture and modern web technologies."
  },
  about: {
    intro: "I am an AI & Data Science student at Amrita Vishwa Vidyapeetham with a strong interest in intelligent systems, software architecture, and modern web technologies. I enjoy building applications that combine logic, design, and real-world usability.",
    growth: "As a first-year student, I focus on learning by building practical projects that strengthen both technical understanding and problem-solving ability.",
    vision: "My goal is to create scalable AI-driven solutions that improve user experience and solve meaningful problems.",
    stats: [
      { label: "Projects", value: 2, suffix: "+" },
      { label: "Technologies", value: 8, suffix: "+" },
      { label: "Focus", value: "AI + Web", suffix: "" },
      { label: "Year", value: "1st", suffix: "" }
    ]
  },
  skills: [
    {
      category: "Programming Languages",
      items: [
        { name: "Java (OOP)", icon: Code2 },
        { name: "Python", icon: Binary },
        { name: "C", icon: Cpu },
        { name: "JavaScript", icon: Layout }
      ]
    },
    {
      category: "Web Technologies",
      items: [
        { name: "HTML / CSS", icon: Layout },
        { name: "Tailwind CSS", icon: Sparkles }
      ]
    },
    {
      category: "AI & Data",
      items: [
        { name: "AI Fundamentals", icon: Cpu },
        { name: "MATLAB", icon: Database }
      ]
    },
    {
      category: "Core Concepts",
      items: [
        { name: "OOP & Architecture", icon: Server },
        { name: "Problem Solving", icon: Binary },
        { name: "UI/UX Thinking", icon: Sparkles }
      ]
    }
  ],
  projects: [
    {
      id: "bio-match-omni",
      title: "Bio-Match Omni",
      tagline: "An AI-powered MedTech platform for precise, data-backed implant decisions.",
      description: "Problem: Guesswork in orthopaedic implant selection often leads to biomechanical incompatibilities and costly revision surgeries. Solution: An AI-powered MedTech platform that uses RAG, 3D visualization, and predictive modeling for precise, data-backed implant decisions.",
      features: [
        "Instant RAG AI Assistant (<1.2s response)",
        "Interactive 3D Anatomy Viewer (60 FPS)",
        "Predictive Implant Lifespan Modelling",
        "Automated Biomaterial Research"
      ],
      technologies: ["Next.js", "Three.js", "Gemini/Groq", "Tailwind CSS"],
      links: {
        github: "https://github.com/maddeladineshkumar/bio-match-omni",
        live: "https://itsdinesh.online"
      }
    },
    {
      id: "optimal-diet-ai",
      title: "Optimal Diet Planner",
      tagline: "A personalized nutrition platform leveraging AI for customized meal plans and real-time guidance.",
      description: "Problem: Generic diet plans ignore individual metabolic variations and preferences, leading to poor adherence and missed fitness goals. Solution: A personalized nutrition platform that leverages AI to generate customized meal plans, track macros, and provide real-time dietary guidance.",
      features: [
        "Instant AI Dietitian Chatbot",
        "Dynamic Macro & Calorie Calculator",
        "Custom Meal Plan Generation",
        "Downloadable Prescription PDFs"
      ],
      technologies: ["React", "TypeScript", "Tailwind CSS", "Google Gemini AI", "Framer Motion"],
      links: {
        github: "https://github.com/maddeladineshkumar/Optimal_diet",
        live: "https://optimal-diet-lffop6hdv-maddeladineshkumars-projects.vercel.app/"
      }
    }
  ],
  journey: [
    {
      year: "2025",
      title: "Started AI & Data Science",
      description: "Began my journey in B.Tech Artificial Intelligence & Data Science at Amrita Vishwa Vidyapeetham."
    },
    {
      year: "2025",
      title: "Mastered Core Concepts",
      description: "Learned Java OOP, Python, and foundational data structures."
    },
    {
      year: "2025",
      title: "Built First AI Projects",
      description: "Developed AI-driven applications like Bio-Match Omni and Optimal Diet AI."
    },
    {
      year: "Current",
      title: "Exploring Scalable Systems",
      description: "Focusing on modern web architecture and scalable intelligent systems."
    }
  ],
  education: {
    institution: "Amrita Vishwa Vidyapeetham",
    degree: "B.Tech — Artificial Intelligence & Data Science",
    status: "First Year Student",
    focus: ["AI", "Data Science", "Software Development", "Problem Solving"]
  },
  contact: {
    email: "maddeladineshkumar504@gmail.com",
    github: "https://github.com/maddeladineshkumar",
    linkedin: "https://www.linkedin.com/in/maddela-dinesh-kumar?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    instagram: "https://www.instagram.com/ig.dinesh_?igsh=c2plZzJvMDg1M2l0"
  }
};
