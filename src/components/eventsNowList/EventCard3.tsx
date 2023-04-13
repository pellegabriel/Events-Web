import Image from 'next/image'
import { Event } from '../../models'
import { useEffect, useState } from 'react'
import { Storage } from 'aws-amplify'

interface IProps {
  event: Event
}

export default function EventCard({ event }: IProps) {
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
    backgroundColor: isHover ? '#f43f5e' : '',
    width: '200px',
    padding: '8px',
    color: 'white',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid rgba(255, 255, 255, 0.6)',
  }

  return (
    <div
      style={{
        width: '1200px',
        height: '300px',
        display: 'flex',
        padding: '24px',
        overflow: 'auto',
        borderRadius: '18px',
        flexDirection: 'row',
        marginBottom: '64px',
        justifyContent: 'space-between',
        border: '1px solid rgba(255, 255, 255, 0.6)',
      }}
      key={event.id}
    >
      <div
        style={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h2
            style={{ color: 'white', fontSize: '38px', marginBottom: '18px' }}
          >
            {event.name}
          </h2>

          <p style={{ color: 'white', fontSize: '14px', marginBottom: '14px' }}>
            {event.descripcion}
          </p>

          <p style={{ color: 'white', fontSize: '14px', marginBottom: '14px' }}>
            {event.startDate}
          </p>

          <p style={{ color: 'white', fontSize: '14px' }}>$ 2.000,00</p>
        </div>

        <button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={boxStyle}
        >
          Ver más
        </button>
      </div>

      {image && !error ? (
        <Image
          className=" p-4 "
          alt=""
          src={image}
          width={400}
     
            height={200}
            onError={handleImageError}
            style={{ width: '180px', height: '120px' }}
          />
        ) : (
          <Image
            className=" p-4"
            alt=""
            src="/img1.jpg"
            width={400}            
            height={200}
            style={{ width: '180px', height: '120px' }}
          />
        )}
    </div>
  )
}
