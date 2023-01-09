import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { withSSRContext } from 'aws-amplify'
import { getEvent } from '../../src/graphql/queries'
import { Event } from '../../src/models'
import Map from '../map/index'
import Image from 'next/image'
import { Storage } from 'aws-amplify'
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
      <div className="pt-40 flex justify-center items-center">
        <nav className="bg-violet-800 p-2 mt-0 fixed w-full z-10 top-0">
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
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold   py-2 px-4 border border-yellow-500 hover:border-transparent rounded flex items-center justify-center"
                  >
                    Pagina principal
                  </Link>
                </li>
                <li className="mr-3">
                  <Link
                    href="/profile"
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold   py-2 px-4 border border-yellow-500 hover:border-transparent rounded flex items-center justify-center"
                  >
                    Empieza ahora
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="flex flex-col justify-center items-center">
          <h2 className="  tracking-tight text-center  dark:text-gray-50 xl:font-serif text-5xl text-black mb-10">
            {event.name}
          </h2>
          <p className="max-w-3xl mx-auto mt-4 text-xl text-center font-serif text-black">
            {event.user}
          </p>
          <div className="flex justify-center items-center">
            <section
              className="flex border border-gray-300 w-6/6 rounded-lg p-8 "
              style={{
                background: '#E5E8E8',
                maxWidth: '600px',
                minHeight: '1000px',
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
                      className="mx-auto rounded-lg shadow-lg dark:bg-gray-500"
                    />
                  ) : (
                    <Image
                      alt=""
                      src={image}
                      width={700}
                      height={700}
                      onError={handleImageError}
                      className="mx-auto rounded-lg shadow-lg dark:bg-gray-500"
                    />
                  )}
                </div>
                <div>
                  <div className="flex flex-col lg:items-center">
                    <div className="lg:col-start-2">
                      <h3 className="text-2xl font-bold tracking-tight sm:text-3xl font-serif text-black">
                        {event.subtitle}
                      </h3>
                      <p className="mt-3 text-lg font-serif text-black">
                        {event.descripcion}
                      </p>
                      <div className="mt-12 space-y-12">
                        <div className="flex">
                          <div className="flex-shrink-0"></div>
                          <div className="ml-4">
                            {audio && (
                              <audio controls src={audio}>
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
            <Map events={[event]} center={mapCenter} zoom={15} />
          </div>
        </div>
      </div>
      <footer className="p-4 bg-violet-800  shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
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
    // {/* <div className="dark:bg-gray-800 dark:text-gray-50">
    // 	<div className="container grid grid-cols-12 mx-auto dark:bg-gray-900">
    // 		<div className="bg-no-repeat bg-cover dark:bg-gray-700 col-span-full lg:col-span-4" >
    //     {error ? (
    //               <Image alt="" src={img1} width={400} height={200} />
    //             ) : (
    //               <Image
    //                 alt=""
    //                 src={image}
    //                 width={400}
    //                 height={200}
    //                 onError={handleImageError}
    //               />
    //             )}
    //     </div>
    // 		<div className="flex flex-col p-6 col-span-full row-span-full lg:col-span-8 lg:p-10">
    // 			<div className="flex justify-start">
    // 				<span className="px-2 py-1 text-xs rounded-full dark:bg-violet-400 dark:text-gray-900">Label</span>
    // 			</div>
    // 			<h1 className="text-3xl font-semibold">Lorem ipsum dolor sit.</h1>
    // 			<p className="flex-1 pt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, reprehenderit adipisci tempore voluptas laborum quod.</p>
    // 			<a rel="noopener noreferrer" href="#" className="inline-flex items-center pt-2 pb-6 space-x-2 text-sm dark:text-violet-400">
    // 				<span>Read more</span>
    // 				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    // 					<path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
    // 				</svg>
    // 			</a>
    // 			<div className="flex items-center justify-between pt-2">
    // 				<div className="flex space-x-2">
    // 					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 dark:text-gray-400">
    // 						<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
    // 					</svg>
    // 					<span className="self-center text-sm">by Leroy Jenkins</span>
    // 				</div>
    // 				<span className="text-xs">3 min read</span>
    //         <>
    //       <>{event.name}</>
    //       <>{event.user}</>
    //       <div className="text-xl col-span-12 lg:col-span-7 mb-40 mt-40">
    //           <h1 className="xl:font-serif text-4xl text-white pb-8">
    //             Mira los eventos que te rodean:
    //           </h1>
    //           <Map events={[event]} />
    //         </div>
    //     </>
    // 			</div>
    // 		</div>
    // 	</div>
    // </div> */}
  )
}
