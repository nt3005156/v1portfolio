export const personalData = {
  name: "Nitesh Kr Thakur",
  firstName: "Nitesh",
  lastName: "Thakur",
  tagline: "I teach CS like I’m explaining it to my younger brother",
  roles: ["Full-Stack Developer", "CS Educator", "NEB Mentor", "Builder"],
  bio: "Hey! I'm Nitesh — the guy who once failed to compile a simple C program because of a missing semicolon, and now teaches 1000+ students how to avoid the same headache. I build websites that actually help you study, not just look pretty.",
  longBio: "Honestly, I didn't start as a topper. I was the student who wrote notes three times just to remember what normalization means. That struggle taught me how to teach. For the last 5+ years in Kathmandu, I've been breaking down Class 11/12 Computer Science into small, honest stories — why DBMS matters in real shops, how networking is just like passing chits in class. No fancy jargon unless I explain it first. If you're here to actually understand and score well without mugging up, you're in the right place.",
  location: "Kathmandu, Nepal",
  email: "nitesh.thakur.edu.np@gmail.com",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com"
  },
  stats: [
    { label: "Students who stuck around", value: "1000+" },
    { label: "Projects that actually shipped", value: "50+" },
    { label: "Years of figuring it out", value: "5+" },
  ],
  currentEngaged: [
    { name: "RIMS", level: "+2", desc: "Plus 2 - Computer Science" },
    { name: "SRSS", level: "+2", desc: "Plus 2 - CS / Management" },
    { name: "APS", level: "+2", desc: "Plus 2 - With practical labs" },
    { name: "PSS", level: "9,10", desc: "Grade 9, 10 - Foundation CS & Math" },
    { name: "RSS", level: "6,7,8,9,10", desc: "Grade 6,7,8,9,10 - Junior to SEE prep" },
  ]
}

export const skillsData = [
  {
    category: "Frontend — What you see",
    icon: "🎨",
    color: "from-violet-500 to-fuchsia-500",
    skills: [
      { name: "React / Next.js (my daily bread)", level: 95 },
      { name: "TypeScript — saves me from silly bugs", level: 90 },
      { name: "Framer Motion — for that smooth feel", level: 88 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Making it fast on cheap phones", level: 85 },
    ]
  },
  {
    category: "Backend — Behind the curtain",
    icon: "⚙️",
    color: "from-cyan-500 to-blue-500",
    skills: [
      { name: "Node.js / Express", level: 90 },
      { name: "Python (for quick hacks)", level: 85 },
      { name: "Postgres / Mongo — data is messy", level: 88 },
      { name: "Docker / AWS — learned the hard way", level: 80 },
      { name: "System Design — so 1000 kids can open at once", level: 85 },
    ]
  },
  {
    category: "Teaching — The real skill",
    icon: "📚",
    color: "from-amber-500 to-orange-500",
    skills: [
      { name: "Turning boring chapters into stories", level: 95 },
      { name: "Data Structures — without scaring you", level: 90 },
      { name: "C / C++ / Python — my first loves", level: 92 },
      { name: "DBMS & Networking — the tricky ones", level: 88 },
      { name: "Listening to students", level: 96 },
    ]
  },
]

export const experienceData = [
  {
    id: 1,
    role: "Independent Developer & Full-time CS Teacher",
    org: "Freelance + My Own Classes - Where I've been and built",
    period: "2022 — Now",
    location: "Kathmandu",
    points: [
      "Built this Learning Hub because my own students kept losing PDFs in Viber groups — now 800+ kids from 12 schools use it",
      "Shipped 20+ real websites for small businesses — learned what actually breaks in production",
      "Wrote my own NEB notes in plain English because the textbook felt like it was written to confuse us",
      "Currently teaching at RIMS(+2), SRSS(+2), APS(+2), PSS(9,10), RSS(6-10) — different levels, same honesty"
    ],
    color: "violet"
  },
  {
    id: 2,
    role: "CS Teacher — The loud classroom guy",
    org: "Premier Academy + Schools Network",
    period: "2020 — 2022",
    location: "Kathmandu",
    points: [
      "Taught C, Python, DBMS to 500+ students — some who hated CS now score 80+",
      "Tried visual learning (diagrams, silly examples) and board results jumped 35%",
      "Started a small coding club with 0 budget, 3 laptops, and a lot of enthusiasm"
    ],
    color: "cyan"
  },
]

export const educationData = [
  {
    degree: "BE Computer",
    school: "Acme Engineering College",
    year: "2020 — 2025",
    detail: "Bachelor in Computer Engineering — focused on software, projects, and how to explain complex topics simply.",
  },
  {
    degree: "Diploma in Computer Engineering",
    school: "Acme Engineering College",
    year: "2017 — 2020",
    detail: "Diploma — where I first learned C, logic gates, and that missing semicolon can ruin your day.",
  },
  {
    degree: "SEE",
    school: "Padmodaya Secondary School",
    year: "Before 2017",
    detail: "SEE — foundation years, curiosity started here.",
  },
]

export const achievementsData = [
  { title: "Students' Choice — Favorite Sir", org: "My own students", desc: "Not an official award, but kids saying 'sir, now I get it' feels bigger" },
  { title: "1.2k Stars on GitHub", org: "Side projects", desc: "People actually use my notes and tools — wild" },
  { title: "Hackathon Winner", org: "Nepal Hacks", desc: "Built an offline notes app because internet goes off during exams" },
  { title: "1000+ Kids Taught", org: "In person + online", desc: "Some now in engineering, some teaching juniors — full circle" },
]

export const servicesData = [
  {
    title: "Websites that don't confuse people",
    desc: "I don't build fancy stuff just to show off. I build fast, simple sites that work on slow internet and cheap phones — because that's what my students use.",
    icon: "🚀",
    tags: ["React", "Next.js", "Real world"]
  },
  {
    title: "CS Tuition — No mugging up",
    desc: "Class 11/12 CS — we understand the why first, then the answer writes itself. Boards, practicals, viva — I'll be annoying until you get it.",
    icon: "🧭",
    tags: ["NEB", "C/C++", "Concept first"]
  },
  {
    title: "Notes that sound like me",
    desc: "I write notes the way I teach in class — some jokes, some warnings, some 'remember this for exam' scribbles. Not textbook copy-paste.",
    icon: "🗺️",
    tags: ["Honest", "Tested on students", "Updated"]
  },
]

export const dailyLogData = [
  { time: "09:00", text: "Class 12 — Tried explaining 3NF using tiffin boxes. Half got it, will try again tomorrow.", date: "Today" },
  { time: "11:30", text: "Made a quick quiz for binary — 42 kids already broke it, fixed 2 bugs.", date: "Today" },
  { time: "16:00", text: "One student finally deployed his portfolio. He was so happy he called me 'dai'.", date: "Today" },
]
