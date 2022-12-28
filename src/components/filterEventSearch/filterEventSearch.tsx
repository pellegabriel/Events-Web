import { Amplify} from 'aws-amplify';
import awsExports from '../../aws-exports';
import { FocusEvent } from 'react';
import { Event } from '../../models';
import { IFilters } from '../../../pages';
import EventCard2 from "../eventCard2/eventCard2"


Amplify.configure({ ...awsExports, ssr: true });
interface IProps {
    events: Array<Event>,    
    filters: IFilters,
    updateFilters: (newValue: Partial <IFilters> ) => void
    event: Event
}

export default function EventsSearch({ events = [], updateFilters }:IProps) {  
    const handleChange = (value: string, name: string ) => {
      updateFilters({[name]:value}) 
    }
  
    return (
      
      <div className=' w-6/6 bg-gray rounded-lg p-6 '>
      {/* <div className='flex flex-col p-8'> */}
      <div className="flex flex-col py-6 p-8">
        <h2 className="font-medium text-sm text-stone-600">Fecha inicio: </h2>
          <input  type="date" placeholder='Fecha' onBlur={(e: FocusEvent<HTMLInputElement>) => {handleChange(e.target.value, 'startDate')}}/>
        </div>
        <div className="flex flex-col p-8">
        <h2 className="font-medium text-sm text-stone-600">Tipo de evento:</h2>
         <input  type="text" placeholder='tipo' onBlur={(e: FocusEvent<HTMLInputElement>) => {handleChange(e.target.value, 'types')}}/>
        </div>
                <div className="flex justify-center">
          <div className="">
            <div className="text-gray-900 text-xl font-medium mb-2 border-b border-gray-300">
              Lista de Eventos
            </div>
            <div className="p-1">
              <h5 className="py-1 px-6 ">Cantidad de eventos disponibles: </h5>
              <div className="flex px-6  text-gray-700 text-base mb-4">
                <code >{events.length}</code>
                events
              </div>
            </div>
            <div className="grid grid-cols-3">
              {events.map((event: any) => {
                return (
                  <EventCard2 event={event} key={event.id} />
                      )})}
            </div>
          </div>
        </div>
        {/* </div> */}

      </div>
    );
  }