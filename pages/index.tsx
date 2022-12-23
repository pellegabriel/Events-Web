import Head from 'next/head'
import React from "react";
import Link from 'next/link'
import ScrollImg from '../src/components/scrollImg';
import { Amplify, withSSRContext } from 'aws-amplify';
import Image from 'next/image'
import admin from '../public/admin.png' 
import Map from './map/index';
import EventsSearch from '../src/components/filterEventSearch/filterEventSearch';
import Ilustration from './../src/components/Ilustracion/Ilustracion';
import { ModelEventFilterInput } from '../src/API';
import { listEvents } from '../src/graphql/queries';
import awsExports from '../src/aws-exports';
import { Event } from '../src/models';
import {  useRouter } from 'next/router';


Amplify.configure({ ...awsExports, ssr: true });

interface IHome {
  signOut: ()=> void
  scrollEvents: Array<Event>
  user: Record<string, any>
  renderedAt: string;
  events: Array<Event>
  filters: IFilters
}

export interface IFilters {
  startDate: string,
 types: string
 
}
// Interface IHome {
//   user: TUser
//   }
  
//   Type TUser = {
//   userName: string 
//   }
export async function getServerSideProps({ req, query }: any) {
  const SSR = withSSRContext({ req });
  const startDate = new Date(query.startDate);
  const types = query.types;
  const filterOptions = {
    ...(query.types && {types: {contains: types}}),
    ...(query.startDate && {startDate: {gt: startDate.toISOString()}}),
  }
    const today = new Date().toISOString(); 
    console.log(today)
   const filter: ModelEventFilterInput = {
     and: [
       {...filterOptions}
     ]
   }
   const dateFilter: ModelEventFilterInput = {
    and: [
      {startDate: {gt: today}}
    //   trae eventos apartir de ahora
    ]
  }

  try {
     const response = await SSR.API.graphql({ query: listEvents, variables: {filter: dateFilter}});
     const responseFilter = await SSR.API.graphql({ query: listEvents, variables: {filter: filter} });
    //  COPIAR ESTO 2 VECES Y 1 MODIFICAR PARA Q NO SE ME CAMBIE
    return {
      props: {
        scrollEvents: response.data.listEvents.items,
        events: responseFilter.data.listEvents.items,
        filters: filterOptions
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
  
}
function Home({events =[] ,scrollEvents=[],filters}: IHome) { 
  const router = useRouter();
  // Call this function whenever you want to
  // refresh props!
  const refreshData = ({startDate, types}: IFilters) => {
    router.push({pathname: '/', query: {startDate: startDate, types: types}});
  }

  const handleChange = (newFilters: IFilters) => {
    const prevFilters = router.query;
    refreshData(
      {
        ...(prevFilters as unknown as IFilters),
         ...newFilters
        })
  } 
  return (
    <div className='cursor-pointer'>
      <Head>
        <title>Weeout</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" font-mono bg-gray-200 h-full ">
        <main >
        <nav className="bg-gray-800 p-2 mt-0 fixed w-full z-10 top-0">
        <div className="container mx-auto flex flex-wrap items-center">
		    <div className="flex w-full md:w-1/2 justify-center md:justify-start text-white font-extrabold">
				<div className="text-white no-underline hover:text-white hover:no-underline">
					<div className="flex text-2xl pl-2">
            <div className="em em-grinning"></div> Bienvenido a 
            <div className='text-violet-500 mx-2'>Weeout</div> 
            <Image className="w-5 h-5 rounded-full mx-2 my-1" src={admin} alt="Rounded avatar"/>
          </div>
				</div>
            </div>
			<div className="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
				<ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
				  <li className="mr-3">
            <Link href='/aboutUs' className='inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4'>Mas sobre nosotros</Link>
				  </li>
          <li className="mr-3">
					<Link className="inline-block py-2 px-4 text-white no-underline hover:text-violet-500 hover:text-underline py-2 px-4" href='/post'>Comienza a disfrutar</Link>
				  </li>
				</ul>
			</div>
        </div>
     </nav>
          <section className="container mx-auto text-center py-6 mb-12">
            <div className="w-full mb-4">
              <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"></div>
            </div>
            <ScrollImg events={scrollEvents}/>
          </section>   
          <article className="grid gap-2">
      <main className="grid grid-cols-[1fr_minmax(0px,1280px)_1fr] gap-6 gap-y-8">
        <section className="grid grid-cols-12 col-start-2 gap-4 lg:gap-6 gap-y-8 content-start">
          <h1 className="col-span-10 text-3xl mt-12">Busca lo que necesites en la Lista de eventos disponibles: </h1>

          <div className="col-span-12 h-[13rem] lg:h-[31rem] w-full object-cover lg:col-span-5 lg:row-span-2">
          <EventsSearch events={events}  filters={filters} updateFilters={handleChange} />
          </div>
          <div className="text-xl col-span-12 lg:col-span-7"><Map events={events}/> </div>
          <div className="text-xs xl:text-sm col-span-12 sm:col-span-7 lg:col-span-4"><Ilustration/></div>               
        </section>
      </main>
    </article>
        </main>
        
      </div>
    </div>
  )
}

export default Home;