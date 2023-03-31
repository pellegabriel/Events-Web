import Image from 'next/image'
import { Event } from '../../models'
import { useEffect, useRef, useState } from 'react'
import { Storage } from 'aws-amplify'
import parseDate from '../../helperFunctions/parseDate'
import Link from 'next/link'

interface IProps {
  event: Event
}

export default function EventCard2({ event }: IProps | any) {
  const [image, setImage] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [audio, setAudio] = useState<string>()

  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
     setIsHover(true);
  };
  const handleMouseLeave = () => {
     setIsHover(false);
  };
  const boxStyle = {backgroundColor: isHover ? '#f43f5e'  : '#170b0e', color:'white',
}
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
    <div  style={{flexDirection:'column',  boxShadow: "0px 0px 30px rgba(0,0,0, 0.6)",
    borderRadius: "10px", width:'330px', height:'500px',margin:'29px'
  }}>
   
    <div
      className="flex p-4 object-cover shadow-xl group-hover:opacity-75"
      key={event.id}
      style={boxStyle}
          onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
      
    >

      <div className="group " style={{minWidth:'300px'}}>
    
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
              src='/img1.jpg'
              width={400}
              height={200}
              style={{ width: '300px', height: '180px' }}
            />
          )}
           
        </div>
        <div className=" flex justify-center items-center pl-5 space-y-4 lg:grid lg:grid-cols-3 lg:items-start lg:gap-6 lg:space-y-0 " >
        <div className="sm:col-span-2">
          <div className="mt-3">
            <div className="group mb-2">
              <h4 className="  text-2xl leading-6 font-sans text-skin-inverted group-hover:text-skin-primary">
                {event.name}
              </h4>
              <h5 className='text-md font-bold leading-6 font-sans '>
                Sub Titulo
              </h5>
            </div>
{audio && (
                <audio style={{marginBottom:'10px' ,width:'260px',height:'25px',marginLeft:'22px'}} controls src={audio}>
                  <Link href={audio} />
                </audio>
              )}
            <p className="mt-1 text-sm font-normal text-skin-base leading-5">
              {event.descripcion} Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae odio sit consequuntur numquam natus laudantium a, dolores deleniti assumenda vel veniam laborum, unde minima distinctio? Aperiam vel officia cumque consectetur. </p>
            
            <div  style={{ display:'flex', justifyContent:'start', marginTop:'20px'}}>
                    Fecha de Inicio: {startDate}
                    <br />
                    Finaliza: {endDate} 
         </div>
          </div>
        </div>
        
      </div>
      </div>
      
      </div>
    </div>
  )
}
