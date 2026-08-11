// Easily expandable learning hub data structure
// To add new class: push to classes array
// To add subject: push to class.subjects
// To add chapter: push to subject.chapters

export const learningData = {
  classes: [
    {
      id: "class-11",
      name: "Class 11",
      short: "11",
      description: "Foundation fundamentals — build your base right",
      color: "from-violet-600 to-indigo-600",
      accent: "#7c3aed",
      stats: { subjects: 4, chapters: 24, students: "420+" },
      subjects: [
        {
          id: "cs",
          name: "Computer Science",
          short: "CS",
          description: "NEB Class 11 Computer Science — from bits to logic gates",
          icon: "💻",
          color: "from-violet-600 to-indigo-600",
          chaptersCount: 8,
          chapters: [
            {
              id: "ch1-intro",
              title: "Computer System Overview",
              subtitle: "Introduction, Generations, Types",
              duration: "45 min",
              level: "Beginner",
              progress: 0,
              tags: ["Basics", "History"],
              materials: {
                notes: `**Computer** is an electronic device that processes data.

### What you must know:
- Characteristics: Speed, Accuracy, Diligence, Versatility
- Generations: Vacuum Tube → Transistor → IC → VLSI → AI
- Types: Analog, Digital, Hybrid
- Applications in Education, Business, Science

**Memory trick:** GIGO – Garbage In Garbage Out.

### Quick Diagram:
Input → [Processor + Memory] → Output
- Input: Keyboard, Mouse
- Output: Monitor, Printer
- Storage: Primary (RAM/ROM) & Secondary (HDD/SSD)`,

                importantQuestions: [
                  "Define computer and explain its characteristics with examples.",
                  "Differentiate between analog, digital and hybrid computers.",
                  "Explain generations of computer with technology used.",
                  "What is GIGO? Explain with example."
                ],
                mcqs: [
                  { q: "First generation computers used?", options: ["Transistor", "Vacuum Tube", "IC", "Microprocessor"], ans: 1 },
                  { q: "Which is not a characteristic of computer?", options: ["Speed", "Accuracy", "IQ", "Diligence"], ans: 2 }
                ],
                programs: [
                  { title: "Check computer type", lang: "python", code: `# Lesson: Types
def computer_type(purpose):
    if purpose == 'continuous': return 'Analog'
    return 'Digital'
print(computer_type('discrete'))` }
                ],
                pdfs: []
              }
            },
            {
              id: "ch2-number",
              title: "Number System & Conversion",
              subtitle: "Binary, Octal, Hexa & Conversions",
              duration: "60 min",
              level: "Beginner",
              progress: 0,
              tags: ["Number System", "Base"],
              materials: {
                notes: `### Number Systems:
- Binary (base 2): 0,1
- Octal (base 8): 0-7
- Decimal (base 10): 0-9
- Hexadecimal (base 16): 0-9, A-F

### Conversions:
- Binary to Decimal: (101)2 = 1*2^2 + 0*2^1 + 1*2^0 = 5
- Decimal to Binary: Division by 2 method

**Trick for boards:** Learn binary addition table by heart.`,
                importantQuestions: ["Convert 10110 to decimal", "Convert (25)10 to binary, octal, hex"],
                mcqs: [
                  { q: "Binary of 10 decimal is?", options: ["1010", "1001", "1100", "1011"], ans: 0 }
                ],
                programs: [
                  { title: "Binary to Decimal", lang: "c", code: `#include <stdio.h>\nint main(){\n int bin=1011, dec=0, base=1;\n while(bin>0){ dec += (bin%10)*base; base*=2; bin/=10; }\n printf("%d", dec);\n}` }
                ],
                pdfs: []
              }
            },
            {
              id: "ch3-logic",
              title: "Logic Gates & Boolean Algebra",
              subtitle: "AND, OR, NOT, Truth Tables",
              duration: "70 min",
              level: "Intermediate",
              progress: 0,
              tags: ["Logic", "Boolean"],
              materials: {
                notes: `**Gates are building blocks.**
- AND: Output 1 only if all inputs 1
- OR: Output 1 if any input 1
- NOT: Inverts

**Boolean Laws:** Commutative, Associative, Distributive, De Morgan's.

De Morgan: (A+B)' = A' . B'`,

                importantQuestions: ["Draw truth tables for AND, OR, NOT, NAND, NOR", "State and prove De Morgan's law"],
                mcqs: [{ q: "NAND is combination of", options: ["AND+NOT", "OR+NOT", "AND+OR", "None"], ans: 0 }],
                programs: [{ title: "Truth Table Generator", lang: "python", code: `for A in [0,1]:\n for B in [0,1]:\n  print(f"{A} AND {B} = {A & B}")` }],
                pdfs: []
              }
            },
            {
              id: "ch4-os",
              title: "Operating System",
              subtitle: "Types, Functions, Examples",
              duration: "50 min",
              level: "Beginner",
              progress: 0,
              tags: ["OS", "System Software"],
              materials: {
                notes: `OS is interface between user and hardware.\nFunctions: Memory mgmt, Process mgmt, File mgmt, Security.\nTypes: Batch, Time-sharing, Real-time, Distributed.`,
                importantQuestions: ["Define OS and its functions"],
                mcqs: [],
                programs: [],
                pdfs: []
              }
            },
          ]
        },
        {
          id: "physics",
          name: "Physics",
          short: "PHY",
          description: "Numerical + Theory bank",
          icon: "⚛️",
          color: "from-cyan-500 to-blue-600",
          chaptersCount: 4,
          chapters: [
            { id: "p-ch1", title: "Mechanics", subtitle: "Laws of motion", duration: "80 min", level: "Intermediate", progress: 0, tags: ["Mech"], materials: { notes: "Coming soon: detailed notes", importantQuestions: [], mcqs: [], programs: [], pdfs: [] } }
          ]
        },
        {
          id: "math",
          name: "Mathematics",
          short: "MTH",
          description: "Complete NEB solutions",
          icon: "∫",
          color: "from-amber-500 to-orange-600",
          chaptersCount: 6,
          chapters: []
        }
      ]
    },
    {
      id: "class-12",
      name: "Class 12",
      short: "12",
      description: "Advanced concepts — data, logic & systems",
      color: "from-emerald-500 to-teal-600",
      accent: "#10b981",
      stats: { subjects: 5, chapters: 32, students: "580+" },
      subjects: [
        {
          id: "cs",
          name: "Computer Science",
          short: "CS",
          description: "NEB Class 12 — Database, Networking, Programming",
          icon: "💻",
          color: "from-emerald-500 to-teal-600",
          chaptersCount: 12,
          chapters: [
            {
              id: "dbms",
              title: "Database Management System",
              subtitle: "DB, DBMS, RDBMS, Normalization",
              duration: "90 min",
              level: "Intermediate",
              progress: 0,
              tags: ["DBMS", "SQL", "Important"],
              materials: {
                notes: `### Why DBMS?
File system problems: redundancy, inconsistency, security.

**DBMS** is software managing databases.
**RDBMS**: Data in tables.

**Keys:**
- Primary Key: Unique, Not Null
- Foreign Key: Refers to PK in other table
- Candidate, Super, Composite

**Normalization:** Organizing data to reduce redundancy.
- 1NF: Atomic values
- 2NF: 1NF + No Partial Dependency
- 3NF: 2NF + No Transitive Dependency

**SQL:** DDL (CREATE), DML (SELECT), DCL (GRANT)`,

                importantQuestions: [
                  "Define DBMS. Explain advantages over file system.",
                  "Explain different keys with example.",
                  "What is normalization? Explain 1NF, 2NF, 3NF with example.",
                  "Differentiate between primary key and foreign key."
                ],
                mcqs: [
                  { q: "Which normal form removes transitive dependency?", options: ["1NF", "2NF", "3NF", "BCNF"], ans: 2 },
                  { q: "Primary key can be", options: ["Null", "Duplicate", "Unique & Not Null", "All"], ans: 2 }
                ],
                programs: [
                  {
                    title: "SQL Examples", lang: "sql", code: `-- Create Table
CREATE TABLE Students (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  class INT
);

-- Insert
INSERT INTO Students VALUES (1, 'Ram', 12);

-- Select with JOIN
SELECT s.name, c.title FROM Students s
JOIN Enroll c ON s.id = c.student_id;`
                  }
                ],
                pdfs: [{ name: "DBMS Handwritten Notes", size: "2.4 MB" }]
              }
            },
            {
              id: "networking",
              title: "Computer Network & Communication",
              subtitle: "OSI, TCP/IP, Topologies",
              duration: "80 min",
              level: "Intermediate",
              progress: 0,
              tags: ["Network", "OSI"],
              materials: {
                notes: `**Network** = Interconnected computers.

**Topologies:**
- Bus, Star, Ring, Mesh
- Star is most used today.

**OSI 7 layers:** Physical, Data Link, Network, Transport, Session, Presentation, Application
Mnemonic: *All People Seem To Need Data Processing*

**IP:** IPv4 = 32 bits, IPv6 = 128 bits

**Devices:** Hub (L1), Switch (L2), Router (L3)`,
                importantQuestions: ["Explain OSI model with diagram", "Differentiate between IPv4 and IPv6", "Explain network topologies with merits/demerits"],
                mcqs: [{ q: "No of layers in OSI?", options: ["4", "5", "7", "9"], ans: 2 }],
                programs: [],
                pdfs: []
              }
            },
            {
              id: "c-program",
              title: "C Programming - Functions & Arrays",
              subtitle: "High-weightage for boards & practical",
              duration: "120 min",
              level: "Advanced",
              progress: 0,
              tags: ["C", "Programming", "High Weight"],
              materials: {
                notes: `### Function: Block of code.
Types: Library & User-defined
Components: Declaration, Definition, Call

### Array: Collection of same type.
- 1D: int a[5];
- 2D: int b[3][3];

**String** is char array ending with '\\0'

Passing array to function: Pass base address.

**Pointers basics:** * for value, & for address.`,

                importantQuestions: ["WAP to add two matrices using function", "Explain call by value vs call by reference", "WAP to find largest element in array"],
                mcqs: [],
                programs: [
                  { title: "Add Matrices", lang: "c", code: `#include <stdio.h>\nvoid add(int a[3][3], int b[3][3], int c[3][3]){\n for(int i=0;i<3;i++)\n  for(int j=0;j<3;j++)\n   c[i][j]=a[i][j]+b[i][j];\n}\nint main(){\n int a[3][3]={{1,2,3},{4,5,6},{7,8,9}};\n int b[3][3]={{9,8,7},{6,5,4},{3,2,1}};\n int c[3][3];\n add(a,b,c);\n // print c\n}` },
                  { title: "Largest Element", lang: "c", code: `#include <stdio.h>\nint main(){\n int n, i, max;\n printf("Enter n: "); scanf("%d",&n);\n int a[n];\n for(i=0;i<n;i++) scanf("%d",&a[i]);\n max=a[0];\n for(i=1;i<n;i++) if(a[i]>max) max=a[i];\n printf("Largest=%d", max);\n}` }
                ],
                pdfs: [{ name: "C Important Programs PDF", size: "4.1 MB" }]
              }
            },
            {
              id: "oop",
              title: "Object-Oriented Programming (OOP)",
              subtitle: "Concepts & C++ Basics",
              duration: "75 min",
              level: "Intermediate",
              progress: 0,
              tags: ["OOP", "C++"],
              materials: {
                notes: `**OOP Pillars:**
1. Encapsulation: Wrapping data & methods
2. Abstraction: Hiding complexity
3. Inheritance: Reuse (Parent -> Child)
4. Polymorphism: One name, many forms

**Class vs Object:** Class = Blueprint, Object = Instance.

C++ example: class Student { ... };`,
                importantQuestions: ["Explain features of OOP", "Differentiate POP vs OOP"],
                mcqs: [],
                programs: [{ title: "Class Example", lang: "cpp", code: `#include <iostream>\nusing namespace std;\nclass Student{\n public:\n  string name;\n  void display(){ cout<<name; }\n};\nint main(){ Student s; s.name="Hari"; s.display(); }` }],
                pdfs: []
              }
            },
            {
              id: "web-tech",
              title: "Web Technology (HTML/CSS/JS)",
              subtitle: "Frontend basics for practical",
              duration: "90 min",
              level: "Beginner",
              progress: 0,
              tags: ["Web", "JS"],
              materials: {
                notes: `HTML = Structure, CSS = Style, JS = Behavior.

**HTML5 Semantic:** header, nav, main, section, footer

**CSS:** Box model, Flex, Grid

**JS:** DOM manipulation, Events

Imp for practical: Form validation in JS`,
                importantQuestions: ["Explain box model", "WAP to validate form using JS"],
                mcqs: [],
                programs: [{ title: "Form Validation", lang: "javascript", code: `function validate(){\n let name = document.getElementById('name').value;\n if(name==\"'){ alert('Name required'); return false; }\n return true;\n}` }],
                pdfs: []
              }
            }
          ]
        },
        {
          id: "physics",
          name: "Physics",
          short: "PHY",
          description: "Board-focused notes",
          icon: "⚛️",
          color: "from-cyan-500 to-blue-600",
          chaptersCount: 7,
          chapters: []
        },
        {
          id: "mathematics",
          name: "Mathematics",
          short: "MATH",
          description: "Solutions + shortcuts",
          icon: "∫",
          color: "from-amber-500 to-orange-600",
          chaptersCount: 9,
          chapters: []
        }
      ]
    }
  ]
}

export function getAllChapters() {
  const chapters = []
  learningData.classes.forEach(cls => {
    cls.subjects.forEach(sub => {
      sub.chapters.forEach(ch => {
        chapters.push({ ...ch, classId: cls.id, className: cls.name, subjectId: sub.id, subjectName: sub.name })
      })
    })
  })
  return chapters
}
