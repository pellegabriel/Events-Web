import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface DropzoneTypes {
  handleAudioChange: (files: File[]) => void
}

function DropZoneAudio({ handleAudioChange }: DropzoneTypes) {
  const [files, setFiles] = useState([])

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      )
      handleAudioChange(acceptedFiles)
    },
    [handleAudioChange],
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'audio/*': [] },
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
      <audio
        controls
        src={file.preview}
        onLoad={() => {
          URL.revokeObjectURL(file.preview)
        }}
        style={{ width: '550px', padding: '10px' }}
      >
        <Link href={file} />
      </audio>
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
      <span className="flex items-center space-x-2" style={{padding: '8px', }}>
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
          Suelta el archivo Audio aqui <br /> o clickea este recuadro
        </span>
      </span>
  
      <input {...getInputProps()} className="hidden" />
    </div>
    {thumbs}
  </>
  )
}

export default DropZoneAudio
