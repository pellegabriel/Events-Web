import { memo, useCallback, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { Event } from '../../src/models'
import Marker from './Marker'
import { useGetEvents } from '../../api/events'

const containerStyle = {
  width: '800px',
  height: '300px',
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

function Map({ center, zoom }: IProps) {
  const [map, setMap] = useState(null)
  const { data, loading, error } = useGetEvents()
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY || 'Error',
  })

  const onLoad = useCallback(function callback(map: any) {
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  if (loading) {
    return <p>loading...</p>
  }

  if (error) {
    return <p>Hubo un error con los eventos, vuelve a recargar la pagina por favor.</p>
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center || defaultCenter}
      zoom={zoom || defaultZoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {data.map((event) => (
        <Marker event={event} key={event.id} />
      ))}
    </GoogleMap>
  ) : (
    <></>
  )
}

export default memo(Map)
