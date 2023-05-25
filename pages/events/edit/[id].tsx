import { useRouter } from 'next/router'
import { Event, EventTypes } from '../../../src/models'
import Image from 'next/image'
import svg4 from '../../../public/svg4.svg'
// import { Authenticator, Flex, useTheme } from '@aws-amplify/ui-react'
// import { withAuthenticator } from '@aws-amplify/ui-react'
import Link from 'next/link'
import EventUpdateForm, {
  EventUpdateFormInputValues,
} from '../../../src/components/eventUpdateFormEdited/EventUpdateForm'
import React, {  useEffect, useState } from 'react'
// import { getEvent, listEventTypes } from '../../../src/graphql/queries'
import DropZone from '../../../src/components/DropZone/DropZone'
import DropZoneAudio from '../../../src/components/DropZone/DropZoneAudio'
import { createClient } from '@supabase/supabase-js';
import { Auth, Storage } from '@supabase/ui';
import { Authenticator, Flex } from '@aws-amplify/ui-react'

const supabase = createClient('your-supabase-url', 'your-supabase-key');

export { supabase };

interface IProps {
  eventOptions: Array<EventTypes>
  event: Event
  signOut: () => void
  user: Record<string, any>
  renderedAt: string
}

function Id({ event, signOut, user, renderedAt, eventOptions }: IProps) {
  const router = useRouter()
  const id = router.query.id as string

  const handleAudioChange = async (files: File[]) => {
    const file = files[0]
    try {
      const { error } = await supabase.storage
        .from('audio')
        .upload(`audio/${id}`, file);
      if (error) {
        console.log('Error uploading file: ', error);
      }
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  const handleImageChange = async (files: File[]) => {
    const file = files[0]
    try {
      const { error } = await supabase.storage
        .from('images')
        .upload(id, file);
      if (error) {
        console.log('Error uploading file: ', error);
      }
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  const [audio, setAudio] = useState<string | undefined>();

  const getUploadedAudio = async () => {
    const file = await supabase.storage
      .from('audio')
      .download(`audio/${id}`);
  
    if (file && file.data) {
      const objectUrl = URL.createObjectURL(file.data);
      setAudio(objectUrl);
    }
  }
  
  useEffect(() => {
    getUploadedAudio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [image, setImage] = useState<string | undefined>();

  const getUploadedImage = async () => {
    const file = await supabase.storage
      .from('images')
      .download(id);
  
    if (file && file.data) {
      const objectUrl = URL.createObjectURL(file.data);
      setImage(objectUrl);
    }
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
    console.log(handleSuccess)
    router.push(`/profile`)
  }
  const handleError = (_event: EventUpdateFormInputValues, message: string) => {
    setError(message)
    setLoading(false)
  }
  const handleSubmit = (e: any) => {
    console.log('handleSubmit', { e })

    return e
  }

  return (
    <Authenticator components={authComponents} hideSignUp={true}>
      <div
        style={{
          background: 'black',
        }}
      >
        <nav
          className=" p-2 mt-0  w-full z-10 top-0 "
          style={{ borderBottomWidth: '1px', borderColor: 'white' }}
        >
          <div className="container mx-auto flex flex-wrap items-center">
            <div className="flex w-full md:w-1/2 justify-center md:justify-start text-white">
              <div className="text-white no-underline hover:text-white hover:no-underline">
                <div className="flex text-2xl pl-2">
                  <div className="em em-grinning"></div>
                  <div className="text-5xl" style={{ color: 'white' }}>
                    WeeOut
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
              <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
                <li className="mr-3">
                  <Link
                    href="/profile"
                    className=" hover:bg-rose-500  text-white  py-2 px-4 border border-transparent  hover:text-black  flex items-center justify-center"
                  >
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

        <div className="h-full p-8 flex  justify-center ">
          <div className=" break-words w-6/6 rounded-lg  ">
            {' '}
            <div className="">
              <div>
                <div className='flex'>
                <div className="p-8 flex flex-col items-center ">
                  <h3 className="text-xl text-white leading-normal mb-1 ">
                    Buenisimo {user.username} !!
                  </h3>
                  <div
                    className="text-xs  mb-10 text-slate-400 "
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <h2 className="mr-2 text-white opacity-85 text-sm">
                      El evento ya fue creado
                    </h2>
                    <h2 className="mr-2 text-white opacity-85 text-sm">
                      {' '}
                      ahora solo falta que termines de rellenarlo
                      <br /> para poder compartirlo con todo el mundo!
                    </h2>
                  </div>
                  <Image alt="" src={svg4} className="" />
                  <DropZone handleImageChange={handleImageChange} />
                      <br />
                      <DropZoneAudio handleAudioChange={handleAudioChange} />
                </div><div>
                <div className=" grid-cols-1 rounded bg-slate-200 " >
                      <EventUpdateForm
                        id={event?.id}
                        onSubmit={handleSubmit}
                        onSuccess={handleSuccess}
                        onError={handleError}
                        eventTypesOptions={eventOptions}
                      />
                    
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

function useTheme(): { tokens: any } {
  throw new Error('Function not implemented.')
}

function setLoading(arg0: boolean) {
  throw new Error('Function not implemented.')
}

function setError(message: string) {
  throw new Error('Function not implemented.')
}

