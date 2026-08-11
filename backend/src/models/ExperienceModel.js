import mongoose from 'mongoose'

const expSchema = new mongoose.Schema({
  customId: { type: String, unique: true },
  role: { type: String, required: true },
  org: String,
  period: String,
  location: String,
  points: [String],
  color: String
}, { timestamps: true })

export default mongoose.model('Experience', expSchema)
