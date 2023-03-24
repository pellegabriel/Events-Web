import Image from 'next/image'
import { Event } from '../../models'
import { useEffect, useRef, useState } from 'react'
import { Storage } from 'aws-amplify'
import Link from 'next/link'
import parseDate from '../../helperFunctions/parseDate'

interface IProps {
  event: Event
}

export default function EventCard({ event }: IProps | any) {
  const elRef = useRef<HTMLDivElement>(null);

  function handleMove(e: MouseEvent) {
    const el = elRef.current;
    if (el) {
      const height = el.clientHeight;
      const width = el.clientWidth;

      const xVal = e.offsetX;
      const yVal = e.offsetY;

      const yRotation = 20 * ((xVal - width / 2) / width);
      const xRotation = -20 * ((yVal - height / 2) / height);
      const string = `perspective(500px) scale(1) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;

      el.style.transform = string;
    }
  }

  function handleMouseOut() {
    const el = elRef.current;
    if (el) {
      el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)';
    }
  }

  function handleMouseDown() {
    const el = elRef.current;
    if (el) {
      el.style.transform = 'perspective(500px) scale(0.9) rotateX(0) rotateY(0)';
    }
  }

  function handleMouseUp() {
    const el = elRef.current;
    if (el) {
      el.style.transform = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)';
    }
  }

  useEffect(() => {
    const el = elRef.current;
    if (el) {
      el.addEventListener('mousemove', handleMove);
      el.addEventListener('mouseout', handleMouseOut);
      el.addEventListener('mousedown', handleMouseDown);
      el.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      if (el) {
        el.removeEventListener('mousemove', handleMove);
        el.removeEventListener('mouseout', handleMouseOut);
        el.removeEventListener('mousedown', handleMouseDown);
        el.removeEventListener('mouseup', handleMouseUp);
      }
    };
  }, []);
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

  // const backgroundColors = ['#FF65A1 ', '#ba7dc2', 'yellow']
  // const randomColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
     setIsHover(true);
  };
  const handleMouseLeave = () => {
     setIsHover(false);
  };
  const boxStyle = {maxWidth:'700px'   ,backgroundColor: isHover ?  '#a561bf'  : '#170b0e',minHeight: '365px'
}

  return (
  
    <div
    id="tilt" ref={elRef}
      style={{
        margin: '20px',
        display: 'flex',
        minHeight: '365px',
        maxWidth: '270px',
        flexDirection: 'column',
        boxShadow: "0px 0px 30px rgba(0,0,0, 0.6)",
        color:'white'

        // background: randomColor,
      }}
      className=" overflow-hidden shadow-xl"
    >
        <div style={boxStyle}
    onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
>
      <h2 className='text-lg flex justify-center font-extrabold' style={{color:'white', backgroundColor:'#170b0e', padding: '8px'}}>
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
            <span style={{backgroundColor:'#FF0062'}} className="inline-block bg-gray-200  px-3 py-1 text-xs font-semibold text-white">
              {event.types}
            </span>
          </div>
        )}

        {audio && (
          <div style={{ display: 'flex', marginTop: 'auto', padding: '8px' }}>
            <audio controls src={audio} style={{ height: '20px' }}>
              <Link href={audio} />
            </audio>
          </div>
        )}
    </div>
    </div>      
  )
}
