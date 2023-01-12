import { useCallback, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { Event } from '../../src/models'

const containerStyle = {
  width: '500px',
  height: '400px',
  borderRadius: '30px',
}

const defaultCenter = {
  lat: -34.92317666584001,
  lng: -57.94956215165454,
}

const defaultZoom = 10

interface IProps {
  map_point: string
  center?: google.maps.LatLng | google.maps.LatLngLiteral
  zoom?: number
  onDragEnd: (event:string)=> void
}

function UserMarker({ map_point, center, zoom, onDragEnd }: IProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY || 'Error',
  })

  const [_map, setMap] = useState(null)
  const position = JSON.parse(
    (map_point) || '{ "lat": -34.91554, "lng": -57.91454 }',
  )
  console.log("aca map_point vale userMarker", {map_point, position})


  const onLoad = useCallback(function callback(map: any) {
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null)
  }, [])
  const handleDragEnd = (e: google.maps.MapMouseEvent) => {
    //setCurrentPosition(e.latLng)
    onDragEnd (`{ "lat": ${e.latLng?.lat()}, "lng": ${e.latLng?.lng()} }`)
  }
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center || defaultCenter}
      zoom={zoom || defaultZoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      
        <Marker draggable position={position} onDragEnd={handleDragEnd}/>
      <></>
    </GoogleMap>
  ) : (
    <></>
  )
}

export default UserMarker

