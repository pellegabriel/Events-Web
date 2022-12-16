import { 
    EventUpdateForm
  } from '../../src/ui-components';
  
  export default function EventUpdate () {

    return (
      <section
     className="
     bg-white
     pt-20
     lg:pt-[120px]
     pb-12
     lg:pb-[90px]
     relative
     z-20
     overflow-hidden
     "
     >
     <div className="container">
      <div className="flex flex-wrap justify-center -mx-4">
           <div className="w-full md:w-1/2 lg:w-1/3 px-4">
              <div
                 className="
                 bg-white
                 rounded-xl
                 relative
                 z-10
                 overflow-hidden
                 border border-primary border-opacity-20
                 shadow-pricing
                 py-10
                 px-8
                 sm:p-12
                 lg:py-10 lg:px-6
                 xl:p-12
                 mb-10
                 "
                 >
        <div >
        <EventUpdateForm/>
          
        </div>
      </div>
      </div>
      </div>
      </div>
      </section>
    )
  }
  
