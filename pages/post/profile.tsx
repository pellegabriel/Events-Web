import Image from 'next/image'
// import img1 from '../../public/IMG1.png' 
import user from '../../public/user.png'
import EventCreate from "../createEvents";
import EventUpdate from '../updateEvents/update';

    
export default function Profile () {
    return (
        <div>
<div className='h-screen flex justify-center '>

    <div className="  break-words bg-white h-screen mb-6 shadow-lg rounded-xl mt-16">
    <div className="">
        <div className="flex flex-wrap justify-center">
            <div className="w-full flex justify-center">
                <div className="relative">
                    <Image alt='' src={user} className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"/>
                </div>
            </div>
            <div className="w-full text-center mt-20">
                <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                    {/* <div className="p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">3,360</span>
                        <span className="text-sm text-slate-400">Photos</span>
                    </div>
                    <div className="p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">2,454</span>
                        <span className="text-sm text-slate-400">Followers</span>
                    </div>

                    <div className="p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">564</span>
                        <span className="text-sm text-slate-400">Following</span>
                    </div> */}
                </div>
            </div>
        </div>
        <div className="text-center mt-2">
            <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">Mike Thompson</h3>
            <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>Paris, France
            </div>
        </div>
        <div className="mt-6 py-6 border-t border-slate-200 text-center">
            <div className="flex flex-wrap justify-center">
                <div className="w-full px-4">
                    <span className="font-light leading-relaxed text-slate-600 mb-4">An artist of considerable range, Mike is the name taken by Melbourne-raised, Brooklyn-based Nick Murphy writes, performs and records all of his own music, giving it a warm.</span>
                </div>
            </div>
        </div>
        
    </div>

<EventCreate/>
<EventUpdate/>

</div>
</div>

</div>

    )
}