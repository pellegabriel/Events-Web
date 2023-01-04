import { Amplify } from 'aws-amplify'
import awsExports from '../../aws-exports'
import { FocusEvent } from 'react'
import { Event } from '../../models'
import { IFilters } from '../../../pages'
import EventCard2 from '../eventCard2/eventCard2'
import Link from 'next/link'

Amplify.configure({ ...awsExports, ssr: true })
interface IProps {
  events: Array<Event>
  filters: IFilters
  updateFilters: (newValue: Partial<IFilters>) => void
}

export default function EventsSearch({ events = [], updateFilters }: IProps) {
  const handleChange = (value: string, name: string) => {
    updateFilters({ [name]: value })
  }

  return (
    <div className=" border border-gray-300 w-6/6 rounded-lg p-8   ">
      <div className="flex justify-center mb-10 mt-10  ">
        <div className="flex flex-col py-6 p-8 ">
          <h2 className="font-medium text-sm text-stone-600">Fecha inicio: </h2>
          <input
            className="w-7"
            type="date"
            placeholder="Fecha"
            onBlur={(e: FocusEvent<HTMLInputElement>) => {
              handleChange(e.target.value, 'startDate')
            }}
          />
        </div>
        <div className="flex flex-col p-8 ">
          <h2 className="font-medium text-sm text-stone-600">
            Tipo de evento:
          </h2>
          <input
            className="w-7"
            type="text"
            placeholder="tipo"
            onBlur={(e: FocusEvent<HTMLInputElement>) => {
              handleChange(e.target.value, 'types')
            }}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="justify-center">
          <div className="text-gray-900 text-xl font-medium mb-12 border-b border-gray-300 ">
            <h5 className="py-1 mb-1">
              Cantidad de eventos disponibles: {events.length}
            </h5>
          </div>

          <div className=" flex flex-wrap  pl-2 ">
            {events.map((event: any) => {
              return (
                <Link href={`/events/${event.id}`} key={event.id}>
                  <EventCard2 event={event} key={event.id} />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
