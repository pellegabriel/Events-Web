import img1 from '../../public/IMG1.png' 
import Image from 'next/image'
import { Amplify, withSSRContext } from 'aws-amplify';
// import { ModelEventFilterInput } from '../../src/API';
import awsExports from '../../src/aws-exports';
import { getEvent } from '../../src/graphql/queries';
// import map from '../map';

Amplify.configure({ ...awsExports, ssr: true });
export async function getServerSideProps({ req }: any) {
    const SSR = withSSRContext({ req });
    // const filter: ModelEventFilterInput = {
    //   and: [
    //       {startDate: {eq: '2022-12-05T12:14:00.000Z'}}
    //   ]
    // }
    try {
      // const response = await SSR.API.graphql({ query: listEvents, variables: { filter: filter} });
      const response = await SSR.API.graphql({ query: getEvent});
      return {
        props: {
          events: response.data.getEvent.items,
        },
      };
    } catch (err) {
      console.log(err);
      return {
        props: {},
      };
    }
  }
  
export default function EventCard (event = []) {
    return (
        <div
        className="flex-none w-2/3 md:w-1/3 mr-8 md:pb-4 border rounded-lg"
        >
            {event.map((event: any) => {
            console.log(event);
            return (
                <div className="max-w-sm rounded-sm overflow-hidden shadow-lg m-3" key={event.id}>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <Image
         src={img1}
         alt='Picture' className="w-full"/>
        <div className="px-6 py-4">
            <h1 className="font-bold text-xl mb-2">{event.name}</h1>
            <h3 className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
            </h3>
        </div>
        <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{event.types}</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{event.user}</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{event.map_point}</span>
        </div>
        </div>
         </div>
          )})}
        </div>
        
    )
}        
