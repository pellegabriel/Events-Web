import img1 from '../../../public/IMG1.png' 
import Image from 'next/image'
import { Event } from '../../models'

interface IProps {
    event: Event
}

export default function EventCard2 ({event}: IProps) {
    return (
<div className="container mx-auto p-6 grid grid-cols-2 gap-4 border-b border-gray-300 ">
  <div className="col-span-1 flex flex-col bg-white border-2 p-4 shadow-lg "key={event.id}>
                         <Image
                            src={img1}
                             alt='Picture' className="w-full"/>
    <h2 className=" mb-3 flex flex-wrap font-bold">
    {event.name}
    </h2>
    <p className="mb-3 flex flex-wrap font-bold">{event.types}</p>

    <div className=" mb-4 flex flex-wrap ">
        <div className="mr-2">{event.startDate}</div>
        <div className="mr-2">{event.endDate}</div>
    </div>
    <p className="text-md text-justify">{event.descripcion}</p>
    <div className="flex flex-wrap mt-auto pt-3 text-xs">
      <p className="mr-2 mb-2">{event.map_point}</p>
    </div>
    
  </div>
</div>
        // <div
        // className="flex-none w-2/3 md:w-1/3 mr-8 md:pb-4 border rounded-lg"
        // >
        //         <div className='border-b border-gray-300' key={event.id}>
        //         <div className="max-w-sm rounded-sm overflow-hidden shadow-lg m-3">
        //             <div className="max-w-sm rounded overflow-hidden shadow-lg">
        //                     <Image
        //                     src={img1}
        //                     alt='Picture' className="w-full"/>
        //                 <div className="px-6 py-4">
        //                     <div className="font-bold text-xl mb-2">{event.name}</div>
        //                     <div className="text-gray-700 text-base">
        //                     {event.descripcion}
        //                     </div>
        //                 </div>
        //                 <div className="px-6 pt-4 pb-2">
        //                     <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{event.map_point}</div>
        //                     <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{event.descripcion}</div>
        //                     <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</div>
        //                 </div>
        //             </div>
        //         </div> 
        //       </div>
        //       </div>
 
    )
}