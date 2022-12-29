import React from "react";
import { Event } from "../../src/models";
import { Marker } from '@react-google-maps/api';

interface IProps {
    event: Event 
  }

    const MapMarker = ({ event }:IProps)  => {
        const position=JSON.parse(event.map_point || '{ "lat": -34.91554, "lng": -57.91454 }')
        return(
          <Marker position={position}/>
        )
      };

      export default MapMarker