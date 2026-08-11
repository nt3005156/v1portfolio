import mongoose from 'mongoose'

const chapterSchema = new mongoose.Schema({
  customId: { type: String, required: true, unique: true },
  classId: { type: String, required: true, index: true },
  subjectId: { type: String, required: true, index: true },
  title: { type: String, required: true },
  subtitle: String,
  duration: String,
  level: String,
  tags: [String],
  materials: {
    notes: String,
    importantQuestions: [String],
    mcqs: [{
      q: String,
      options: [String],
      ans: Number
    }],
    programs: [{
      title: String,
      lang: String,
      code: String
    }],
    pdfs: [{
      name: String,
      size: String,
      url: String,
      fileData: String
    }]
  }
}, { timestamps: true })

export default mongoose.model('Chapter', chapterSchema)
