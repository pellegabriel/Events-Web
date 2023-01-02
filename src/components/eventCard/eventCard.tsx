import Image from 'next/image'
import { Event } from '../../models'
import { useEffect, useState } from 'react'
import { Storage } from 'aws-amplify';
import img1 from '../../../public/IMG1.png' 
import parseDate from '../../helperFunctions/parseDate';


interface IProps {
    event: Event
}




export default function EventCard ({event}: IProps | any) {
    const [image, setImage] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const [audio, setAudio] = useState<string>()
    
    const getUploadedImage = async () => {
        const file = await Storage.get(event.id, {
            level: "public"
        });
        setImage(file)
    }
    useEffect(() => {
        getUploadedImage()
    }, [])

    const handleImageError = () => {
        setError(true)
    }

    const getUploadedAudio = async () => {
        const file = await Storage.get(event.id, {
            level: "public"
        });
        setAudio(file)
    }
    useEffect(() => {
        getUploadedAudio()
    }, [])

    const startDate = event.startDate ? parseDate(event.startDate) : ""
    const endDate = event.endDate ? parseDate(event.endDate) : ""

    return ( 
        <div className="max-w-5xl bg-white w-screen border rounded-lg">
            <div className='border-b border-gray-300'  key={event.id}>
                <div className=" rounded-sm overflow-hidden shadow-lg m-3">
                    <div className=" rounded overflow-hidden shadow-lg">
                    {error ? <Image alt='' src={img1} width={400} height={200}/> : <Image alt='' src={image} width={400} height={200} onError={handleImageError}/>}
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2"> {event.name}</div>
                            <div className="text-gray-700 text-base">
                            {event.description}
                            </div>
                            <audio controls><source src={audio} type="audio/*"/>
                            </audio>
                            <div className="text-gray-700 text-base">
                            {startDate} <br />
                            {endDate}
                            </div>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{event.types}</span>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{event.map_point}</span>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    )
}        