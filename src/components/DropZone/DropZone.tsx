import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface DropzoneTypes {
  handleImageChange: (files: File[]) => void
}

function DropZone({ handleImageChange }: DropzoneTypes) {
  const [files, setFiles] = useState([])
  const [isHovering, setIsHovering] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      )
      handleImageChange(acceptedFiles)
    },
    [handleImageChange],
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  })

  const thumbs = files.map((file: any) => (
    <div
      key={file.name}
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '8px',
      }}
    >
      <Image
        alt=""
        src={file.preview}
        onLoad={() => {
          URL.revokeObjectURL(file.preview)
        }}
        width={300}
        height={300}
      />
    </div>
  ))

  return (
    <>
    <div
      {...getRootProps()}
      style={{
        display: 'flex',
        width:'400px',
        justifyContent: 'center',
        padding: '8px',
        border: '2px dashed #ccc',
        borderRadius: '4px',
        transition: 'border-color 0.2s ease-in-out',
        cursor: 'pointer',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = '#666'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#ccc'
      }}
    >
      <span className="flex items-center space-x-2" style={{padding: '8px'}}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <span className="ml-4 text-sm font-medium text-white">
          Suelta la imagen aqui <br /> o clickea este recuadro
        </span>
      </span>
  
      <input {...getInputProps()} className="hidden" />
    </div>
    {thumbs}
  </>
  
  )
}

export default DropZone
