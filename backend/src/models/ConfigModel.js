import mongoose from 'mongoose'

const configSchema = new mongoose.Schema({
  key: { type: String, unique: true, required: true },
  data: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true })

export default mongoose.model('Config', configSchema)
