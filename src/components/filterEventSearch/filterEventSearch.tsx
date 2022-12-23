import { Amplify} from 'aws-amplify';
import awsExports from '../../aws-exports';
import { FocusEvent } from 'react';
import { Event } from '../../models';
import { IFilters } from '../../../pages';

Amplify.configure({ ...awsExports, ssr: true });
interface IProps {
    events: Array<Event>,    
    filters: IFilters,
    updateFilters: (newValue: Partial <IFilters> ) => void
}

export default function EventsSearch({ events = [], updateFilters }:IProps) {  
    const handleChange = (value: string, name: string ) => {
      updateFilters({[name]:value}) 
    }
  
    return (
      
      <div className='w-6/6 bg-white flex items-center  rounded-lg p-6 '>
        <div>
          Fecha inicio: <input type="date" placeholder='Fecha' onBlur={(e: FocusEvent<HTMLInputElement>) => {handleChange(e.target.value, 'startDate')}}/>
        </div>
        <div>
         tipo de evento: <input type="text" placeholder='tipo' onBlur={(e: FocusEvent<HTMLInputElement>) => {handleChange(e.target.value, 'types')}}/>
        </div>
        <div className="flex justify-center">
          <div className="block rounded-lg shadow-lg bg-white max-w-sm text-center">
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
            <div className="py-3 px-6 ">
              {events.map((event: any) => {
                return (
                    <div className='border-b border-gray-300' key={event.id}>
                      <h3>{event.name}</h3> 
                      <h3>{event.startDate}</h3> 
                      <h3>{event.types}</h3>     
                    </div>      
                      )})}
            </div>
          </div>
        </div>
      </div>
    );
  }