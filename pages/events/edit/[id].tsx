import React from "react"
import { useRouter } from "next/router"
import { withSSRContext } from "aws-amplify";
import { getEvent } from "../../../src/graphql/queries";
import { Event } from "../../../src/models";
import Image from 'next/image'
// import img1 from '../../public/IMG1.png' 
import {Storage } from 'aws-amplify';
import user1 from '../../../public/user1.png'

  import { 
    EventUpdateForm 
  } from '../../../src/ui-components';

import { useEffect, useState } from 'react';

interface IProps {
    event: Event
}

export async function getServerSideProps({ req, query }: any) {
    const SSR = withSSRContext({ req });
    const id = query.id as string
    try {
       const response = await SSR.API.graphql({ query: getEvent, variables: {id:id} });
      return {
        props: {
          event: response.data.getEvent,
        },
      };
    } catch (err) {
      console.log(err);
      return {
        props: {},
      };
    }
  }

export default function Id({event}:IProps) {
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

        return (
            
    <div className='mt-10 p-8 flex items-center justify-center'>
    
        <div className=" break-words bg-white  mt-16 ">
        <div className="">
            <div className="">
                <div className=" flex ">
                    <div className="">
                        <Image alt='' src={user1} className="shadow-xl rounded-full align-middle border-none -m-16 -ml-20 lg:-ml-16 max-w-[150px]"/>
                    </div>
                </div>
                
            <div className="p-8 mx-20">
                <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">Mike Thompson</h3>
                <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>Paris, France
                </div>
            </div>
            <div className=" flex mt-6 py-6 border-t border-slate-300 text-center">
            <div className=' overflow-hidden flex items-center justify-center'>
        {/* <div className='mt-8  grid-cols-4 p-10 '>
            <h1 className='text-2xl text-slate-700 font-bold leading-normal mt-4'>Crea un evento</h1>
            <EventCreateForm />
            </div> */}
            <div className='mt-8 mb-8 grid-cols-1 p-10'>
            <h1 className='text-2xl text-slate-700 font-bold leading-normal mb-1'>Actualiza un evento</h1>
    
            <EventUpdateForm event={event}/>
            Subir imagen 
              <input type="file" onChange={handleImageChange} />
              {image && <Image alt='' src={image} width={100} height={100}/>}
              Subir audio  
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
    )
}