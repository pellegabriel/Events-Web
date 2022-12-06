import { Amplify, withSSRContext } from 'aws-amplify';
import Head from 'next/head';
// import { ModelEventFilterInput } from '../../src/API';
import awsExports from '../../src/aws-exports';
import { listEvents } from '../../src/graphql/queries';
import Link from 'next/link'
// import { 
//   EventCreateForm 
// } from '../../src/ui-components';


Amplify.configure({ ...awsExports, ssr: true });

export async function getServerSideProps({ req }: any) {
  const SSR = withSSRContext({ req });
  // const filter: ModelEventFilterInput = {
  //   and: [
  //       {startDate: {eq: '2022-12-05T12:14:00.000Z'}}
  //   ]
  // }
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
    <div className='flex items-center'>
      <Head>
        <title>Lista d Eventos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex ">
          <div className="p-8">
            <h1 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Lista d' Eventos</h1>

            <p className="block mt-1 text-lg leading-tight font-medium text-black ">
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
              <Link  className='hover:underline' href='createEvents'>
              Create New Event
              </Link>
          </div>  
        </div>
      </main>
    </div>
  );
}