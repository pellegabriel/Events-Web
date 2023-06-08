import { useState, useEffect } from 'react'
import { supabase } from '../../src/supabaseClient'

export default function Account({ session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    async function getProfile() {
      setLoading(true)
      const { user } = session

      let { data, error } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error) {
        console.warn(error)
      } else if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }

      setLoading(false)
    }

    getProfile()
  }, [session])

  async function updateProfile(event: any) {
    event.preventDefault()

    setLoading(true)
    const { user } = session

    const updates = {
      id: user.id,
      username,
      website,
      avatar_url,
      updated_at: new Date(),
    }

    let { error } = await supabase.from('profiles').upsert(updates)

    if (error) {
      alert(error.message)
    }
    setLoading(false)
  }

  return (
    <form onSubmit={updateProfile} className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          required
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="url"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <button className="button block primary" type="submit" disabled={loading}>
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="button block" type="button" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </form>
  )
}
// import {
//   Authenticator,
//   Flex,
//   useAuthenticator,
//   useTheme,
// } from '@aws-amplify/ui-react'
// import { withAuthenticator } from '@aws-amplify/ui-react'
// import Link from 'next/link'
// import React, { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'
// import { Event, EventTypes } from '../../src/models'
// import Image from 'next/image'
// import { Amplify, withSSRContext } from 'aws-amplify'
// import { ModelEventFilterInput } from '../../src/API'
// import { listEvents, listEventTypes } from '../../src/graphql/queries'
// import awsExports from '../../src/aws-exports'
// import EventsUser from '../../src/components/filterUser/filterUser'
// import EventCreateForm from '../../src/components/eventCreateFormEdited/EventCreateForm'
// import { EventCreateFormInputValues } from '../../src/components/eventCreateFormEdited/EventCreateForm'
// import { Spinner } from '@theme-ui/components'
// import svg3 from '../../public/svg3.svg'

// Amplify.configure({ ...awsExports, ssr: true })

// interface IProps {
//   signOut: () => void
//   user: Record<string, any>
//   renderedAt: string
//   events: Array<Event>
//   filters: Partial<IFilters>
//   eventOptions: Array<EventTypes>
// }
// export interface IFilters {
//   startDate?: string
//   types?: string
//   userId?: string
// } //oasar esto a clientSideRendering

// export async function getServerSideProps({ req, query }: any) {
//   const SSR = withSSRContext({ req })
//   const renderedAt = new Date()
//   const startDate = new Date(query.startDate)
//   const formattedBuildDate = renderedAt.toLocaleDateString('en-US', {
//     dateStyle: 'long',
//   })
//   const formattedBuildTime = renderedAt.toLocaleTimeString('en-US', {
//     timeStyle: 'long',
//   })
//   const types = query.types
//   const userId = query.userId
//   const filterOptions = {
//     ...(query.types && { types: { contains: types } }),
//     ...(query.startDate && { startDate: { gt: startDate.toISOString() } }),
//     ...(query.userId && { user: { eq: userId } }),
//   }
//   const filter: ModelEventFilterInput = {
//     and: [{ ...filterOptions }],
//   }
//   try {
//     const response = await SSR.API.graphql({
//       query: listEvents,
//       variables: { filter: filter },
//     })
//     const eventTypeOptions = await SSR.API.graphql({
//       query: listEventTypes,
//     })
//     return {
//       props: {
//         events: response.data.listEvents.items,
//         eventOptions: eventTypeOptions.data.listEventTypes.items,
//         filters: filterOptions,
//       },
//     }
//   } catch (err) {
//     console.log(err)
//     return {
//       props: { renderedAt: `${formattedBuildDate} at ${formattedBuildTime}` },
//     }
//   }
// }

// function Profile({ events = [], signOut, filters, eventOptions }: IProps) {
//   const router = useRouter()
//   const id = router.query.id as string
//   const [error, setError] = useState<string>()
//   const [isLoading, setLoading] = useState<boolean>(false)
//   // const SSR = withSSRContext({ req })

//   const { user } = useAuthenticator((context) => [context.user])

//   const refreshData = ({ userId, startDate, types }: IFilters) => {
//     router.push({
//       pathname: '/profile',
//       query: { startDate: startDate, types: types, userId: userId },
//     })
//   }

//   useEffect(() => {
//     refreshData({ userId: user.username })
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   const authComponents = {
//     Header() {
//       const { tokens } = useTheme()
//       return (
//         <Flex
//           justifyContent={'center'}
//           direction="column"
//           paddingTop={tokens.space.xxxl}
//           paddingBottom={tokens.space.xxl}
//         ></Flex>
//       )
//     },
//   }

//   const handleSuccess = (newEvent: Event) => {
//     console.log('ASDASD', { newEvent })
//     router.push({
//       pathname: `/events/edit/${newEvent.id}`,
//       query: { eventTitle: newEvent.name },
//     })
//   }
//   const handleError = (_event: EventCreateFormInputValues, message: string) => {
//     setError(message)
//     setLoading(false)
//   }
//   const handleSubmit = (event: EventCreateFormInputValues) => {
//     setLoading(true)
//     console.log(event)
//     return {
//       ...event,
//       ...{
//         user: user.username,
//       },
//     }
//   }
  
//   const handleChange = (newFilters: IFilters) => {
//     const prevFilters = router.query
//     refreshData({
//       ...(prevFilters as unknown as IFilters),
//       ...newFilters,
//     })
//   }
//   console.log('eventoptions vale', eventOptions)
  
//   return (
//     <Authenticator components={authComponents} hideSignUp={true}>
//       <div
//         style={{
//           background: 'black',
//         }}
//       >
//         <nav className=" p-2 mt-0 w-full z-10 top-0 mb-12 border-b border-gray-300">
//           <div className="container mx-auto flex flex-wrap items-center">
//             <div className="flex w-full md:w-1/2 justify-center md:justify-start text-white ">
//               <div className="flex text-2xl pl-2">
//                 <div className="em em-grinning"></div>
//                 <div className="text-5xl " style={{ color: 'white' }}>
//                   WeeOut
//                 </div>
//               </div>
//             </div>
//             <div className="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
//               <ul className="list-reset flex justify-between flex-1 md:flex-none items-center pb-2">
//                 <li className="mr-3">
//                   <Link
//                     href="/"
//                     className=" hover:bg-rose-500  text-white    py-2 px-4 border border-transparent hover:text-white  flex items-center justify-center"
//                   >
//                     Pagina principal
//                   </Link>
//                 </li>
//                 <li className="mr-3">
//                   <Link
//                     href="/"
//                     className=" hover:bg-rose-500  text-white    py-2 px-4 border border-transparent hover:text-white  flex items-center justify-center"
//                     onClick={signOut}
//                   >
//                     Cerrar sesion
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </nav>
//         <div className="h-full p-8 flex items-center justify-center">
//           <div className=" break-words  ">
//             <div className="">
//               <div>
//                 <div className="flex row">
//                   <Image alt="" src={svg3} width={500} height={500} />
//                   <div style={{ paddingTop: '100px' }}>
//                     <h3
//                       className="mt-10  text-2xl  leading-normal mb-2"
//                       style={{ color: 'white' }}
//                     >
//                       Hola {user.username} Bienvenido!
//                     </h3>
//                     <h1 className=" text-l text-white  leading-normal mb-10">
//                       Ahora que estas aqui, podras crear tus propios eventos{' '}
//                       <br /> Comienza eligiendo un nombre que te guste:{' '}
//                     </h1>
//                     <div
//                       className="bg-slate-200"
//                       style={{
//                         borderWidth: '3px',
//                         borderColor: 'gray',
//                         padding: '8px',
//                         marginBottom: '100px',
//                         borderRadius: '10px',
//                       }}
//                     >
//                       <EventCreateForm
//                         onSuccess={handleSuccess}
//                         onSubmit={handleSubmit}
//                         onError={handleError}
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="justiify-center flex flex-col items-center">
//                   {error && <div>{error}</div>}
//                   {isLoading && <Spinner />}
//                   <h1 className=" mt-0 mb-2 text-l text-white leading-normal">
//                     No olvides que darle a Subir Evento te llevara a la
//                     siguiente fase.
                    
       
//                   </h1>
//                   <div className='  flex justify-center mt-2  border-t border-slate-500'>
//                     <h1 className='  mb-0 text-l text-white leading-normal'>
//                     Para editar un evento solo buscalo con los filtros mas abajo
//                     y seleccionalo para ir a la pantalla de edicion.
//                     </h1>
//                     </div>
//                 </div>

//                 <div className="p-8  flex justify-center mt-6 py-6  ">
//                   <div className=" overflow-hidden flex ">
//                     <div className="mt-8  grid-cols-1  ">
//                       <main className="grid gap-6 gap-y-8  ">
//                         <section className="grid grid-cols-3 col-start-2 gap-4 lg:gap-6 gap-y-8 content-start">
//                           <div className="col-span-12  object-cover lg:row-span-2 rounded-lg">
//                             <EventsUser
//                               events={events}
//                               filters={filters}
//                               updateFilters={handleChange}
//                               eventTypesOptions={eventOptions}
//                             />
//                           </div>
//                         </section>
//                       </main>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <section className="grid grid-cols-3 col-start-2 gap-4 lg:gap-6 gap-y-8 content-start"></section>
//         <footer
//           className="p-4   shadow md:flex md:items-center md:justify-between md:p-6"
//           style={{ borderTopWidth: '1px', borderColor: 'white' }}
//         >
//           <span className="text-sm text-white sm:text-center dark:text-gray-400">
//             © 2022. All Rights Reserved.
//           </span>
//           <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
//             <li>
//               <Link
//                 href="/aboutUs"
//                 className=" hover:bg-rose-500  text-white    py-2 px-4 border border-transparent hover:text-white  flex items-center justify-center"
//               >
//                 Sobre nosotros
//               </Link>
//             </li>
//           </ul>
//         </footer>
//       </div>
//     </Authenticator>
//   )
// }
// export default withAuthenticator(Profile)
