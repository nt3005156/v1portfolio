import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  customId: { type: String, default: () => `proj-${Date.now()}` },
  title: { type: String, required: true },
  category: String,
  desc: String,
  longDesc: String,
  tags: [String],
  color: String,
  accent: String,
  image: String,
  links: Object,
  featured: Boolean,
  year: String
}, { timestamps: true })

export default mongoose.model('Project', projectSchema)
