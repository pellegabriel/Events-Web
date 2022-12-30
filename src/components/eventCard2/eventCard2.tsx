import Image from 'next/image'
import { Event } from '../../models'
import { useEffect, useState } from 'react'
import { Storage } from 'aws-amplify';
import img1 from '../../../public/IMG1.png' 


interface IProps {
    event: Event
}




export default function EventCard2 ({event}: IProps | any) {
    const [image, setImage] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

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

    return (
        <div key={event.id} className="bg-white flex-none w-2/3 md:w-1/3 mr-8 md:pb-4 mr-2  mb-4 border rounded-lg">
                <div className="max-w-sm rounded-sm overflow-hidden m-3">
                    <div className="max-w-sm rounded overflow-hidden">
                        {error ? <Image alt='' src={img1} width={400} height={200}/> : <Image alt='' src={image} width={400} height={200} onError={handleImageError}/>}
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2"> {event.name}</div>
                            <div className="text-gray-700 text-base">
                            {event.descripcion}
                        </div>
                        <div className="text-gray-700 text-base">
                            {event.startDate} <br />
                            {event.endDate}
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
    )
}        