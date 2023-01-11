import Image from 'next/image'
import { Event } from '../../models'
import { useEffect, useState } from 'react'
import { Storage } from 'aws-amplify'
import img1 from '../../../public/img1.jpg'
import parseDate from '../../helperFunctions/parseDate'
import Link from 'next/link'

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

  const startDate = event.startDate ? parseDate(event.startDate) : ''
  const endDate = event.endDate ? parseDate(event.endDate) : ''

  return (
    <div
      className="flex rounded-lg mt-8 object-cover shadow-xl group-hover:opacity-75"
      key={event.id}
      style={{background:'#ba7dc2' , width:'800px'}}
    >
      <div className="group">
        <div className="flex flex-col ">
          {image && !error ? (
            <Image
              className=" p-4 "
              alt=""
              src={image}
              width={400}
              height={200}
              onError={handleImageError}
              style={{ width: '300px', height: '180px', minWidth: '300px' }}
            />
          ) : (
            <Image
              className=" p-4"
              alt=""
              src={img1}
              width={400}
              height={200}
              style={{ width: '300px', height: '180px' }}
            />
          )}
           {audio && (
                <audio style={{marginBottom:'10px' ,maxWidth:'400px',padding:'10px', }} controls src={audio}>
                  <Link href={audio} />
                </audio>
              )}
        </div>
      </div>
      <div className=" flex justify-center items-center pl-15 space-y-4 lg:grid lg:grid-cols-3 lg:items-start lg:gap-6 lg:space-y-0">
        <div className="sm:col-span-2">
          <div className="mt-2">
            <div className="group">
              <h4 className="text-lg leading-6 font-semibold font-sans text-skin-inverted group-hover:text-skin-primary">
                {event.name}
              </h4>
            
            </div>

            <p className="mt-1 text-sm font-normal text-skin-base leading-5">
              {event.descripcion}
            </p>

            <div className="mt-3 flex items-center font-sans">
              <div className="ml-3">
                <div className="flex space-x-1 text-sm text-skin-muted">
                  <div className="text-gray-700 text-base">
                    Fecha de Inicio: {startDate} <br />
                    Fecha de cierre: {endDate}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
     
    </div>
  )
}
