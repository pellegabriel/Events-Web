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
    <div className=" border border-gray-300 w-6/6 rounded-lg p-8   flex justify-center" style={{background: '#A569BD ',borderRadius:'10px' ,color:'white'}}>
      <div className="mb-10  p-8" style={{ maxWidth: '400px' }}>
        <div className="flex flex-col py-1 p-8 ">
          <h2 className="font-medium text-sm text-stone-600 text-lg">Fecha inicio: </h2>
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
          <h2 className="font-medium text-sm text-stone-600 text-lg">
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

      <div className="flex justify-center" style={{background: '#138D75',
      padding: '48px', borderRadius:'10px'}}>
        <div className="">
          <div className=" text-xl font-medium mb-12 border-b border-gray-300 ">
            <h5 className="py-1 mb-1">
              Cantidad de eventos disponibles: {events.length}
            </h5>
          </div>

          <div className="">
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
