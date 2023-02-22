import Image from 'next/image'
import { Event } from '../../models'
import { useEffect, useState } from 'react'
import { Storage } from 'aws-amplify'
import Link from 'next/link'
import parseDate from '../../helperFunctions/parseDate'

interface IProps {
  event: Event
}

export default function EventCard({ event }: IProps | any) {
  const startDate = event.startDate ? parseDate(event.startDate) : ''

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

  // const backgroundColors = ['#EFE371', '#ba7dc2', 'yellow']
  // const randomColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
     setIsHover(true);
  };
  const handleMouseLeave = () => {
     setIsHover(false);
  };
  const boxStyle = {maxWidth:'700px'   ,backgroundColor: isHover ?  '#EFE371' : '#ba7dc2',minHeight: '365px'
}
  return (
  
    <div
    
      style={{
        margin: '20px',
        display: 'flex',
        minHeight: '365px',
        maxWidth: '270px',
        flexDirection: 'column',
        // background: randomColor,
      }}
      className=" rounded-lg overflow-hidden shadow-xl"
    >
        <div style={boxStyle}
    onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
>
      <h2 className='text-lg flex justify-center font-extrabold' style={{color:'white', backgroundColor:'black', padding: '8px'}}>
        Inicia: {startDate}
      </h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'space-between',
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
            src='/img1.jpg'
            width={300}
            height={200}
            onError={handleImageError}
            style={{ width: '300px', height: '180px' }}
          />
        )}

        <h2
          className="font-extrabold text-xl mb-2"
          style={{ margin: '8px' }}
        >
          {' '}
          {event.name}
        </h2>
      </div>

        {event.types.length > 0 && (
          <div style={{ display: 'flex', width: '100%', overflow: 'auto', padding: '8px' }}>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
              {event.types}
            </span>
          </div>
        )}

        {audio && (
          <div style={{ display: 'flex', marginTop: 'auto', padding: '8px' }}>
            <audio controls src={audio} style={{ height: '35px' }}>
              <Link href={audio} />
            </audio>
          </div>
        )}
    </div>
    </div>      
  )
}
