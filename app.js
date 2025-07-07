import express from 'express'
import mongoose from 'mongoose'
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import * as AdminJSMongoose from '@adminjs/mongoose'
import uploadFeature from '@adminjs/upload'
import path from 'path'
import { fileURLToPath } from 'url'
import { ComponentLoader } from 'adminjs'
import File from './schema/File.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3000

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

AdminJS.registerAdapter({
  Database: AdminJSMongoose.Database,
  Resource: AdminJSMongoose.Resource,
})

// ✅ 1. Create and configure componentLoader
const componentLoader = new ComponentLoader()

// ✅ 2. Create admin instance and pass componentLoader
const admin = new AdminJS({
  rootPath: '/admin',
  resources: [
    {
      resource: File,
      features: [
     uploadFeature({
        componentLoader,
        provider: {
            local: {
            bucket: path.join(__dirname, 'uploads'),
            },
        },
        properties: {
            key: 'fileKey', // 🟢 stores key (e.g. in DB)
            file: 'uploadedFile', // 🟢 field used in AdminJS form
            filePath: 'filePath', // 🟢 optional path field
            mimeType: 'mimeType', // 🟢 optional
            size: 'size',         // 🟢 optional
        },
        uploadPath: (record, filename) => `files/${Date.now()}-${filename}`,
        })
      ],
    },
  ],
  componentLoader, // ✅ 5. Important: add it here too
})

// ✅ 6. Build router
const adminRouter = AdminJSExpress.buildRouter(admin)

app.use(admin.options.rootPath, adminRouter)

mongoose
  .connect('mongodb+srv://shelkesagar1995ss:Similardata%40123@clustergame.fd7zhnl.mongodb.net/aquizme')
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server started on http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err)
  })
