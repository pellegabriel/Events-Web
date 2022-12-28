import EventCard from "../eventCard/eventCard"
import { Event } from '../../models'

interface IProps {
  events: Array<Event>
}

const fakeEvent = {
  createdAt
: 
"2022-12-24T17:27:15.014Z",
'endDate'
: 
"2023-12-16T04:56:00.000Z",
id
: 
"657ea9f5-7234-42b6-945a-5d8dfa54ca33",
is_done
: 
false,
map_point
: 
"{ lat: -34.397, lng: 150.644 }",
name
: 
"Gabriel Hernán Pelle",
startDate
: 
"2023-06-09T16:20:00.000Z",
types
: 
[],
updatedAt
: 
"2022-12-24T17:27:15.014Z",
user
: 
"        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, aperiam alias velit sapiente enim at ipsa aut quod adipisci sit laudantium ex culpa porro sint odio voluptas sed repudiandae error.",
_deleted
: 
null,
_lastChangedAt
: 
1671902835038,
_version
: 
1
}

const fakeData = [fakeEvent, fakeEvent, fakeEvent, fakeEvent,fakeEvent, fakeEvent]

export default function ScrollImg ({events}: IProps) {

  console.log('event', events)

    return (
    <main>
      <div className="container px-4 flex-grow w-full py-4 sm:py-16 mx-auto px-0">
        <div className="mx-auto w-full md:w-4/5 px-4">
          <div className="container my-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-medium">
                Mira algunos eventos
              </h2>
              <div>
                <button
                  className="cursor-pointer text-xl mx-1 text-indigo-600 font-bold"
                >
                </button>
                <button
                  className="cursor-pointer text-xl mx-1 text-indigo-600 font-bold"
                >
                </button>
              </div>
            </div>
            <div
              id="scrollContainer"
              className="scrollbar flex flex-no-wrap overflow-x-scroll scrolling-touch items-start mb-8"
            >
            {events.map((event, index) => {
  
                return (
                <EventCard event={event} key={event.id + index}  />
              )})
                }  
           
            </div>
          </div>

          
        </div>
      </div>
    </main>
    )
}


export function ScrollImg2 () {
    return (
    <main>
      <div className="container px-4 flex-grow w-full py-4 sm:py-16 mx-auto px-0">
        <div className="mx-auto w-full md:w-4/5 px-4">
          <div className="container my-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-medium">
                Mira algunos eventos
              </h2>
              <div>
                <button
                  className="cursor-pointer text-xl mx-1 text-indigo-600 font-bold"
                >
                </button>
                <button
                  className="cursor-pointer text-xl mx-1 text-indigo-600 font-bold"
                >
                </button>
              </div>
            </div>
            <div
              id="scrollContainer"
              className="scrollbar flex flex-no-wrap overflow-x-scroll scrolling-touch items-start mb-8"
            >
                 {fakeData.map((event, index) => {
                console.log(event)
                return (
                <EventCard event={event} key={event.id + index}  />
              )})
                }  
           
            </div>
          </div>

          
        </div>
      </div>
    </main>
    )
}