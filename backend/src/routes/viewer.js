import express from 'express'
import ViewerModel from '../models/ViewerModel.js'

const router = express.Router()

// GET count — public
router.get('/', async (req, res) => {
  try {
    let doc = await ViewerModel.findOne({ singleton: 'main' })
    if (!doc) {
      doc = await ViewerModel.create({ count: 1111, singleton: 'main' })
    }
    res.json({ count: doc.count })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST increment — public, counted once per session on frontend, but server increments
router.post('/increment', async (req, res) => {
  try {
    let doc = await ViewerModel.findOne({ singleton: 'main' })
    if (!doc) {
      doc = await ViewerModel.create({ count: 1112, singleton: 'main' })
    } else {
      doc.count += 1
      await doc.save()
    }
    res.json({ count: doc.count })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
