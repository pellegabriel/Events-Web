import EventCard from '../eventCard/eventCard'
import { Event } from '../../models'
import React from 'react'
import Link from 'next/link'
import { useGetEvents } from '../../../api/events'

interface IProps {
  events: Array<Event>
}

export default function ScrollEvent() {
  const { data, loading, error } = useGetEvents()

  if (loading) {
    return <p>loading...</p>
  }

  if (error) {
    return <p>Hubo un error con los eventos, vuelve a recargar la pagina por favor.</p>
  }

  return (
    <div
      className="flex flex-wrap overflow-auto justify-center p-5"
      style={{
        minWidth: '400px',
        marginTop: '40PX',
        maxWidth: '1200px',
        height: '730px',
        overflow: 'auto',
      }}
    >
      {data && data.map((event) => {
        return (
          <Link href={`/events/${event.id}`} key={event.id}>
            <EventCard event={event} key={event.id} />
          </Link>
        )
      })}
    </div>
  )
}
