import mongoose from 'mongoose'

const subjectSchema = new mongoose.Schema({
  customId: { type: String, required: true, unique: true },
  classId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  short: String,
  description: String,
  icon: String,
  color: String,
}, { timestamps: true })

export default mongoose.model('Subject', subjectSchema)
