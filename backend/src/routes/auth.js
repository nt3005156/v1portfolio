import express from 'express'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

const router = express.Router()

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const admin = await Admin.findOne({ username })
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' })
    const isMatch = await admin.matchPassword(password)
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' })
    const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })
    res.json({ token, username: admin.username, id: admin._id })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST /api/auth/change-password (protected)
import { protect } from '../middleware/auth.js'
router.post('/change-password', protect, async (req, res) => {
  const { oldPassword, newPassword, newUsername } = req.body
  try {
    const admin = await Admin.findById(req.admin.id)
    if (!admin) return res.status(404).json({ message: 'Admin not found' })
    if (oldPassword) {
      const ok = await admin.matchPassword(oldPassword)
      if (!ok) return res.status(400).json({ message: 'Old password incorrect' })
    }
    if (newPassword) admin.password = newPassword
    if (newUsername) admin.username = newUsername
    await admin.save()
    res.json({ message: 'Updated successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
