import { memo, useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Event } from "../../src/models";
import Marker from "./Marker"


const containerStyle = {
  width: '1500px',
  height: '500px',
  borderRadius: '30px'
};

const center = {
  lat: -34.92317666584001,
  lng: -57.94956215165454
};

interface IProps {
  events: Array <Event>
}

function MyComponent({ events = [] }:IProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY || "Error"
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom= {14}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {events.map((event)=>(<Marker event={event} key={event.id}/>))}
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default memo(MyComponent)