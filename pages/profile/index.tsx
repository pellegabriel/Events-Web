import {Authenticator,Flex,useTheme,} from "@aws-amplify/ui-react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Link from 'next/link'
import { EventCreateForm } from "../../src/ui-components";
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Event } from "../../src/models";
import Image from 'next/image'
import {Storage } from 'aws-amplify';
import user1 from '../../public/user1.png'
import EventsSearch from "../../src/components/filterEventSearch/filterEventSearch";

interface IProps {
  event: Event
  signOut: ()=> void
  user: Record<string, any>
  renderedAt: string;
  events: Array<Event>
  filters: IFilters

}
export interface IFilters {
  startDate: string,
 types: string
 
}
export function getServerSideProps() {
  const renderedAt = new Date();
  const formattedBuildDate = renderedAt.toLocaleDateString("en-US", {
    dateStyle: "long",
  });
  const formattedBuildTime = renderedAt.toLocaleTimeString("en-US", {
    timeStyle: "long",
  });
  return {
    props: {
      renderedAt: `${formattedBuildDate} at ${formattedBuildTime}`,
    },
  };
}


function Profile({events =[], signOut, user, renderedAt, filters}: IProps ) {
       const router = useRouter();
       const refreshData = ({startDate, types}: IFilters) => {
        router.push({pathname: '/profile', query: {startDate: startDate, types: types}});
      }
    const id = router.query.id as string

 const handleAudioChange = async (e: { target: { files: any[]; }; }) => {
      const file = e.target.files[0];
      try {
          console.log({file})
          Storage.put(`audio/${id}`, file);
      } catch (error) {
          console.log("Error uploading file: ", error);
      }
        }

    const handleImageChange = async (e: { target: { files: any[]; }; }) => {
        const file = e.target.files[0];
        try {
            console.log({file})
            Storage.put(id, file);
        } catch (error) {
            console.log("Error uploading file: ", error);
        }
          }
          const [audio, setAudio] = useState<string>()
          const getUploadedAudio = async () => {
              const file = await Storage.get(`audio/${id}`, {
                  level: "public"
              });
              console.log({file})
              setAudio(file)
          }
          useEffect(() => {
              getUploadedAudio()
          }, [])

          const [image, setImage] = useState<string>()
          const getUploadedImage = async () => {
              const file = await Storage.get(id, {
                  level: "public"
              });
              console.log({file})
              setImage(file)
          }
          useEffect(() => {
              getUploadedImage()
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
    <div className='h-full p-8 flex items-center justify-center bg-gradient-to-t from-gray-800 to-violet-700'>
      <div className=" break-words bg-white  mt-16 ">
        <div className="">
                    <div className="">
                      <div className=" flex ">
                          <div className="">
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

                      <EventCreateForm/>
                      Subir imagen 
              <input type="file" onChange={handleImageChange} />
              {image && <Image alt='' src={image} width={100} height={100}/>}
            Subir audio  
              <input type="file" onChange={handleAudioChange} />
              {audio && <audio controls><source src={audio} type="audio/*"/>
                </audio>}
              
          <EventsSearch events={events}  filters={filters} updateFilters={handleChange} />
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

          <footer className="p-4 bg-violet-800  shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
            <span className="text-sm text-white sm:text-center dark:text-gray-400">© 2022. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                <Link href='/' className='mr-8  hover:text-gray-800 md:mr-6 text-1xl text-white'>Pagina principal
                            </Link>
                </li>
                <li>
                <Link href='/' className='mr-8  hover:text-gray-800 md:mr-6 text-1xl text-white'onClick={signOut}>Cerrar sesion
                            </Link>                
                </li>
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