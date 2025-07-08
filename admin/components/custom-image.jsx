import React from 'react'

const CustomImage = (props) => {
  const { record, property } = props
  const filePath = record?.params?.[property.name]

  if (!filePath) return <span>No image</span>

  const src = `/uploads/${filePath.replace(/^uploads[\\/]/, '').replace(/\\/g, '/')}`

  return (
    <img
      src={src}
      alt="Uploaded"
      style={{
        maxWidth: '100px',
        maxHeight: '100px',
        objectFit: 'cover',
        borderRadius: '6px',
        border: '1px solid #ccc',
      }}
    />
  )
}

export default CustomImage