import mongoose from 'mongoose'

const engagedSchema = new mongoose.Schema({
  customId: { type: String, unique: true },
  name: { type: String, required: true },
  level: String,
  desc: String
}, { timestamps: true })

export default mongoose.model('EngagedSchool', engagedSchema)
