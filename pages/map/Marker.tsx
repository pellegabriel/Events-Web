import React from 'react'
import { Marker } from '@react-google-maps/api'
import { TEvent } from '../../api/events'

interface IProps {
  event: TEvent
}

const MapMarker = ({ event }: IProps) => {
  const position = `${event.location}` || JSON.parse('{ "lat": -34.91554, "lng": -57.91454 }')

  return <Marker position={position} />
}

export default MapMarker
