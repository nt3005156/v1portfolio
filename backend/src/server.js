import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import connectDB from './config/db.js'

import authRoutes from './routes/auth.js'
import classRoutes from './routes/classes.js'
import subjectRoutes from './routes/subjects.js'
import chapterRoutes from './routes/chapters.js'
import projectRoutes from './routes/projects.js'
import adRoutes from './routes/ads.js'
import logRoutes from './routes/logs.js'
import expRoutes from './routes/experience.js'
import eduRoutes from './routes/education.js'
import engagedRoutes from './routes/engaged.js'
import messageRoutes from './routes/messages.js'
import viewerRoutes from './routes/viewer.js'
import configRoutes from './routes/config.js'
import uploadRoutes from './routes/upload.js'

dotenv.config()
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PORT = process.env.PORT || 5000

// --- EMERGENCY CORS FIX ---
// This manual middleware guarantees headers even if cors package fails
app.use((req, res, next) => {
  const origin = req.headers.origin
  // Allow your domains + any vercel + localhost + onrender
  const allowed = [
    'https://niteshthakur.com.np',
    'https://www.niteshthakur.com.np',
    'http://niteshthakur.com.np',
    'http://www.niteshthakur.com.np',
  ]
  // If origin is allowed or contains your domain, reflect it, otherwise allow all for now to unblock you
  if (!origin || allowed.includes(origin) || origin.includes('niteshthakur.com.np') || origin.includes('localhost') || origin.includes('vercel.app') || origin.includes('onrender.com')) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*')
  } else {
    // Temporarily allow all to fix your live site NOW - you can restrict later
    res.setHeader('Access-Control-Allow-Origin', origin || '*')
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin')
  res.setHeader('Access-Control-Allow-Private-Network', 'true')
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  next()
})

const corsOptions = {
  origin: true, // reflect origin - FIXES CORS
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS','PATCH'],
  allowedHeaders: ['Content-Type','Authorization','X-Requested-With','Accept','Origin']
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

app.use(helmet({
  crossOriginResourcePolicy: false,
  crossOriginEmbedderPolicy: false
}))
app.use(morgan('dev'))
app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ extended: true, limit: '20mb' }))

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

connectDB()

app.get('/', (req, res) => {
  res.json({ 
    message: 'NKT Portfolio Backend API - CORS SUPER FIXED',
    version: '5.2-super-cors-fixed',
    frontend: process.env.FRONTEND_URL || 'not set - allowing all for now',
    time: new Date().toISOString(),
    endpoints: [
      '/api/auth/login',
      '/api/classes',
      '/api/subjects',
      '/api/chapters',
      '/api/projects',
      '/api/ads',
      '/api/logs',
      '/api/experience',
      '/api/education',
      '/api/engaged',
      '/api/messages',
      '/api/viewer',
      '/api/config',
      '/api/upload'
    ]
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/classes', classRoutes)
app.use('/api/subjects', subjectRoutes)
app.use('/api/chapters', chapterRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/ads', adRoutes)
app.use('/api/logs', logRoutes)
app.use('/api/experience', expRoutes)
app.use('/api/education', eduRoutes)
app.use('/api/engaged', engagedRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/viewer', viewerRoutes)
app.use('/api/config', configRoutes)
app.use('/api/upload', uploadRoutes)

app.use((req, res) => res.status(404).json({ message: `Route ${req.originalUrl} not found - check / for endpoints` }))

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: err.message || 'Server error' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} - SUPER CORS FIXED`)
  console.log(`📚 Frontend URL env: ${process.env.FRONTEND_URL || 'not set - allowing all'}`)
})
