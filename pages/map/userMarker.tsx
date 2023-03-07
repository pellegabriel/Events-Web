import { useCallback, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import Geocode from "react-geocode"
import useDebouncedSearch from '../../src/hooks/useDebouncedSearch';

Geocode.setApiKey(process.env.NEXT_PUBLIC_MAPS_API_KEY || 'Error');

Geocode.setLanguage("es");
Geocode.setRegion("arg");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

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
  const searchAddress = (address:string) => {
    Geocode.fromAddress(address).then(
      (response: any) => {
        const { location } = response.results[0].geometry;
        onDragEnd (`{ "lat": ${location?.lat}, "lng": ${location?.lng} }`)
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  const { inputText, setInputText } = useDebouncedSearch(
    searchAddress
    )
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY || 'Error',
  })

  const [map, setMap] = useState<GoogleMap | null>(null)

  const position = JSON.parse(
    (map_point) || '{ "lat": -34.91554, "lng": -57.91454 }',
  )

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
    <div>
      <div className='pt-8 pb-4' >
      <input
        id="address" 
        placeholder='Ingrese la direccion' 
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value)}}
          style={{borderWidth:'1px', borderColor:'gray'}}

      />
      </div>
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
    </div>
  ) : (
    <></>
  )
}

export default UserMarker

