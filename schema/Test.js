// models/Test.js
import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  values: { type: [String], required: true },
  queKey: { type: String }, // ✅ image per question
})

const testSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  slug: String,
  fileKey: { type: String }, // ✅ cover image
  questions: [questionSchema],
})

export default mongoose.model('Test', testSchema)
