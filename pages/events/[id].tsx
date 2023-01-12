import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { withSSRContext } from 'aws-amplify'
import { getEvent } from '../../src/graphql/queries'
import { Event } from '../../src/models'
import Map from '../map/index'
import Image from 'next/image'
import { Storage } from 'aws-amplify'
import svg6 from '../../public/svg6.svg'
import img1 from '../../public/img1.jpg'
import parseDate from '../../src/helperFunctions/parseDate'
import Link from 'next/link'

interface IProps {
  event: Event
  center: google.maps.LatLng | google.maps.LatLngLiteral
}

export async function getServerSideProps({ req, query }: any) {
  const SSR = withSSRContext({ req })
  const id = query.id as string
  try {
    const response = await SSR.API.graphql({
      query: getEvent,
      variables: { id: id },
    })
    return {
      props: {
        event: response.data.getEvent,
      },
    }
  } catch (err) {
    console.log(err)
    return {
      props: {},
    }
  }
}

export default function Id({ event, center }: IProps | any) {
  const [image, setImage] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [audio, setAudio] = useState<string>()

  const getUploadedImage = async () => {
    const file = await Storage.get(event.id, {
      level: 'public',
    })
    setImage(file)
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
  const router = useRouter()
  const id = router.query.id as string
  const name = router.query.comment as string
  const mapCenter = JSON.parse(
    event.map_point || '{ "lat": -34.91554, "lng": -57.91454 }',
  )

  return (
    <>
    
      <div className="pt-40 flex  items-center pb-40" >
        <nav className="p-2 mt-0 fixed w-full z-10 top-0" style={{background:'#2596be'}}>
          <div className="container mx-auto flex flex-wrap items-center">
            <div className="flex w-full md:w-1/2 justify-center md:justify-start text-white font-extrabold">
              <div className="text-white no-underline hover:text-white hover:no-underline">
                <div className="flex text-2xl pl-2">
                  <div className="em em-grinning"></div>
                  Bienvenido a<div className="text-yellow-500 mx-2">Weeout</div>
                </div>
              </div>
            </div>
            <div className="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
              <ul className="list-reset flex justify-between flex-1 md:flex-none items-center pb-2">
                <li className="mr-3">
                  <Link
                    href="/"
                   style={{background:'#ba7dc2'}} className=" text-white font-semibold   py-2 px-4 border border-yellow-500 hover:border-transparent rounded flex items-center justify-center"                   >
                    Pagina principal
                  </Link>
                </li>
                <li className="mr-3">
                  <Link
                    href="/profile"
                  style={{background:'#ba7dc2'}} className=" text-white font-semibold   py-2 px-4 border border-yellow-500 hover:border-transparent rounded flex items-center justify-center"                   >
                    Empieza ahora
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className='flex flex-col p-10'>
        <Image
                      alt=""
                      src={svg6}
                      width={700}
                      height={700}
                      className="mx-auto  dark:bg-gray-500"
                    />
          <h1 className="mt-10 text-3xl text-slate-500 font-bold leading-normal mb-1 flex justify-center items-center" style={{maxWidth:'500px', marginLeft:'100px'}}>¿Te agrado este evento? <br/> Recuerda que hay muchos mas esperando ahi fuera <br/> No te los pierdas!</h1>
        </div>
        
        <div className="flex flex-col justify-center items-center  p-20" style={{ background:'#ba7dc2',borderRadius:'10px', color:'white'
}}>
          <h2 className="mx-auto rounded-lg shadow-xl dark:bg-gray-500 tracking-tight text-center border border-gray-300 p-8 dark:text-gray-50 xl:font-serif text-5xl mb-10">
            {event.name}
          </h2>
          <h2 className="max-w-3xl mx-auto mt-4 text-xl text-center font-serif ">
            Usuario que posteo el evento:
          </h2>
          <h2 className="max-w-3xl mx-auto mt-4 text-xl text-center font-serif ">
            {event.user}
          </h2>
          <div className="flex justify-center items-center">
            <section
              className="flex w-6/6 rounded-lg p-8 "
              style={{
                background:'#ba7dc2',
                maxWidth: '600px',
                minHeight: '500px',
              }}
            >
              <div className="container max-w-xl p-6 py-12 mx-auto space-y-24 lg:px-8 lg:max-w-7xl">
                <div className="mt-10 lg:mt-0 lg:col-start-1 lg:row-start-1">
                  {error ? (
                    <Image
                      alt=""
                      src={img1}
                      width={700}
                      height={700}
                      className="mx-auto rounded-lg shadow-xl dark:bg-gray-500"
                    />
                  ) : (
                    <Image
                      alt=""
                      src={image}
                      width={700}
                      height={700}
                      onError={handleImageError}
                      className="mx-auto rounded-lg shadow-xl dark:bg-gray-500"
                    />
                  )}
                </div>
                <div>
                  <div className="flex flex-col lg:items-center">
                    <div className="lg:col-start-2">
                      <h3 className="text-2xl font-bold tracking-tight sm:text-3xl font-serif ">
                        {event.subtitle}
                      </h3>
                      <p className="mt-3 text-lg font-serif " style={{color:'black', background:'white', padding:'40px', maxWidth:'500px',borderRadius:'10px'}}>
                        {event.descripcion}
                      </p>
                      <div className="mt-12 space-y-12">
                        <div className="flex">
                          <div className="flex-shrink-0"></div>
                          <div className="ml-4">
                            {audio && (
                              <audio controls src={audio} style={{width:'450px'}}>
                                <Link href={audio} />
                              </audio>
                            )}
                          </div>
                        </div>

                        <div className="flex">
                          <div className="ml-4">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                              {event.types}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="mx-auto rounded-xl shadow-xl dark:bg-gray-500"><Map events={[event]} center={mapCenter} zoom={15} /></div>
            
          </div>
        </div>
      </div>
      <footer style={{background:'#2596be'}} className="p-4 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <span className="text-sm text-white sm:text-center dark:text-gray-400">
          © 2022. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link
              href="/aboutUs"
              className="mr-8  hover:text-yellow-500 md:mr-6 text-1xl text-white"
            >
              Sobre nosotros
            </Link>
          </li>
        </ul>
      </footer>
    </>
  )
}
