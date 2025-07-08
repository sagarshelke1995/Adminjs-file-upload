// admin/components/upload.jsx
import React from 'react'

const UploadComponent = (props) => {
  const { record, property } = props
  const filePath = record?.params?.[property.name]

return (
  <div>
    {filePath ? (
      <div>
        <p>Preview image:</p>
        <img
          src={filePath}
          alt="Uploaded"
          style={{
            maxWidth: '100px',
            maxHeight: '100px',
            objectFit: 'cover',
            borderRadius: '6px',
            border: '1px solid #ccc',
          }}
        />
      </div>
    ) : (
      <p>No file uploaded.</p>
    )}
  </div>
)
}

export default UploadComponent
