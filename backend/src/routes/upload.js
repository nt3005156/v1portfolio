import express from 'express'
import { upload } from '../utils/upload.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Protected upload
router.post('/', protect, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' })
  const url = `/uploads/${req.file.filename}`
  res.json({ 
    url,
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype
  })
})

// Public upload for contact? optional — keep protected for admin only
// But allow PDF upload from admin panel only

export default router
