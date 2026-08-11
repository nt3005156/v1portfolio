import mongoose from 'mongoose'

const classSchema = new mongoose.Schema({
  customId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  short: { type: String, required: true },
  description: String,
  color: { type: String, default: 'from-violet-600 to-indigo-600' },
  accent: String,
  stats: { type: Object, default: {} },
}, { timestamps: true })

export default mongoose.model('Class', classSchema)
