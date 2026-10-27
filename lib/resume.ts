// single source of truth for the resume page and every export (PDF, Word, Markdown, JSON)

export interface Experience {
  role: string;
  company: string;
  start: string; // YYYY-MM
  end?: string; // YYYY-MM, missing = present
  type?: string;
  location?: string;
  intro?: string;
  stack: string[];
  highlights: string[];
}

export interface Project {
  name: string;
  description: string;
  stack: string[];
  start?: string;
  end?: string;
  url?: string;
}

const yearsOfExperience = new Date().getFullYear() - 2020;

export const resume = {
  updated: "2026-10-27",
  name: "Felix Dusengimana",
  headline: "Software Engineer",
  location: "Kigali, Rwanda",
  email: "phelixdusengimana@gmail.com",
  phone: "+250 784 483 142",
  website: "https://feldux.com",
  profiles: [
    { network: "LinkedIn", url: "https://linkedin.com/in/felixdusengimana" },
    { network: "GitHub", url: "https://github.com/felixdusengimana" },
  ],
  summary:
    `Felix is a Software Engineer with ${yearsOfExperience} years of engineering expertise, building scalable software across backend, web and mobile. Spearheading development initiatives, he has successfully led teams and executed many user-centric applications in fast-paced environments. Adept in architectural and aesthetic aspects, he thoroughly understands modern software technologies and Agile frameworks. Skilled in fostering a collaborative team dynamic, Felix thrives in mentorship and project management roles, ensuring the seamless delivery of high-performance software and visually compelling user interfaces.`,
  expertise: [
    "Java (Spring Boot)",
    "Kotlin",
    "Node.js (JavaScript and TypeScript)",
    "Python (Flask and Django)",
    "Flutter & React Native",
    "React (Next.js) and Angular",
    "Databases (PostgreSQL, MongoDB, Redis, SQLite)",
    "CI/CD and Docker",
    "Infrastructure as Code (Terraform and Ansible)",
    "Microservices and Micro Frontends",
    "Optimizing and scaling applications",
    "Configuring and managing servers",
  ],
  experience: [
    {
      role: "Senior Software Engineer Consultant",
      company: "Irembo",
      start: "2026-04",
      location: "Kigali, Rwanda · On-site",
      intro:
        "Contributing to the design, development, and continuous improvement of digital platforms that simplify access to government and private sector services. Collaborating with cross-functional teams to deliver scalable, secure, and reliable solutions while contributing to technical discussions, system design, and architectural decisions.",
      stack: ["Spring Boot", "Angular", "CI/CD", "Docker", "Java", "TypeScript", "REST", "PostgreSQL", "JPA", "React", "Next.js", "Agile", "System Design"],
      highlights: [
        "Collaborating with stakeholders to analyze business requirements and translate them into technical solutions",
        "Contributing to technical decision-making, system design discussions, and architecture reviews",
        "Creating and maintaining C4 diagrams to document system context, containers, components, and system interactions",
        "Developing and maintaining backend services using Spring Boot, Java, and PostgreSQL",
        "Building responsive and maintainable frontend applications with React/Next.js and TypeScript",
        "Designing, implementing, and integrating RESTful APIs across internal and external systems",
        "Implementing secure authentication, authorization, and data protection mechanisms",
        "Monitoring, troubleshooting, and optimizing application performance, scalability, and maintainability",
        "Reviewing code and promoting engineering best practices to maintain high code quality standards",
        "Collaborating with product, design, and engineering teams to deliver user-centered digital services",
        "Supporting continuous improvement initiatives through knowledge sharing, technical feedback, and process enhancements",
      ],
    },
    {
      role: "Software Engineer",
      company: "PivotAccess",
      start: "2023-02",
      end: "2026-04",
      type: "Full-time",
      location: "Kigali, Rwanda · On-site",
      intro:
        "Contributed to the development of Tekana, a platform that streamlines operations for the Rwanda National Police. Collaborated with teams to ensure the system's architecture, security, and user interface met operational needs.",
      stack: ["Spring Boot", "Next.js", "CI/CD", "Docker", "PostgreSQL", "Java", "TypeScript", "REST", "Go", "JPA", "Grafana"],
      highlights: [
        "Collaborated with cross-functional teams to develop Tekana, a platform for Rwanda National Police operations",
        "Created and maintained the Tekana UI Kit with TypeScript to streamline frontend development",
        "Implemented Atomic Design principles for a scalable and consistent UI",
        "Developed and maintained a Spring Boot microservice with RBAC for secure user management",
        "Used Grafana to monitor and optimize system performance, ensuring reliability and scalability",
        "Troubleshot and resolved bugs to ensure smooth platform operation",
        "Set up automated tests for frontend and backend to maintain code quality",
        "Reviewed code and promoted best practices within the development team",
        "Developed a desktop utility in Go that collects and exposes system information (device name, IP address, OS details, and hardware metadata) to the platform, enabling administrators to monitor candidate workstations, improve system diagnostics and prevent cheating",
      ],
    },
    {
      role: "Software Engineer",
      company: "Stylos Consult",
      start: "2022-09",
      end: "2023-02",
      type: "Full-time",
      location: "Kigali, Rwanda · On-site",
      intro:
        "Led a team of front-end developers in creating three successful web applications. Actively participated in project planning, task estimation, and sprint planning meetings, ensuring code quality, performance, and maintainability.",
      stack: ["React", "Next.js", "CI/CD", "Docker", "Tailwind CSS", "Node.js", "PostCSS", "TypeScript", "REST", "Express", "Redux", "PHP (Laravel)", "Spring Boot", "MongoDB", "DigitalOcean", "GitHub Actions"],
      highlights: [
        "Collaborated closely with UI/UX designers and back-end developers, ensuring seamless integration, which resulted in a 20% increase in project delivery speed",
        "Optimized front-end code for speed and performance, achieving a 30% improvement in page load times",
        "Transformed design concepts into responsive and dynamic user interfaces",
        "Conducted comprehensive code reviews, providing constructive feedback",
        "Developed reusable components and libraries",
        "Used modern front-end frameworks such as React.js, Next.js, and Tailwind",
        "Mentored junior developers, offering guidance and sharing best practices",
        "Organized knowledge-sharing sessions to foster professional growth within the team",
        "Collaborated with QA testers to identify and resolve front-end bugs",
        "Deployed applications on DigitalOcean using GitHub Actions and Docker",
        "Managed the creation of employee emails via cPanel",
        "Resolved technical issues arising in production",
        "Developed, tested, and deployed products using the MERN stack",
        "Designed new features, data-flow diagrams, and other UML diagrams",
      ],
    },
    {
      role: "Frontend Developer",
      company: "Grade Arc",
      start: "2022-01",
      end: "2022-09",
      type: "Contract",
      location: "Minneapolis, US · Remote",
      stack: ["React", "Node.js", "CSS-in-JS", "PayPal", "Authorize.Net", "Agile"],
      highlights: [
        "Implemented features using React and Node.js",
        "Built responsive interfaces with CSS-in-JS",
        "Tested and debugged rigorously across browsers and devices",
        "Took part in agile sprint planning, code reviews, and continuous integration",
        "Created e-learning sites integrated with PayPal and Authorize.Net",
      ],
    },
    {
      role: "Frontend Developer",
      company: "PMG Rwanda",
      start: "2020-01",
      end: "2022-01",
      type: "Part-time",
      location: "Kigali, Rwanda · Hybrid",
      stack: ["TypeScript", "JavaScript", "React Native", "Angular", "Node.js", "GraphQL", "MongoDB", "SQL", "Webpack", "Docker", "PHP"],
      highlights: [
        "Mentored developers through code reviews",
        "Designed features and architecture with UML diagrams",
        "Modernized a legacy PHP codebase to TypeScript",
        "Built client-facing products with Webpack, TypeScript, SQL, React Native, Angular, Docker, GraphQL, MongoDB, and Node.js",
        "Wrote test cases to keep releases reliable",
      ],
    },
    {
      role: "Full Stack Developer",
      company: "Rwanda TVET Board",
      start: "2019-10",
      end: "2021-03",
      type: "Part-time",
      location: "Kigali, Rwanda · Hybrid",
      stack: ["React", "Redux", "Spring Boot", "PostgreSQL", "Linux", "Jenkins", "Docker", "PM2", "DigitalOcean", "GitHub Actions"],
      highlights: [
        "Built a full-stack application with React, Redux, Spring Boot, and PostgreSQL",
        "Deployed on DigitalOcean with GitHub Actions, Jenkins, Docker, and PM2",
        "Ran code evaluations and reviews",
        "Designed data flows with UML diagrams",
        "Wrote test cases for new features",
      ],
    },
    {
      role: "Mobile Engineer",
      company: "Mongasoft",
      start: "2019-08",
      end: "2020-02",
      type: "Part-time",
      location: "Kigali, Rwanda · Remote",
      stack: ["React Native", "TypeScript", "REST"],
      highlights: [
        "Built mobile apps with React Native and TypeScript",
        "Developed backend APIs for the apps",
        "Worked with cross-functional teams across the full product lifecycle",
      ],
    },
  ] as Experience[],
  projects: [
    {
      name: "Rapide Taxi App",
      description:
        "Actively maintaining the Python backend and Angular frontend of a fast, reliable taxi platform in Kigali, handling ride booking, dispatch logic, secure payments, and real-time updates for thousands of drivers and riders.",
      stack: ["Python", "Angular"],
    },
    {
      name: "RateLimiter",
      description:
        "A backend service that implements API rate limiting to prevent abuse and ensure fair usage of system resources. Tracks request frequency per client and enforces configurable limits to protect backend services from excessive traffic.",
      stack: ["Spring Boot", "Java"],
    },
    {
      name: "@frjoy/otp",
      description:
        "Open-source, headless OTP input for React published on npm, with SMS autofill, paste handling, keyboard navigation and right-to-left support. Includes docs, a Storybook playground and automated tests.",
      stack: ["React", "TypeScript", "Storybook"],
      url: "https://feldux.com/packages/otp",
    },
    {
      name: "feldux.com",
      description:
        "Personal website with a blog and package documentation: light, dark and system themes, structured data and share metadata for SEO, and this interactive resume with PDF, Word, Markdown and JSON exports.",
      stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      url: "https://feldux.com",
    },
    {
      name: "Twika",
      description:
        "A social media web app for people from all communities to share text, images, videos, and games, including fun content and memes. React front end with a Node.js back end.",
      stack: ["React", "Node.js"],
      start: "2020-11",
      end: "2021-01",
    },
    {
      name: "LuckyScore",
      description:
        "A side project to record match events between classes at school and a neighboring school, built because it was hard to keep track of them.",
      stack: ["Vue", "Vite", "Supabase"],
      start: "2019-04",
      end: "2020-02",
    },
  ] as Project[],
  education: [
    {
      title: "BSc. (Hons) Software Engineering",
      school: "African Leadership University",
      location: "Kigali, Rwanda",
      start: "2023-09",
      end: "2026-08",
    },
    {
      title: "Advanced Level Diploma in Software Programming and Embedded Systems",
      school: "Rwanda Coding Academy",
      location: "Nyabihu, Rwanda",
      start: "2019-02",
      end: "2022-07",
    },
  ],
  awards: [
    { title: "Best Coder of the Year (2019)", issuer: "Rwanda Coding Academy" },
    { title: "Best Coder of the Term (3 times)", issuer: "Rwanda Coding Academy" },
    { title: "Frontend Developer of the Year", issuer: "Rwanda TVET Board" },
    { title: "Responsive Web Design", issuer: "SoloLearn", url: "https://www.sololearn.com/Certificate/CT-SCQPKJ15/jpg" },
    { title: "Coursera courses: Kubernetes, Docker CI/CD, Python Programming", issuer: "Coursera" },
  ],
  languages: [
    { name: "Kinyarwanda", level: "Native" },
    { name: "English", level: "Professional" },
    { name: "Kiswahili", level: "Proficient" },
    { name: "French", level: "Beginner" },
  ],
  additionalSkills: ["Docker", "AWS", "Google Cloud", "GitHub", "GitLab CI/CD", "Java", "Python", "Spring Boot", "Angular", "Svelte", "Vue", "MongoDB", "Redis", "Sass", "Jest", "JUnit", "GraphQL", "Linux", "SQL", "Jira", "Slack", "Discord", "Microsoft 365"],
  hobbies: ["Board games", "Reading", "Athletics (basketball and football)", "Arts & design", "Psychology", "Sociology", "Philosophy", "Cooking and recipes", "Traveling and sky-diving", "Dramatic cinema and theatre", "Awareness meditation", "Storytelling"],
};

export type Resume = typeof resume;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const formatMonth = (ym?: string) => {
  if (!ym) return "Present";
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
};
export const formatRange = (start: string, end?: string) => `${formatMonth(start)} – ${formatMonth(end)}`;

// every technology mentioned in experience or projects, most used first
export function allSkills(r: Resume = resume) {
  const count = new Map<string, number>();
  [...r.experience, ...r.projects].forEach((item) => item.stack.forEach((s) => count.set(s, (count.get(s) ?? 0) + 1)));
  return Array.from(count.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([s]) => s);
}

export const SECTIONS = {
  summary: "Summary",
  skills: "Skills filter",
  experience: "Experience",
  projects: "Projects",
  expertise: "Areas of expertise",
  education: "Education",
  awards: "Certificates and awards",
  languages: "Languages",
  additionalSkills: "Additional skills",
  hobbies: "Hobbies and interests",
} as const;
export type Section = keyof typeof SECTIONS;

// what a visitor chose to show; limits at their max mean "all"
export interface View { hidden: Section[]; roles: number; projects: number; points: number; }
export const MAX = {
  roles: resume.experience.length,
  projects: resume.projects.length,
  points: Math.max(...resume.experience.map((e) => e.highlights.length)),
};
export const fullView: View = { hidden: [], roles: MAX.roles, projects: MAX.projects, points: MAX.points };

export function parseView(query: string): View {
  const q = new URLSearchParams(query);
  const num = (key: keyof typeof MAX) => {
    const n = parseInt(q.get(key) ?? "", 10);
    return n >= 1 ? Math.min(n, MAX[key]) : MAX[key];
  };
  const hidden = (q.get("hide") ?? "").split(",").filter((s): s is Section => s in SECTIONS);
  return { hidden, roles: num("roles"), projects: num("projects"), points: num("points") };
}

export function stringifyView(v: View) {
  const q = new URLSearchParams();
  if (v.hidden.length) q.set("hide", v.hidden.join(","));
  (Object.keys(MAX) as (keyof typeof MAX)[]).forEach((k) => v[k] < MAX[k] && q.set(k, String(v[k])));
  return q.toString().replace(/%2C/g, ",");
}

// hidden sections come back empty so the page and every export can skip them
export function applyView(r: Resume, v: View): Resume {
  const off = (s: Section) => v.hidden.includes(s);
  return {
    ...r,
    summary: off("summary") ? "" : r.summary,
    experience: off("experience") ? [] : r.experience.slice(0, v.roles).map((e) => ({ ...e, highlights: e.highlights.slice(0, v.points) })),
    projects: off("projects") ? [] : r.projects.slice(0, v.projects),
    expertise: off("expertise") ? [] : r.expertise,
    education: off("education") ? [] : r.education,
    awards: off("awards") ? [] : r.awards,
    languages: off("languages") ? [] : r.languages,
    additionalSkills: off("additionalSkills") ? [] : r.additionalSkills,
    hobbies: off("hobbies") ? [] : r.hobbies,
  };
}

export const roleMeta = (e: Experience) => [formatRange(e.start, e.end), e.type, e.location].filter(Boolean).join(" · ");
