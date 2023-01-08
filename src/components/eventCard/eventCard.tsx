import Image from 'next/image'
import { Event } from '../../models'
import { useEffect, useState } from 'react'
import { Storage } from 'aws-amplify'
import img1 from '../../../public/img1.jpg'
import Link from 'next/link'

interface IProps {
  event: Event
}

export default function EventCard({ event }: IProps | any) {
  const [image, setImage] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [audio, setAudio] = useState<string>()

  const getUploadedImage = async () => {
    try {
      const file = await Storage.get(event.id, {
        level: 'public',
      })
      setImage(file)
    } catch (error) {
      setError(true)
    }
  }
  useEffect(() => {
    getUploadedImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleImageError = () => {
    setError(true)
  }

  const getUploadedAudio = async () => {
    const file = await Storage.get(event.id, {
      level: 'public',
    })
    setAudio(file)
  }
  useEffect(() => {
    getUploadedAudio()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(event.types)

  return (
    <div
      style={{
        margin: '20px',
        display: 'flex',
        minHeight: '324px',
        maxWidth: '270px',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#F4F6F6 '
      }}
      className=" rounded-lg overflow-hidden shadow-lg"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'space-between'
        }}
      >
        {image && !error ? (
          <Image
            alt=""
            src={image}
            width={300}
            height={200}
            onError={handleImageError}
            style={{ width: '300px', height: '180px' }}
          />
        ) : (
          <Image
          alt=""
          src={img1}
          width={300}
          height={200}
          onError={handleImageError}
          style={{ width: '300px', height: '180px' }}
          />
        )}

        <h2
        className="font-bold text-xl mb-2"
        style={{ marginLeft: '16px', marginTop: '16px' }}
        > {event.name}</h2>
      </div>
        
      {event.types.length > 0 && (
        <div style={{ display: 'flex', width: '100%', overflow: 'auto' }}>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
            {event.types}
          </span>
        </div>
      )}
      
      {audio && (
        <audio controls src={audio} >
          <Link href={audio} />
        </audio>
      )}
    </div>
  )
}
