import EventCard from '../eventCard/eventCard'
import { Event } from '../../models'
import React from 'react'
import Link from 'next/link'

interface IProps {
  events: Array<Event>
}

export default function ScrollEvent({ events }: IProps) {
  return (
    <div className='flex flex-wrap overflow-auto ' style={{ width: '1030px',height: '730px' , marginRight: '150px' }}>
        {events.map((event, index) => {
          return (
            <Link href={`/events/${event.id}`}>
              <EventCard event={event} key={event.id + index} />
            </Link>
          )
        })}
    </div>
  )
}

