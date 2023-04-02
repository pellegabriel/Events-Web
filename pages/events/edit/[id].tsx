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
        <div style={{ 
        background: 'black'
      }} >
      <nav className=" p-2 mt-0  w-full z-10 top-0 "style={{borderBottomWidth:'1px', borderColor:'white'}}>
        <div className="container mx-auto flex flex-wrap items-center">
          <div className="flex w-full md:w-1/2 justify-center md:justify-start text-white">
            <div className="text-white no-underline hover:text-white hover:no-underline">
              <div className="flex text-2xl pl-2">
                <div className="em em-grinning"></div>
                <div className='text-5xl' style={{color:'white'}}>WeeOut</div>
              </div>
            </div>
          </div>
          <div className="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
            <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
              <li className="mr-3">
                <Link
                  href="/profile"
                     className=" hover:bg-rose-500  text-white  py-2 px-4 border border-transparent  hover:text-black  flex items-center justify-center"                  >
                  Volver a Usuario
                </Link>
              </li>
              <li className="mr-3">
                <Link
                  href="/"
                     className=" hover:bg-rose-500  text-white  py-2 px-4 border border-transparent  hover:text-black  flex items-center justify-center"               
                 >
                  Pagina principal
                </Link>
              </li>

              <li className="mr-3">
                <Link
                  href="/"
                     className=" hover:bg-rose-500  text-white  py-2 px-4 border border-transparent  hover:text-black  flex items-center justify-center"                  
                   onClick={signOut}
                >
                  Cerrar sesion
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="h-full p-8 flex items-center justify-center ">
        <div className=" break-words  mt-16 w-6/6 rounded-lg p-8 " >
          {' '}
          <div className="">
            <div >
             
              <div className="p-8 mx-20 flex flex-col items-center justify-center">
                <h3 className="text-4xl text-white leading-normal mb-1 ">
                  Buenisimo {user.username} !
                </h3>
                <div className="text-xs mt-4 mb-10 text-slate-400 " style={{display:'flex', justifyContent:'center',alignItems:'center', flexDirection:'column'}}>
                  <h2 className="mr-2 text-white opacity-85 text-xl">El evento ya fue creado</h2>
                  <h2 className="mr-2 text-white opacity-85 text-xl"> ahora solo  falta que termines de  rellenarlo
                   <br/> para poder compartirlo con todo el mundo!</h2>
                  
                </div>
                <Image
                    alt=""
                    src={svg4}
                    className=""
                  /> 
              </div>
              <div className="p-8  flex justify-center mt-6 py-6 border-t border-slate-300 text-center">
                <div className=" overflow-hidden flex items-center justify-center">
                  <div className="mt- mb-8 grid-cols-1 p-10">
                    <h1 className="text-2xl text-white  leading-normal mb-1">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
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

