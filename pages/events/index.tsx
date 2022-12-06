import { Amplify, withSSRContext } from 'aws-amplify';
import Head from 'next/head';
import { ModelEventFilterInput } from '../../src/API';
import awsExports from '../../src/aws-exports';
import { listEvents } from '../../src/graphql/queries';

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
    <div className='bg-white'>
      <Head>
        <title>Lista d Eventos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
          <h1 >Lista d' Eventos</h1>

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
         </main>
    </div>
  );
}