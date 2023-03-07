import EventCard from '../eventCard/eventCard'
import { Event } from '../../models'
import React from 'react'
import Link from 'next/link'

interface IProps {
  events: Array<Event>
}

export default function ScrollEvent({ events }: IProps) {

  return (
    <div
      className="flex flex-wrap overflow-auto justify-center"
      style={{
        minWidth: '400px',
        backgroundColor:'white',
        maxWidth:'960px',
        height: '730px',
        overflow: 'auto',
        borderBottomLeftRadius:'10PX',
        borderBottomRightRadius:'10PX'
        ,borderWidth:'3px',
      }}
    >
      {events.map((event, index) => {
        return (
          <Link href={`/events/${event.id}`} key={event.id + index}>
            <EventCard event={event} key={event.id + index} />
          </Link>
        )
      })}
    </div>
  )
}
