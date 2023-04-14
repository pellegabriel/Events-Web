import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { withSSRContext } from 'aws-amplify'
import { getEvent } from '../../src/graphql/queries'
import { Event } from '../../src/models'
import Map from '../map/index'
import Image from 'next/image'
import { Storage } from 'aws-amplify'
import svg6 from '../../public/svg6.svg'
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
  const img1 = '/img1.jpg'
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
    <div
      style={{
        background: 'black',
      }}
    >
      <nav className=" p-2 mt-0 w-full z-10 top-0 mb-12 border-b border-gray-300">
        <div className="container mx-auto flex flex-wrap items-center">
          <div className="flex w-full md:w-1/2 justify-center md:justify-start text-white ">
            <div className="flex text-2xl pl-2">
              <div className="em em-grinning"></div>
              <div className="text-5xl " style={{ color: 'white' }}>
                WeeOut
              </div>
            </div>
          </div>
          <div className="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
            <ul className="list-reset flex justify-between flex-1 md:flex-none items-center pb-2">
              <li className="mr-3">
                <Link
                  href="/"
                  className=" hover:bg-rose-500  text-white    py-2 px-4 border border-transparent hover:text-white  flex items-center justify-center"
                >
                  Pagina principal
                </Link>
              </li>
              <li className="mr-3">
                <Link
                  href="/profile"
                  className=" hover:bg-rose-500  text-white    py-2 px-4 border border-transparent hover:text-white  flex items-center justify-center"
                >
                  Empieza ahora
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '7rem',
        }}
      >
        <h2 className="mx-auto rounded-lg  tracking-tight text-center text-white  text-5xl mb-4 w-full">
          {event.name}
        </h2>
        <h3 className="text-2xl font-bold tracking-tight sm:text-3xl  text-white">
          {event.subtitle}Sub Titulo
        </h3>
        <h2 className="max-w-3xl mx-auto  text-xl text-white text-center">
          Usuario que posteo el evento:
        </h2>
        <h2 className="max-w-3xl mx-auto text-xl text-white text-center">
          {event.user}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div
            className="mx-auto  flex justify-content "
            style={{
              marginTop: '80px',
              height: '1000px',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Map events={[event]} center={mapCenter} zoom={15} />
            
            <div style={{display:'flex', flexDirection:'row'}}>    
            <Image
            alt=""
            src={svg6}
            width={70}
            height={70}
            className="mx-auto"
          />
          <h1
            className="mt-5 mb-10 text-l text-white  leading-normal flex justify-center items-center"
            style={{ marginLeft: '10px'}}
          >
            ¿Te agrado este evento? Recuerda que hay muchos mas esperando
            ahi fuera <br /> No te los pierdas!
          </h1>
          
          </div> 
          </div>

          <div
            className="flex flex-col justify-center items-center  p-10"
            style={{ color: 'white' }}
          >
            <div className="flex justify-center items-center">
              <section
                className="flex w-6/6 rounded-lg  "
                style={{
                  maxWidth: '600px',
                  minHeight: '500px',
                }}
              >
                <div className="container max-w-xl p-6 py-12 mx-auto  lg:px-8 lg:max-w-7xl">
                  <div className="mt-10 lg:mt-0 lg:col-start-1 lg:row-start-1">
                    {error ? (
                      <Image
                        alt=""
                        src={img1}
                        width={500}
                        height={500}
                        className="mx-auto rounded-lg shadow-xl dark:bg-gray-500"
                        style={{ borderWidth: '3px', borderColor: 'white' }}
                      />
                    ) : (
                      <Image
                        alt=""
                        src={image}
                        width={700}
                        height={700}
                        onError={handleImageError}
                        className="mx-auto rounded-lg shadow-xl dark:bg-gray-500"
                        style={{ borderWidth: '3px', borderColor: 'white' }}
                      />
                    )}
                  </div>
                  <div>
                    <div className="flex flex-col lg:items-center">
                      <div className="lg:col-start-2">
                        <p
                          className="mt-3 text-lg  "
                          style={{
                            color: 'white',
                            padding: '40px',
                            maxWidth: '500px',
                            borderRadius: '10px',
                          }}
                        >
                          {event.descripcion} Lorem ipsum dolor sit, amet
                          consectetur adipisicing elit. Quod, at. Nam voluptatum
                          ratione in? Iure nam sunt sit nostrum accusantium
                          incidunt quaerat, similique, blanditiis consequatur
                          autem amet aut reiciendis nihil?
                        </p>
                        <h3
                          className=""
                          style={{
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '15px',
                            fontSize: '20px',
                          }}
                        >
                          El evento dura del: <br />
                          {startDate}
                          al {endDate}
                        </h3>
                        <div className="mt-12 space-y-12">
                          <div className="flex">
                            <div className="flex-shrink-0"></div>
                            <div className="ml-4">
                              {audio && (
                                <audio
                                  controls
                                  src={audio}
                                  style={{ width: '450px' }}
                                >
                                  <Link href={audio} />
                                </audio>
                              )}
                            </div>
                          </div>
                          <div className="flex">
                            <div className="ml-4">
                              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
                                {event.types}
                              </span>
                              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
                                {event.types}
                              </span>
                              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
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
            </div>
          </div>
        </div>
      </div>

      <footer
        style={{ borderTopWidth: '3px', borderColor: 'white' }}
        className=" shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-white"
      >
        <span className="text-sm text-white sm:text-center dark:text-gray-400">
          © 2022. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500  sm:mt-0">
          <li>
            <Link
              href="/aboutUs"
              className=" hover:bg-rose-500  text-white    py-2 px-4 border border-transparent hover:text-white  flex items-center justify-center"
            >
              Sobre nosotros
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  )
}
