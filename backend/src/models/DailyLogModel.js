import mongoose from 'mongoose'

const logSchema = new mongoose.Schema({
  customId: { type: String, unique: true },
  time: String,
  text: { type: String, required: true },
  date: { type: String, default: 'Today' }
}, { timestamps: true })

export default mongoose.model('DailyLog', logSchema)
