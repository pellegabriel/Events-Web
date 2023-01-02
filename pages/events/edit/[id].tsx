import { useRouter } from "next/router"
import { Event } from "../../../src/models";
import Image from 'next/image'
import {Storage, withSSRContext } from 'aws-amplify';
import user1 from '../../../public/user1.png'
import {Authenticator,Flex,useTheme,} from "@aws-amplify/ui-react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Link from 'next/link'
import { 
    EventUpdateForm 
  } from '../../../src/ui-components';
import React, { useEffect, useState } from "react"
import { getEvent } from "../../../src/graphql/queries";

interface IProps {
  event: Event
  signOut: ()=> void
  user: Record<string, any>
  renderedAt: string;

}

export async function getServerSideProps({ req, query }: any) {
    const SSR = withSSRContext({ req });
    const id = query.id as string
    const renderedAt = new Date();
    const formattedBuildDate = renderedAt.toLocaleDateString("en-US", {
      dateStyle: "long",
    });
    const formattedBuildTime = renderedAt.toLocaleTimeString("en-US", {
      timeStyle: "long",
    });
    try {
       const response = await SSR.API.graphql({ query: getEvent, variables: {id:id} });
      return {
        props: {
          event: response.data.getEvent,
          renderedAt: `${formattedBuildDate} at ${formattedBuildTime}`,
        },
      };
    } catch (err) {
      console.log(err);
      return {
        props: {},
      };
    }
  }



function Id({event, signOut, user, renderedAt}: IProps ) {
       const router = useRouter();
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
                  <Link href='/profile' className='inline-block  no-underline hover:text-gray-800 hover:text-underline py-2 px-4 text-white'>Volver a Usuario</Link>
                </li>
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
      <div className=" break-words bg-white  mt-16 border border-gray-300 w-6/6 rounded-lg p-8 ">        <div className="">
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
            <h1 className='text-2xl text-slate-700 font-bold leading-normal mb-1'>Actualiza el evento: </h1>

            <EventUpdateForm event={event}/>                
            Actualizar imagen 
              <input type="file" onChange={handleImageChange} />
              {image && <Image alt='' src={image} width={100} height={100}/>}
              Actualizar audio  
              <input type="file" onChange={handleAudioChange} />
              {audio && <audio controls><source src={audio} type="audio/*"/>
                </audio>}
              
          </div>
    
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
                <Link href='/aboutUs' className='mr-8  hover:text-gray-800 md:mr-6 text-1xl text-white'>Sobre nosotros
                            </Link>
                </li>

            </ul>
        </footer>
    </Authenticator>
    
  );
}
export default withAuthenticator(Id);
