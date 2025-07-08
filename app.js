import express from 'express'
import mongoose from 'mongoose'
import nunjucks from 'nunjucks'
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import * as AdminJSMongoose from '@adminjs/mongoose'
import uploadFeature from '@adminjs/upload'
import path from 'path'
import { fileURLToPath } from 'url'
import { ComponentLoader } from 'adminjs'
import File from './schema/File.js'
import routes from './route/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3000

// Set up Nunjucks templating
function setUpNunjucks() {
  nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true,
  })
}

setUpNunjucks()
app.set('view engine', 'html')

// / admin js setting 

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(express.static("public"));

AdminJS.registerAdapter({
  Database: AdminJSMongoose.Database,
  Resource: AdminJSMongoose.Resource,
})

// ✅ 1. Component loader
const componentLoader = new ComponentLoader()

// ✅ 2. Custom components for list/show image preview
const UploadImageListComponent = componentLoader.add(
  'UploadImageListComponent',
  path.join(__dirname, 'admin/components/custom-image.jsx') // 👈 custom image preview
)

const UploadCustomComponent = componentLoader.add(
  'UploadCustomComponent',
  path.join(__dirname, 'admin/components/upload.jsx') // 👈 used for show/edit if needed
)

// ✅ 3. AdminJS instance
const admin = new AdminJS({
  rootPath: '/admin',
  resources: [
    {
      resource: File,
      options: {
          properties: {
              filePath: { isVisible: false },
              uploadedFile: { isVisible: {
                  list: false,   
                  filter: false,
                  show: false,    
                  edit: true,  
              }, },
              fileKey: {
                  isVisible: { list: true, edit: true, filter: false, show: true },
                  components: {
                      list: UploadImageListComponent,
                      show: UploadCustomComponent,
                      edit: UploadCustomComponent,
            }
            }
        }
      },
      features: [
        uploadFeature({
        componentLoader,
        provider: {
            local: {
            bucket: path.join(__dirname, ''),
            },
        },
        properties: {
            key: 'fileKey',             // ✅ URL preview + DB path
            file: 'uploadedFile',
            mimeType: 'mimeType',
            size: 'size',
            // ❌ Do NOT include filePath if it's same as key
        },
        uploadPath: (record, filename) => `/uploads/files/${Date.now()}-${filename.replace(/\s+/g, '-')}`,
        })
      ],
    },
  ],
  componentLoader,
})

// ✅ 4. Express router for AdminJS
const adminRouter = AdminJSExpress.buildRouter(admin)
app.use(admin.options.rootPath, adminRouter)

app.use('/', routes)

// ✅ 5. MongoDB connection
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
