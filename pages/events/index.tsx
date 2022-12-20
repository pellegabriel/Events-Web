import { Amplify, withSSRContext } from 'aws-amplify';
// import { ModelEventFilterInput } from '../../src/API';
import awsExports from '../../src/aws-exports';
import { listEvents } from '../../src/graphql/queries';

Amplify.configure({ ...awsExports, ssr: true });

export async function getServerSideProps({ req }: any) {
  const SSR = withSSRContext({ req });
  // const filter: ModelEventFilterInput = {
  //   and: [
  //       {startDate: {eq: '2022-12-05T12:14:00.000Z'}}
  //   ]
  // }
  try {
     const response = await SSR.API.graphql({ query: listEvents, variables: {} });
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

  return (
    <div className='w-6/6 bg-white flex items-center  rounded-lg p-6 '>
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
              </div>
          )})}
    </div>
  </div>
</div>

    </div>
  );
}