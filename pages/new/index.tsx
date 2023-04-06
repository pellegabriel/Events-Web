import { useRouter } from 'next/router'
import { Event } from '../../src/models'
import Image from 'next/image'
import { Storage, withSSRContext } from 'aws-amplify'
import user1 from '../../public/user1.png'
import { Authenticator, Flex, useTheme } from '@aws-amplify/ui-react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { AmplifyUser } from '@aws-amplify/ui'
import Link from 'next/link'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { getEvent } from '../../src/graphql/queries'
import { EventCreateForm } from '../../src/ui-components'
import { EventCreateFormInputValues } from '../../src/components/eventCreateFormEdited/EventCreateForm'
import Spinner from '../../src/components/spinner'

interface IProps {
  event: Event
  signOut: () => void
  user: AmplifyUser
  renderedAt: string
}

export async function getServerSideProps({ req, query }: any) {
  const SSR = withSSRContext({ req })
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
    })
    return {
      props: {
        event: response.data.getEvent,
        renderedAt: `${formattedBuildDate} at ${formattedBuildTime}`,
      },
    }
  } catch (err) {
    console.log(err)
    return {
      props: {},
    }
  }
}

function NewEvent({ signOut, user, renderedAt }: IProps) {
  const router = useRouter()
  const [error, setError] = useState<string>()
  const [isLoading, setLoading] = useState<boolean>(false)
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
  const handleSuccess = (_event: EventCreateFormInputValues) => {
    router.push(`/profile`)
  }
  const handleError = (_event: EventCreateFormInputValues, message: string) => {
    setError(message)
    setLoading(false)
  }
  const handleSubmit = (event: EventCreateFormInputValues) => {
    setLoading(true)

    return {
      ...event,
      ...{
        user: user.username,
      },
    }
  }

  return (
    <Authenticator components={authComponents} hideSignUp={true}>
      <nav className="bg-violet-800 p-2 mt-0 fixed w-full z-10 top-0 ">
        <div className="container mx-auto flex flex-wrap items-center">
          <div className="flex w-full md:w-1/2 justify-center md:justify-start text-white">
            <div className="text-white no-underline hover:text-white hover:no-underline">
              <div className="flex text-2xl pl-2">
                <div className="em em-grinning"></div>
                Bienvenido a<div className="text-yellow-500 mx-2">Weeout</div>
              </div>
            </div>
          </div>
          <div className="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
            <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
              <li className="mr-3">
                <Link
                  href="/profile"
                  style={{ background: '#138D75' }}
                  className=" text-white font-semibold   py-2 px-4 border border-yellow-500 hover:border-transparent rounded flex items-center justify-center"
                >
                  Volver a Usuario
                </Link>
              </li>
              <li className="mr-3">
                <Link
                  href="/"
                  style={{ background: '#138D75' }}
                  className=" text-white font-semibold   py-2 px-4 border border-yellow-500 hover:border-transparent rounded flex items-center justify-center"
                >
                  Pagina principal
                </Link>
              </li>

              <li className="mr-3">
                <Link
                  href="/"
                  style={{ background: '#138D75' }}
                  className=" text-white font-semibold   py-2 px-4 border border-yellow-500 hover:border-transparent rounded flex items-center justify-center"
                  onClick={signOut}
                >
                  Cerrar sesion
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="h-full p-8 flex items-center justify-center bg-gradient-to-t from-gray-800 to-violet-700">
        <div className=" break-words bg-white  mt-16 border border-gray-300 w-6/6 rounded-lg p-8 ">
          <div className="">
            <div className="">
              <div className=" flex ">
                <div className="mt-20">
                  <Image
                    alt=""
                    src={user1}
                    className="shadow-xl rounded-full align-middle border-none -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                  />
                </div>
              </div>
              <div className="p-8 mx-20">
                <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
                  Buenisimo {user.username} !
                </h3>
                <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
                  Fecha de la creacion: {renderedAt}
                </div>
              </div>
              <div className="p-8  flex justify-center mt-6 py-6 border-t border-slate-300 text-center">
                <div className=" overflow-hidden flex items-center justify-center">
                  <div className="mt- mb-8 grid-cols-1 p-10">
                    <h1 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
                      Crea un evento:
                    </h1>

                    <EventCreateForm
                      onSuccess={handleSuccess}
                      onSubmit={handleSubmit}
                      onError={handleError}
                    />
                    {error && <div>{error}</div>}
                    {isLoading && <Spinner />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer
        className="p-4 bg-violet-800  shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 "
        style={{ borderWidth: '3px', borderColor: 'white' }}
      >
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
    </Authenticator>
  )
}
export default withAuthenticator(NewEvent)
