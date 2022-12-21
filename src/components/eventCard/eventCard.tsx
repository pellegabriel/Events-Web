import img1 from '../../../public/IMG1.png' 
import Image from 'next/image'

export default function EventCard (events = []) {
    return (
        <div
        className="flex-none w-2/3 md:w-1/3 mr-8 md:pb-4 border rounded-lg"
        >
           {events.map((event: any) => {
            return (
                <div className='border-b border-gray-300' key={event.id}>
                <div className="max-w-sm rounded-sm overflow-hidden shadow-lg m-3">
                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                            <Image
                            src={img1}
                            alt='Picture' className="w-full"/>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{event.name}</div>
                            <p className="text-gray-700 text-base">
                            {event.description}
                            </p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{event.mappoint}</span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                        </div>
                    </div>
                </div> 
              </div>
              
          )})}
      </div>
    )
}