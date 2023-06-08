import { Amplify } from 'aws-amplify'
import awsExports from '../../aws-exports'
import { ChangeEvent, FocusEvent } from 'react'
import { Event, EventTypes } from '../../models'
import { IFilters } from '../../../pages'
import Select, { ActionMeta, SingleValue } from 'react-select'
import EventCard2 from '../eventCard2/eventCard2'
import Link from 'next/link'
import svg5 from '../../../public/svg5.svg'
import Image from 'next/image'
import React from 'react'
import { useGetEvents } from '../../../api/events'

Amplify.configure({ ...awsExports, ssr: true })
interface IProps {
  eventTypesOptions: Array<EventTypes>
  events: Array<Event>
  filters: IFilters
  updateFilters: (newValue: Partial<IFilters>) => void
}

export default function EventsSearch() {
  const { data, loading, error } = useGetEvents()

  if (loading) {
    return <p>loading...</p>
  }

  if (error) {
    return <p>Hubo un error con los eventos, vuelve a recargar la pagina por favor.</p>
  }

  return (
    <div
      className=" hover:bg-black  flex justify-center"
      style={{
        padding: '8px',
        color: 'gray-900',
        marginBottom: '100px',
      }}
    >
      <div
        className="flex justify-center"
        style={{
          padding: '48px',
        }}
      >
        <div className="">
          <div className=" text-sm   mb-12 border-b border-gray-300 ">
            <h5 className="py-1 mb-1 " style={{ color: 'white' }}>
              Cantidad de eventos disponibles: {data?.length}
            </h5>
          </div>

          <div
            className="flex flex-wrap "
            style={{
              overflow: 'auto',
              marginBottom: '100px',
              padding: '8px',
              maxHeight: '900px',
            }}
          >
            {data && data.map((event: any) => {
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
