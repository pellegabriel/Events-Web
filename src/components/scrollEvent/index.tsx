import EventCard from '../eventCard/eventCard'
import { Event } from '../../models'

import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

// import required modules
import { Pagination, Navigation } from 'swiper'
import Link from 'next/link'

interface IProps {
  events: Array<Event>
}

export default function ScrollEvent({ events }: IProps) {
  return (
    <>
      <Swiper
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {events.map((event, index) => {
          return (
            <SwiperSlide key={event.id + index}>
              <Link href={`/events/${event.id}`}>
                <EventCard event={event} key={event.id + index} />
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}

// interface IProps {
//   events: Array<Event>
// }

// <div className="w-6 flex overflow-x-hid" >
//     {events.map((event, index) => {
//       return (
//         <EventCard event={event} key={event.id + index}  />
//       )
//     })}
// </div>
