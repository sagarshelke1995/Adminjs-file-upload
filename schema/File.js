import mongoose from 'mongoose'

const fileSchema = new mongoose.Schema({
  name: { type: String },
  fileKey: { type: String }, // <== for storing the file key (required)
  filePath: { type: String }, // <== for storing the actual path (optional, but nice)
  mimeType: { type: String },
  size: { type: Number },
})

export default mongoose.model('File', fileSchema)
