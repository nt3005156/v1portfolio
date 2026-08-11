import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI
    if (!uri) {
      console.warn('⚠️  MONGODB_URI not set — running in localStorage fallback mode')
      return
    }
    await mongoose.connect(uri)
    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`)
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message)
    process.exit(1)
  }
}

export default connectDB
