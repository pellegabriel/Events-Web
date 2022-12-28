import EventCard from "../eventCard/eventCard"
import { Event } from '../../models'

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


// import required modules
import { Pagination, Navigation } from "swiper";

interface IProps {
  events: Array<Event>
}

export default function ScrollEvent({events}:IProps) {
  return (
    <div>
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"

      >
        {
          events.map((event, index) => {
            return (
              <SwiperSlide>
                <EventCard event={event} key={event.id + index}  />
              </SwiperSlide>
            )
          })}  
        

      </Swiper>
    </div>
  );
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

