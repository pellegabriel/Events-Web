import Image from 'next/image'
import { Event } from '../../models'
import { useEffect, useState } from 'react'
import { Storage } from 'aws-amplify'

interface IProps {
  event: Event
}

export default function EventCard2({ event }: IProps | any) {
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

  return (
    <div
      className="flex bg-white rounded-lg mt-8 object-cover shadow-lg group-hover:opacity-75"
      key={event.id}
      style={{ background: '#F4F6F6 ' }}
    >
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
