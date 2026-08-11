import mongoose from 'mongoose'

const eduSchema = new mongoose.Schema({
  customId: { type: String, unique: true },
  degree: { type: String, required: true },
  school: String,
  year: String,
  detail: String
}, { timestamps: true })

export default mongoose.model('Education', eduSchema)
