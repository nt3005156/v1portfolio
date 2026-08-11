import express from 'express'
import ConfigModel from '../models/ConfigModel.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// GET public config by key or all
router.get('/', async (req, res) => {
  try {
    const { key } = req.query
    if (key) {
      const doc = await ConfigModel.findOne({ key })
      if (!doc) return res.status(404).json({ message: 'Not found' })
      return res.json(doc)
    }
    const all = await ConfigModel.find()
    res.json(all)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:key', async (req, res) => {
  try {
    const doc = await ConfigModel.findOne({ key: req.params.key })
    if (!doc) return res.status(404).json({ message: 'Not found' })
    res.json(doc)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST/PUT protected — upsert config
router.post('/', protect, async (req, res) => {
  try {
    const { key, data } = req.body
    if (!key) return res.status(400).json({ message: 'key required' })
    const doc = await ConfigModel.findOneAndUpdate(
      { key },
      { key, data },
      { upsert: true, new: true }
    )
    res.json(doc)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.put('/:key', protect, async (req, res) => {
  try {
    const doc = await ConfigModel.findOneAndUpdate(
      { key: req.params.key },
      { data: req.body.data || req.body },
      { upsert: true, new: true }
    )
    res.json(doc)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
