// admin/components/upload.jsx
import React from 'react'
import { BasePropertyProps } from 'adminjs'

const UploadComponent = (props) => {
  const { record, property } = props
  const filePath = record?.params?.[property.name]

  return (
    <div>
      {filePath ? (
        <a href={filePath} target="_blank" rel="noopener noreferrer" className="sagar">
          View Uploaded File
        </a>
      ) : (
        <p>No file uploaded.</p>
      )}
    </div>
  )
}

export default UploadComponent
