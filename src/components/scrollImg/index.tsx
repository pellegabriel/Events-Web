import EventCard from "../eventCard/eventCard"
import { Event } from '../../models'

interface IProps {
  events: Array<Event>
}

export default function ScrollImg ({events}: IProps) {
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
              <EventCard events={events}/>
            </div>
          </div>

          
        </div>
      </div>
    </main>
    )
}