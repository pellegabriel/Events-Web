import {Authenticator,Flex,useAuthenticator,useTheme,} from "@aws-amplify/ui-react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Link from 'next/link'
import React, { useEffect } from "react"
import { useRouter } from "next/router"
import { Event } from "../../src/models";
import Image from 'next/image'
import {Amplify, withSSRContext } from 'aws-amplify';
import user1 from '../../public/user1.png'
import { ModelEventFilterInput } from "../../src/API";
import { listEvents } from "../../src/graphql/queries";
import awsExports from "../../src/aws-exports";
import EventsUser from "../../src/components/filterUser/filterUser";

Amplify.configure({ ...awsExports, ssr: true });


interface IProps {
  event: Event
  signOut: ()=> void
  user: Record<string, any>
  renderedAt: string;
  events: Array<Event>
  filters: Partial<IFilters>

}
export interface IFilters {
  startDate?: string,
 types?: string,
 userId?: string
 
}
export async function getServerSideProps({ req, query }: any) {
   const SSR = withSSRContext({ req });
  const renderedAt = new Date();
   const startDate = new Date(query.startDate);
     const formattedBuildDate = renderedAt.toLocaleDateString("en-US", {
    dateStyle: "long",
  });
  const formattedBuildTime = renderedAt.toLocaleTimeString("en-US", {
    timeStyle: "long",
  });
  const types = query.types;
  const userId = query.userId;
  const filterOptions = {
    ...(query.types && {types: {contains: types}}),
    ...(query.startDate && {startDate: {gt: startDate.toISOString()}}),
    ...(query.userId && {user: {eq: userId}}),
  }
     const filter: ModelEventFilterInput = {
     and: [
       {...filterOptions}
     ]
   }
  try {
     const response = await SSR.API.graphql({ query: listEvents, variables: {filter: filter} });
    return {
      props: {
        events: response.data.listEvents.items,
        filters: filterOptions
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {      renderedAt: `${formattedBuildDate} at ${formattedBuildTime}`,
},
    };
  }
}


function Profile({events =[], signOut, renderedAt, filters}: IProps ) {
       const router = useRouter();
       const { user } = useAuthenticator((context) => [context.user]);
       const refreshData = ({userId, startDate, types}: IFilters) => {
        router.push({pathname: '/profile', query: {startDate: startDate, types: types, userId: userId}});
      }
          useEffect(() => {
            refreshData({userId: user.attributes?.email})
          }, [])

    const authComponents = {
      Header() {
        const { tokens } = useTheme();
        return (
          <Flex
            justifyContent={"center"}
            direction="column"
            paddingTop={tokens.space.xxxl}
            paddingBottom={tokens.space.xxl}
          >
            
          </Flex>
        );
      },
    };
    const handleChange = (newFilters: IFilters) => {
      const prevFilters = router.query;
      refreshData(
        {
          ...(prevFilters as unknown as IFilters),
           ...newFilters
          })
    } 
  return (
    <Authenticator components={authComponents} hideSignUp={true}>
    <nav className="bg-violet-800 p-2 mt-0 fixed w-full z-10 top-0 ">
          <div className="container mx-auto flex flex-wrap items-center">
		        <div className="flex w-full md:w-1/2 justify-center md:justify-start text-white font-extrabold">
				      <div className="text-white no-underline hover:text-white hover:no-underline">
					      <div className="flex text-2xl pl-2">
                  <div className="em em-grinning"></div>
                  Bienvenido a 
                  <div className='text-violet-500 mx-2'>Weeout</div> 
                </div>
				      </div>
            </div>
			      <div className="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
				      <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
                <li className="mr-3">
                  <Link href='/' className='inline-block  no-underline hover:text-gray-800 hover:text-underline py-2 px-4 text-white'>Pagina principal</Link>
                </li>
                <li className="mr-3">
                <Link href='/' className='inline-block  no-underline hover:text-gray-800 hover:text-underline py-2 px-4 text-white'onClick={signOut}>Cerrar sesion</Link>
                </li>
			      	</ul>
			      </div>
          </div>
        </nav>
        <div className='h-full p-8 flex items-center justify-center bg-gradient-to-t from-gray-800 to-violet-700'>

      <div className=" break-words bg-white  mt-16 border border-gray-300 w-6/6 rounded-lg p-8 ">
        <div className="">
                    <div className="">
                      <div className=" flex ">
                          <div className="mt-20">
                              <Image alt='' src={user1} className="shadow-xl rounded-full align-middle border-none -m-16 -ml-20 lg:-ml-16 max-w-[150px]"/>
                          </div>
                      </div>
                      <div className="p-8 mx-20">
                          <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">Hola {user.username}</h3>
                          <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                          <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>Inicio de sesión: {renderedAt}
                      </div>
                      </div>
                      <div className="p-8  flex justify-center mt-6 py-6 border-t border-slate-300 text-center">
                          <div className=' overflow-hidden flex items-center justify-center'>
                          <div className='mt-8 mb-8 grid-cols-1 p-10'>
            <h1 className='text-2xl text-slate-700 font-bold leading-normal mb-1'>Crea tu propio evento: </h1>
              
                </div>
                            {/* <Link href='/post/eventUserAdm' className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent roundeds'>
                                Administra eventos, crea o actualizalos
                            </Link> */}
                            {/* <Link href='/' className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent roundeds'onClick={signOut}>Sign out
                            </Link> */}
                          </div>
                      </div>
                  </div>   
              </div>
          </div>

      </div>
      <section className="grid grid-cols-3 col-start-2 gap-4 lg:gap-6 gap-y-8 content-start">
              

              <div className="col-span-12  object-cover lg:row-span-2 bg-gradient-to-t from-gray-900 to-violet-600 border rounded-lg text-white">
              <EventsUser events={events}  filters={filters} updateFilters={handleChange} />
              </div>
            </section>   
          <footer className="p-4 bg-violet-800  shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
            <span className="text-sm text-white sm:text-center dark:text-gray-400">© 2022. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">

                <li>
                <Link href='/aboutUs' className='mr-8  hover:text-gray-800 md:mr-6 text-1xl text-white'>Sobre nosotros
                            </Link>
                </li>

            </ul>
        </footer>
    </Authenticator>
    
  );
}
export default withAuthenticator(Profile);