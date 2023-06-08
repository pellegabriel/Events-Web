import Image from 'next/image'
import { Event } from '../../models'
import { useEffect, useState } from 'react'
import { Storage } from 'aws-amplify'
import Link from 'next/link'
import AudioPlayer from '../AudioPlayer/AudioPlayer'

function parseDate(dateString: string) {
  const date = new Date(dateString)
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as const
  return date.toLocaleDateString('es-ES', options)
}

export default function EventCard({ event }:  any) {




//   audio
// null
// categoria
// "Medio ambiente"
// created_by
// "8f34a240-7f15-4bba-8390-1f3dbe9d4052"
// date
// "2012-03-11"
// description
// "Turismo nocturno en la plata.\n+18"
// event_end_time
// null
// id
// "d1f3c4dd-28f2-4bb1-abdc-1f6ce6163e9a"
// image
// location: {lat: -34.913448, lng: -57.933482}
// subtitle
// null
// title
// "Caminata por el bosque a la noche"

  console.log({event})
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
    const file = await Storage.get(`audio/${event.id}`, {
      level: 'public',
    })
    setAudio(file)
  }
  useEffect(() => {
    getUploadedAudio()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [isHover, setIsHover] = useState(false)

  const handleMouseEnter = () => {
    setIsHover(true)
  }
  const handleMouseLeave = () => {
    setIsHover(false)
  }
  const boxStyle = {
    maxWidth: '700px',
    backgroundColor: isHover ? '#f43f5e' : '#170b0e',
    minHeight: '365px',
  }

  return (
    <div
      style={{
        color: 'white',
        margin: '20px',
        display: 'flex',
        minHeight: '305px',
        maxWidth: '300px',
        flexDirection: 'column',
        border: '1px solid #e5e5e5',
        borderRadius: '5px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'red',
      }}
    >
      <div
        style={boxStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {event.image ? (
          <img
            alt=""
            src={event.image}
            onError={handleImageError}
            style={{ width: '300px', height: '240px' }}
          />
        ) : (
          <Image
            alt=""
            src="/img1.jpg"
            onError={handleImageError}
            style={{ width: '300px', height: '240px' }}
          />
        )}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'space-between',
            padding: '12px',
            marginLeft: '10px',
          }}
        >
          <h2 className=" text-2xl mb-2"> {event.title}</h2>
          <h2 className="text-sm flex  " style={{ color: 'white' }}>
            Inicia: {event.date}
          </h2>
        </div>
        {audio && (
          <div style={{ display: 'flex', marginTop: 'auto', padding: '8px' }}>
            <AudioPlayer
              src={audio}
              controls
              autoPlay
              style={{ height: '50px', backgroundColor: '#f43f5e' }}
            />
          </div>
        )}

        {/* types = categories */}
        {/* {event.types.length > 0 && (
          <div
            style={{
              display: 'flex',
              width: '100%',
              overflow: 'auto',
              padding: '8px',
            }}
          >
            <span
              style={{
                backgroundColor: '#F9A825',
                margin: '8px',
                marginBottom: '15px',
              }}
              className="inline-block bg-gray-200  px-3 py-1 text-xs font-semibold text-black"
            >
              {event.types}
            </span>
          </div>
        )} */}
      </div>
    </div>
  )
}
