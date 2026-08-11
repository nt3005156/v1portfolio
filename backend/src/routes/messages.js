import express from 'express'
import MessageModel from '../models/MessageModel.js'
import { protect } from '../middleware/auth.js'
import rateLimit from 'express-rate-limit'

const router = express.Router()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: 'Too many messages, try again later'
})

// Public: create message (contact form)
router.post('/', limiter, async (req, res) => {
  try {
    const { name, email, type, message } = req.body
    if (!name || !email || !message) return res.status(400).json({ message: 'Missing fields' })
    const msg = await MessageModel.create({
      customId: `msg-${Date.now()}`,
      name,
      email,
      type,
      message,
      read: false
    })
    res.status(201).json(msg)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Protected: get all messages
router.get('/', protect, async (req, res) => {
  try {
    const msgs = await MessageModel.find().sort({ createdAt: -1 })
    res.json(msgs)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.put('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params
    const updated = await MessageModel.findOneAndUpdate(
      { $or: [{ customId: id }, { _id: id }] },
      req.body,
      { new: true }
    )
    if (!updated) return res.status(404).json({ message: 'Not found' })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params
    const del = await MessageModel.findOneAndDelete({ $or: [{ customId: id }, { _id: id }] })
    if (!del) return res.status(404).json({ message: 'Not found' })
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
