import mongoose from 'mongoose'

const viewerSchema = new mongoose.Schema({
  count: { type: Number, default: 1111 },
  singleton: { type: String, default: 'main', unique: true }
}, { timestamps: true })

export default mongoose.model('Viewer', viewerSchema)
