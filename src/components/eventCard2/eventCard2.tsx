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
    <div className='flex bg-white rounded-lg'>
    <a href="https://stackdiary.com/" className="group">
            
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
    
  </a>
    <div className="space-y-4 lg:grid lg:grid-cols-3 lg:items-start lg:gap-6 lg:space-y-0">
        

        
      <div className="sm:col-span-2" >
            
        <div className="flex items-center space-x-3" >
                                
          <div className="flex items-center space-x-2" >
                                                
            <span className="inline-flex items-center leading-none px-2.5 py-1.5 text-sm font-medium text-skin-inverted rounded-full border border-skin-input">
        
              <svg className="mr-1.5 h-2 w-2 brand-react" fill="currentColor" viewBox="0 0 8 8">
            
                <circle cx="4" cy="4" r="3"></circle>
        
              </svg>
    Tag #1
            </span>
                                                                              
          </div>
                
                        
        </div>
            
        <div className="mt-2">
                
          <a href="https://laravel.cm/articles/traquer-un-champ-validation-conditionelle-react-hook-form-5" className="group">
                    
            <h4 className="text-lg leading-6 font-semibold font-sans text-skin-inverted group-hover:text-skin-primary">A Tailwind CSS Card for Displaying Blog Posts</h4>
                
          </a>
                
          <p className="mt-1 text-sm font-normal text-skin-base leading-5">
    Metus potenti velit sollicitudin porttitor magnis elit lacinia tempor varius, ut cras orci vitae parturient id nisi vulputate consectetur, primis venenatis cursus tristique malesuada viverra congue risus. 
                </p>
                
          <div className="mt-3 flex items-center font-sans">
                    
            <div className="ml-3">
 
              <div className="flex space-x-1 text-sm text-skin-muted">
                            
                <time>1 Feb, 2022</time>
                            
                <span aria-hidden="true">·</span>
                            
                <span>3 min read time</span>
                        

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
