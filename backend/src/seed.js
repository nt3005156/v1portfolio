import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Admin from './models/Admin.js'
import ClassModel from './models/ClassModel.js'
import SubjectModel from './models/SubjectModel.js'
import ChapterModel from './models/ChapterModel.js'
import ConfigModel from './models/ConfigModel.js'
import ViewerModel from './models/ViewerModel.js'
import ExperienceModel from './models/ExperienceModel.js'
import EducationModel from './models/EducationModel.js'
import EngagedModel from './models/EngagedModel.js'
import ProjectModel from './models/ProjectModel.js'
import AdModel from './models/AdModel.js'
import DailyLogModel from './models/DailyLogModel.js'

dotenv.config()

// Import default data from frontend (copy manually for seed)
const defaultClasses = [
  { customId: 'class-11', name: 'Class 11', short: '11', description: 'Foundation fundamentals — build your base right', color: 'from-violet-600 to-indigo-600', accent: '#7c3aed', stats: { subjects: 4, chapters: 24, students: '420+' } },
  { customId: 'class-12', name: 'Class 12', short: '12', description: 'Advanced concepts — data, logic & systems', color: 'from-emerald-500 to-teal-600', accent: '#10b981', stats: { subjects: 5, chapters: 32, students: '580+' } }
]

const defaultEducation = [
  { customId: 'edu-1', degree: 'BE Computer', school: 'Acme Engineering College', year: '2020 — 2025', detail: 'Bachelor in Computer Engineering' },
  { customId: 'edu-2', degree: 'Diploma in Computer Engineering', school: 'Acme Engineering College', year: '2017 — 2020', detail: 'Diploma where I learned C and logic gates' },
  { customId: 'edu-3', degree: 'SEE', school: 'Padmodaya Secondary School', year: 'Before 2017', detail: 'Foundation years' }
]

const defaultEngaged = [
  { customId: 'eng-1', name: 'RIMS', level: '+2', desc: 'Plus 2 - Computer Science' },
  { customId: 'eng-2', name: 'SRSS', level: '+2', desc: 'Plus 2 - CS / Management' },
  { customId: 'eng-3', name: 'APS', level: '+2', desc: 'Plus 2 - With practical labs' },
  { customId: 'eng-4', name: 'PSS', level: '9,10', desc: 'Grade 9,10 - Foundation' },
  { customId: 'eng-5', name: 'RSS', level: '6,7,8,9,10', desc: 'Grade 6-10 Junior to SEE prep' }
]

const defaultExperience = [
  { customId: 'exp-1', role: 'Independent Developer & Full-time CS Teacher', org: 'Freelance + My Own Classes', period: '2022 — Now', location: 'Kathmandu', points: ['Built Learning Hub used by 800+ students', 'Shipped 20+ production web apps'], color: 'violet' }
]

const defaultLogs = [
  { customId: 'log-1', time: '09:00', text: 'Class 12 — DBMS Normalization with real exam examples', date: 'Today' },
  { customId: 'log-2', time: '11:30', text: 'Built interactive quiz for binary conversions', date: 'Today' }
]

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to DB')

    // Clear
    await Admin.deleteMany()
    await ClassModel.deleteMany()
    await EducationModel.deleteMany()
    await EngagedModel.deleteMany()
    await ExperienceModel.deleteMany()
    await DailyLogModel.deleteMany()
    await ConfigModel.deleteMany()
    await ViewerModel.deleteMany()
    await ProjectModel.deleteMany()
    await AdModel.deleteMany()

    // Admin
    const adminUsername = process.env.ADMIN_USERNAME || 'admin'
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
    await Admin.create({ username: adminUsername, password: adminPassword })
    console.log(`✅ Admin created: ${adminUsername} / ${adminPassword}`)

    // Viewer
    await ViewerModel.create({ count: 1111, singleton: 'main' })
    console.log('✅ Viewer count seeded at 1111')

    // Classes
    await ClassModel.insertMany(defaultClasses)
    console.log('✅ Classes seeded')

    // Education
    await EducationModel.insertMany(defaultEducation)
    console.log('✅ Education seeded')

    // Engaged
    await EngagedModel.insertMany(defaultEngaged)
    console.log('✅ Engaged schools seeded')

    // Experience
    await ExperienceModel.insertMany(defaultExperience)

    // Logs
    await DailyLogModel.insertMany(defaultLogs)

    // Configs
    await ConfigModel.create({ key: 'personal', data: { name: 'Nitesh Kr Thakur', firstName: 'Nitesh', location: 'Kathmandu, Nepal' } })
    await ConfigModel.create({ key: 'theme', data: { primary: '#7c3aed', secondary: '#6366f1', accent: '#06b6d4', background: '#050507', logoText: 'NKT' } })

    console.log('✅ Seed complete')
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

seed()
