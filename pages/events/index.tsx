import { Amplify, withSSRContext } from 'aws-amplify';
import Head from 'next/head';
import { ModelEventFilterInput } from '../../src/API';
import awsExports from '../../src/aws-exports';
import { listEvents } from '../../src/graphql/queries';
import Link from 'next/link'

Amplify.configure({ ...awsExports, ssr: true });

export async function getServerSideProps({ req }: any) {
  const SSR = withSSRContext({ req });
  const filter: ModelEventFilterInput = {
    and: [
        {startDate: {eq: '2022-12-05T12:14:00.000Z'}}
    ]
  }
  try {
    const response = await SSR.API.graphql({ query: listEvents, variables: { filter: filter} });
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
    <div className=' bg-white flex items-center  mx-auto rounded-lg p-6 '>
      <div >
          <h1 >Lista de Eventos</h1>

          <div >
            <code >{events.length}</code>
            events
          </div>

          <div >
          {events.map((event: any) => {
            return (
                <div key={event.id}>
                <h3>{event.name}</h3>

              </div>
          )})}

          </div>

         </div>
    </div>
  );
}