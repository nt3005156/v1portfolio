import express from 'express'
import { protect } from '../middleware/auth.js'

export function makeCrudRoutes(Model, options = {}) {
  const router = express.Router()
  const { publicGet = false } = options

  // GET all
  const getHandler = async (req, res) => {
    try {
      const filter = {}
      if (Model.modelName === 'Subject' && req.query.classId) filter.classId = req.query.classId
      if (Model.modelName === 'Chapter' && req.query.subjectId) filter.subjectId = req.query.subjectId
      if (Model.modelName === 'Chapter' && req.query.classId) filter.classId = req.query.classId
      const items = await Model.find(filter).sort({ createdAt: -1 })
      res.json(items)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  if (publicGet) {
    router.get('/', getHandler)
  } else {
    router.get('/', protect, getHandler)
  }

  // Public get for some models
  if (options.publicGetAll) {
    router.get('/public', async (req, res) => {
      try {
        const filter = {}
        if (req.query.classId) filter.classId = req.query.classId
        if (req.query.subjectId) filter.subjectId = req.query.subjectId
        const items = await Model.find(filter).sort({ createdAt: -1 })
        res.json(items)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
    })
  }

  // POST create
  router.post('/', protect, async (req, res) => {
    try {
      const data = req.body
      if (!data.customId) data.customId = `${Model.modelName.toLowerCase()}-${Date.now()}`
      const item = await Model.create(data)
      res.status(201).json(item)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

  // PUT update by customId or _id
  router.put('/:id', protect, async (req, res) => {
    try {
      const { id } = req.params
      const item = await Model.findOneAndUpdate(
        { $or: [{ customId: id }, { _id: id }] },
        req.body,
        { new: true, runValidators: true }
      )
      if (!item) return res.status(404).json({ message: 'Not found' })
      res.json(item)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

  // DELETE
  router.delete('/:id', protect, async (req, res) => {
    try {
      const { id } = req.params
      const item = await Model.findOneAndDelete({ $or: [{ customId: id }, { _id: id }] })
      if (!item) return res.status(404).json({ message: 'Not found' })
      res.json({ message: 'Deleted' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

  return router
}
