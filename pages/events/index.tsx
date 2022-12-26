import { Amplify, withSSRContext } from 'aws-amplify';
import { ModelEventFilterInput } from '../../src/API';
import awsExports from '../../src/aws-exports';
import { listEvents } from '../../src/graphql/queries';
import { NextRouter, useRouter } from 'next/router';
import { FocusEvent } from 'react';

Amplify.configure({ ...awsExports, ssr: true });

interface IFilters {
  startDate: string,
  types: string
}

export async function getServerSideProps({ req, query }: any) {
  const SSR = withSSRContext({ req });
  const startDate = new Date(query.startDate);
  const types = query.types;
  const filterOptions = {
    ...(query.types && {types: {contains: types}}),
    ...(query.startDate && {startDate: {gt: startDate.toISOString()}}),
  }

   const filter: ModelEventFilterInput = {
     and: [
       {...filterOptions}
     ]
   }
  try {
     const response = await SSR.API.graphql({ query: listEvents, variables: {filter: filter} });
    //  COPIAR ESTO 2 VECES Y 1 MODIFICAR PARA Q NO SE ME CAMBIE
    return {
      props: {
        events: response.data.listEvents.items,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
}


export default function Events({ events = [] }) {
  const router = useRouter();
  // Call this function whenever you want to
  // refresh props!
  const refreshData = ({startDate, types}: IFilters) => {
    router.push({pathname: 'events', query: {startDate: startDate, types: types}});
  }

  const handleChange = (value: string, name: string, router: NextRouter ) => {
    const prevFilters = router.query;
    refreshData(
      {
        ...(prevFilters as unknown as IFilters),
         [name]: value
        })
  }

  // const handleChangeTypes = (e: FocusEvent ) => {
  //   refreshData({types: e.target.value, startDate})
  // }

  return (
    
    <div className='w-6/6 bg-white flex items-center  rounded-lg p-6 '>
      {/* <EventCard events={events}/> */}
      <div>
        Fecha inicio: <input type="date" placeholder='Fecha' onBlur={(e: FocusEvent<HTMLInputElement>) => {handleChange(e.target.value, 'startDate', router)}}/>
      </div>
      <div>
       tipo de evento: <input type="text" placeholder='tipo' onBlur={(e: FocusEvent<HTMLInputElement>) => {handleChange(e.target.value, 'types', router)}}/>
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