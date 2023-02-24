import { useRouter } from 'next/router'
import { Event, EventTypes } from '../../../src/models'
import Image from 'next/image'
import { Storage, withSSRContext } from 'aws-amplify'
import svg4 from '../../../public/svg4.svg'
import { Authenticator, Flex, useTheme } from '@aws-amplify/ui-react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import Link from 'next/link'
import EventUpdateForm, { EventUpdateFormInputValues } from '../../../src/components/eventUpdateFormEdited/EventUpdateForm'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { getEvent, listEventTypes } from '../../../src/graphql/queries'
import DropZone from '../../../src/components/DropZone/DropZone'
import DropZoneAudio from '../../../src/components/DropZone/DropZoneAudio'


interface IProps {
  eventOptions : Array<EventTypes>
  event: Event
  signOut: () => void
  user: Record<string, any>
  renderedAt: string
}

export async function getServerSideProps({ req, query }: any) {
  const SSR = withSSRContext({ req })
  const id = query.id as string
  const renderedAt = new Date()

  const formattedBuildDate = renderedAt.toLocaleDateString('en-US', {
    dateStyle: 'long',
  })
  const formattedBuildTime = renderedAt.toLocaleTimeString('en-US', {
    timeStyle: 'long',
  })
  try {
    const response = await SSR.API.graphql({
      query: getEvent,
      variables: { id: id },
    })
    const eventTypeOptions = await SSR.API.graphql({
      query: listEventTypes,
    })
    return {
      props: {
        event: response.data.getEvent,
        eventOptions: eventTypeOptions.data.listEventTypes.items,
        renderedAt: `${formattedBuildDate} at ${formattedBuildTime}`,
      },
    }//cambiar por listEventTypes
  } catch (err) {
    console.log(err)
    return {
      props: {},
    }
  }
}



function Id({ event, signOut, user, renderedAt, eventOptions }: IProps) {
  const router = useRouter()
  const eventTitle = router.query.eventTitle
  const id = router.query.id as string


  const handleAudioChange = async (files: File[]) => {
    const file = files[0]
    try {
      Storage.put(`audio/${id}`, file)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  const handleImageChange = async (files: File[]) => {
    const file = files[0]
    try {
      Storage.put(id, file)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  const [audio, setAudio] = useState<string>()
  const getUploadedAudio = async () => {
    const file = await Storage.get(`audio/${id}`, {
      level: 'public',
    })
    setAudio(file)
  }
  useEffect(() => {
    getUploadedAudio()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [image, setImage] = useState<string>()
  const getUploadedImage = async () => {
    const file = await Storage.get(id, {
      level: 'public',
    })
    setImage(file)
  }
  useEffect(() => {
    getUploadedImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const authComponents = {
    Header() {
      const { tokens } = useTheme()
      return (
        <Flex
          justifyContent={'center'}
          direction="column"
          paddingTop={tokens.space.xxxl}
          paddingBottom={tokens.space.xxl}
        ></Flex>
      )
    },
  }
  const handleSuccess = (_event: EventUpdateFormInputValues) => {
    console.log (handleSuccess)
    router.push(`/profile`)
  }
  const handleError = (_event: EventUpdateFormInputValues, message: string) => {
    setError(message)
    setLoading(false)
  }
  const handleSubmit = (e: any) => {
    console.log("handleSubmit", {e})
    
    return e
  }

  return (
    <Authenticator components={authComponents} hideSignUp={true}>
      <nav className=" p-2 mt-0 fixed w-full z-10 top-0 "style={{background:'#B746D7',borderBottomWidth:'3px', borderColor:'black'}}>
        <div className="container mx-auto flex flex-wrap items-center">
          <div className="flex w-full md:w-1/2 justify-center md:justify-start text-white font-extrabold">
            <div className="text-white no-underline hover:text-white hover:no-underline">
              <div className="flex text-2xl pl-2">
                <div className="em em-grinning"></div>
                <div className='text-5xl font-extrabold' style={{color:'white'}}>WeeOut</div>
              </div>
            </div>
          </div>
          <div className="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
            <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
              <li className="mr-3">
                <Link
                  href="/profile"
                    style={{background:'#FF0062'}} className=" text-white  font-extrabold  py-2 px-4 border border-transparent border-black  hover:text-black rounded flex items-center justify-center"
                 >
                  Volver a Usuario
                </Link>
              </li>
              <li className="mr-3">
                <Link
                  href="/"
                    style={{background:'#FF0062'}} className=" text-white  font-extrabold  py-2 px-4 border border-transparent border-black  hover:text-black rounded flex items-center justify-center"
                 >
                  Pagina principal
                </Link>
              </li>

              <li className="mr-3">
                <Link
                  href="/"
                    style={{background:'#FF0062'}} className=" text-white  font-extrabold  py-2 px-4 border border-transparent border-black  hover:text-black rounded flex items-center justify-center"
                   onClick={signOut}
                >
                  Cerrar sesion
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="h-full p-8 flex items-center justify-center " >
        <div className=" break-words bg-white  mt-16 border border-gray-300 w-6/6 rounded-lg p-8 " style={{borderWidth:'3px', borderColor:'black'}}>
          {' '}
          <div className="">
            <div >
             
              <div className="p-8 mx-20 flex flex-col items-center justify-center">
                <h3 className="text-4xl text-black font-extrabold leading-normal mb-1 ">
                  Buenisimo {user.username} !
                </h3>
                <div className="text-xs mt-4 mb-10 text-slate-400 font-extrabold " style={{display:'flex', justifyContent:'center',alignItems:'center', flexDirection:'column'}}>
                  <h2 className="mr-2 text-slate-500 opacity-85 text-xl font-extrabold">El evento ya fue creado</h2>
                  <h2 className="mr-2 text-slate-500 opacity-85 text-xl font-extrabold"> ahora solo  falta que termines de  rellenarlo
                   <br/> para poder compartirlo con todo el mundo!</h2>
                  
                </div>
                <Image
                style={{ background: '#ba7dc2', borderRadius:'30px' ,borderWidth:'3px', borderColor:'black'}}
                    alt=""
                    src={svg4}
                    className=""
                  />
                
              </div>
              <div className="p-8  flex justify-center mt-6 py-6 border-t border-slate-300 text-center">
                <div className=" overflow-hidden flex items-center justify-center">
                  <div className="mt- mb-8 grid-cols-1 p-10">
                    <h1 className="text-2xl text-black font-bold leading-normal mb-1">
                      Actualiza el evento:{' '}
                    </h1>

                    <EventUpdateForm
                      id={event?.id}
                      onSubmit={handleSubmit}
                      onSuccess={handleSuccess}
                      onError={handleError}
                      eventTypesOptions={eventOptions}
                    />
                    <DropZone handleImageChange={handleImageChange} />
                    <br />
                    <DropZoneAudio handleAudioChange={handleAudioChange} />
                    {/* <div className="max-w-xl">
                        <label
                            className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                            <span className="flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <span className="font-medium text-gray-600">
                                    Arrastra el archivo de audio aqui.
                                </span>
                            </span>
                     
                            <input type="file" name="file_upload" onChange={handleAudioChange} className="hidden"/>
                        </label>
                    </div> */}

              
                    
                    {/* {audio && (
                      <audio controls src={audio} style={{width:'550px', padding:'10px'}}>
                        <Link href={audio} />
                      </audio>
                    )} */}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer style={{background:'#B746D7',borderWidth:'3px', borderColor:'black'}} className="p-4 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <span className="text-sm text-white sm:text-center dark:text-gray-400">
          © 2022. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link
              href="/aboutUs"
              style={{background:'#FF0062'}} className=" text-white  font-extrabold  py-2 px-4 border border-transparent border-black  hover:text-black rounded flex items-center justify-center"
              >
              Sobre nosotros
            </Link>
          </li>
        </ul>
      </footer>
    </Authenticator>
  )
}
export default withAuthenticator(Id)
function setError(message: string) {
  throw new Error('Function not implemented.')
}

function setLoading(arg0: boolean) {
  throw new Error('Function not implemented.')
}

