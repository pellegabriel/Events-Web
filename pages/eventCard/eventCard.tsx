export default function eventCard () {
    return (
        <div className="max-w-sm rounded-sm overflow-hidden shadow-lg m-16">
  
            <div className="h-64 bg-cover hover:bg-gray"></div>
            <div className="mx-6 my-4 border-b border-gray-light">
                <div className="font-medium text-base text-gray-darker mb-4">Item name goes here</div>
                <div className="font-normal text-gray-dark text-sm mb-2">
                Lorem ipsum dolor sit amet, consectetur
                </div>
                <div className="font-normal text-gray-dark text-sm mb-4">
                Lorem ipsum dolor sit amet, consectetur
                </div>
            </div>
            <div className="mx-6 my-4 flex">
                <div className="flex-grow">
                <span className="inline-block bg-red-light rounded-full p-1 pb-0 mr-2">
                    <svg fill="white" width="16" height="16" viewBox="0 0 24 24"> 
                    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"></path>
                    </svg>
                </span>
                <span className="inline-block bg-red-light rounded-full p-1 pb-0 mr-2">
                    <svg fill="white" width="16" height="16" viewBox="0 0 24 24"> 
                    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"></path>
                    </svg>
                </span>
                </div>
                <div className="flex-grow text-right">
                
                <span className="no-underline">
                    <svg className="mx-2" fill="gray-dark" width="28" height="28" viewBox="0 0 24 24"> 
                    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"></path>
                    </svg>
                </span>
                <span className="no-underline">
                    <svg className="mx-2" fill="gray-dark" width="28" height="28" viewBox="0 0 24 24"> 
                    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"></path>
                    </svg>
                </span>
                <span className="no-underline">
                    <svg className="ml-2" fill="gray-dark" width="28" height="28" viewBox="0 0 24 24"> 
                    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"></path>
                    </svg>
                </span>
                </div>
            </div>
        </div>
    )
}