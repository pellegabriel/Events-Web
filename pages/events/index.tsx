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
    <div className='bg-white flex items-center'>
      <Head>
        <title>WeeOut</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
          <h1 >Lista de Eventos</h1>

          <p >
            <code >{events.length}</code>
            events
          </p>

          <div >
          {events.map((event: any) => {
            return (
                <div key={event.id}>
                <h3>{event.name}</h3>

              </div>
          )})}

          </div>
          <Link href={'/createEvents'}>
          <div className='"group-hover:text-white group block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-violet-500 hover:ring-sky-500"'>
          <div className="flex items-center space-x-3">
          
            + New Event 
          
          </div>
          <p className="text-slate-500 group-hover:text-white text-sm">Create a new project from a variety of starting templates.</p>
          </div>
          </Link>
         </main>
    </div>
  );
}