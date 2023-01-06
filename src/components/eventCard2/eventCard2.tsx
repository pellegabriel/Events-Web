import Image from 'next/image'
import { Event } from '../../models'
import { useEffect, useState } from 'react'
import { Storage } from 'aws-amplify'
import img1 from '../../../public/IMG1.png'
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
    const file = await Storage.get(event.id, {
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
    <div className='flex bg-white rounded-lg mt-6' key={event.id}>
    <div className="group">
            
    <div className="">
            
        {image && !error ? (
         <Image
           className="object-cover shadow-lg group-hover:opacity-75 p-4 " 
           alt=""
           src={image}
           width={400}
           height={200}
           onError={handleImageError}
         />
       ) : (
         <Image  className="object-cover shadow-lg group-hover:opacity-75 p-4" alt="" src={img1} width={400} height={200} />
       )}
        
    </div>
    
  </div>
    <div className="space-y-4 lg:grid lg:grid-cols-3 lg:items-start lg:gap-6 lg:space-y-0">
        

        
      <div className="sm:col-span-2" >
            
 
            
        <div className="mt-2">
                
          <div className="group">
                    
            <h4 className="text-lg leading-6 font-semibold font-sans text-skin-inverted group-hover:text-skin-primary"> {event.name}</h4>
            {audio && (
            <audio controls src={audio}>
            <Link href={audio} />
            </audio>
            )}
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
{/* 
 // <div
    //   key={event.id}
    // >
    //      <div className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg">
   
    //       </div>

    //       <div className="flex flex-col justify-between p-4 leading-normal">
    //         <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {event.name}</div>
    //         <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">{event.descripcion}</div>
    //         {audio && (
    //           <audio controls src={audio}>
    //             <Link href={audio} />
    //           </audio>
    //         )}
    //         <div className="text-gray-700 text-base">
    //           Fecha de Inicio: {startDate} <br />
    //           Fecha de cierre: {endDate}
    //         </div>
    //       </div>
    //       <div className="px-6 pt-4 pb-2">
    //         <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
    //           {event.types}
    //         </span>
    //       </div>
    //       <div className="px-6 pt-4 pb-2">
    //         <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
    //           {event.map_point}
    //         </span>
    //       </div>
    //     </div> */}
