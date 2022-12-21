import MyComponent from '../../../pages/map/index';
import Events from '../../../pages/events';
import Ilustration from '../Ilustracion/Ilustracion';
export default function MainEvent () {
    return(  
      <article className="grid gap-2">
      <main className="grid grid-cols-[1fr_minmax(0px,1280px)_1fr] gap-6 gap-y-8">
        <section className="grid grid-cols-12 col-start-2 gap-4 lg:gap-6 gap-y-8 content-start">
          <h1 className="col-span-10 text-3xl mt-12">Busca lo que necesites en la Lista de eventos disponibles: </h1>

          <div className="col-span-12 h-[13rem] lg:h-[31rem] w-full object-cover lg:col-span-5 lg:row-span-2">
          <Events/>
          </div>
          <p className="text-xl col-span-12 lg:col-span-7"><MyComponent/> </p>
          <p className="text-xs xl:text-sm col-span-12 sm:col-span-7 lg:col-span-4"><Ilustration/></p>               
        </section>
      </main>
    </article>
    //     <section className="bg-white border-b py-8 grid gap-6">
    //   <div className="rid grid-cols-[1fr_minmax(0px,1280px)_1fr] gap-6 gap-y-8 ">
    //     <div className="grid grid-cols-12 col-start-2 gap-4 lg:gap-6 gap-y-8 content-start">
    //       <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
    //     </div>
    //     <div className="flex flex-wrap">
    //       <div className="col-span-12 h-[13rem] lg:h-[31rem] w-full object-cover lg:col-span-5 lg:row-span-2">
    //         <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
    //         Busca un evento
    //         </h3>
    //         <div className="text-gray-600 mb-8">
    //         
            
    //           <br />
    //           <br />
    //         </div>
    //       </div>
    //       <div className="col-span-12 lg:col-span-7">
    //         
    //       </div>
    //     </div>
    //     <div className="text-xs xl:text-sm col-span-12 sm:col-span-7 lg:col-span-4">
    //       <div className="w-full sm:w-1/2 p-6 mt-6">
    //         <div className="align-middle">
    //           <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
    //           Localizalo 
    //           </h3>
    //           <div className=' '>
    //                        
    //               </div>    
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    )
}