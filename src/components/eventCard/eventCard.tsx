import img1 from '../../../public/IMG1.png' 
import Image from 'next/image'

export default function EventCard () {
    return (
        <div
        className="flex-none w-2/3 md:w-1/3 mr-8 md:pb-4 border rounded-lg"
        >
            
        <div className="max-w-sm rounded-sm overflow-hidden shadow-lg m-3">
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <Image
         src={img1}
         alt='Picture' className="w-full"/>
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
        </div>
        <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
        </div>
        </div>
         </div>
        </div>



        //     <div className="h-8 bg-cover hover:bg-gray"></div>
        //     <div className="mx-6 my-4 border-b border-gray-light">
        //         <div className="font-medium text-base text-gray-darker mb-4">Item name goes here</div>
        //         <Image
        //     src={img1}
        //     alt='Picture'
        //     />
        //         <div className="font-normal text-gray-dark text-sm mb-2">
        //         Lorem ipsum dolor sit amet, consectetur
        //         </div>
        //         <div className="font-normal text-gray-dark text-sm mb-4">
        //         Lorem ipsum dolor sit amet, consectetur
        //         </div>
        //     </div>
        //     <div className="mx-6 my-4 flex">
        //         <div className="flex-grow">
        //         <span className="inline-block bg-red-light rounded-full p-1 pb-0 mr-2">
        //             <svg fill="white" width="16" height="16" viewBox="0 0 24 24"> 
        //             <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"></path>
        //             </svg>
        //         </span>
        //         <span className="inline-block bg-red-light rounded-full p-1 pb-0 mr-2">
        //             <svg fill="white" width="16" height="16" viewBox="0 0 24 24"> 
        //             <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"></path>
        //             </svg>
        //         </span>
        //         </div>
        //         <div className="flex-grow text-right">
                
        //         <span className="no-underline">
        //             <svg className="mx-2" fill="gray-dark" width="28" height="28" viewBox="0 0 24 24"> 
        //             <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"></path>
        //             </svg>
        //         </span>
        //         <span className="no-underline">
        //             <svg className="mx-2" fill="gray-dark" width="28" height="28" viewBox="0 0 24 24"> 
        //             <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"></path>
        //             </svg>
        //         </span>
        //         <span className="no-underline">
        //             <svg className="ml-2" fill="gray-dark" width="28" height="28" viewBox="0 0 24 24"> 
        //             <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"></path>
        //             </svg>
        //         </span>
        //         </div>
        //     </div>
        // </div>
        // </div>
    )
}