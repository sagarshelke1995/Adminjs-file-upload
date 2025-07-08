import mongoose from 'mongoose'

const fileSchema = new mongoose.Schema({
  name: { type: String },
  fileKey: { type: String }, // <== for storing the file key (required)
  mimeType: { type: String },
  size: { type: Number },
})

export default mongoose.model('File', fileSchema)
