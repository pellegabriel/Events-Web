import { memo, useCallback, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { Event } from '../../src/models'
import Marker from './Marker'

const containerStyle = {
  width: '300px',
  height: '730px',
  borderRadius: '30px',
}

const defaultCenter = {
  lat: -34.92317666584001,
  lng: -57.94956215165454,
}

const defaultZoom = 10

interface IProps {
  events: Array<Event>
  center?: google.maps.LatLng | google.maps.LatLngLiteral
  zoom?: number
}

function Map({ events = [], center, zoom }: IProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY || 'Error',
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map: any) {
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center || defaultCenter}
      zoom={zoom || defaultZoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {events.map((event) => (
        <Marker event={event} key={event.id} />
      ))}
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  )
}

export default memo(Map)
