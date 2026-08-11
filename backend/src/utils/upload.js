import multer from 'multer'
import path from 'path'
import fs from 'fs'

const uploadDir = 'uploads'
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const name = `${Date.now()}-${Math.round(Math.random()*1E9)}${ext}`
    cb(null, name)
  }
})

function fileFilter(req, file, cb) {
  const allowed = ['.pdf','.doc','.docx','.ppt','.pptx','.png','.jpg','.jpeg','.webp','.txt','.zip']
  const ext = path.extname(file.originalname).toLowerCase()
  if (allowed.includes(ext) || file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
    cb(null, true)
  } else {
    cb(new Error('File type not allowed'), false)
  }
}

export const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
})
