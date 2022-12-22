import { memo, SetStateAction, useCallback, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Event } from "../../src/models";
// import { Spinner } from "@theme-ui/components";
import Image from "next/image"

const containerStyle = {
  width: '450px',
  height: '250px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

interface IProps {
  events: Array<Event>
}

function Map({events = []}: IProps) {
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
      // <GoogleMap
      //   mapContainerStyle={containerStyle}
      //   center={center}
      //   zoom={10}
      //   onLoad={onLoad}
      //   onUnmount={onUnmount}
      // >
        
      //   { /* Child components, such as markers, info windows, etc. */ }
      //   <> {events.map((event) => (
      //     <Marker
      //       key={event.id}
      //       latitude={event.map_point.lat}
      //       longitude={event.map_point.lon}
      //       offsetLeft={-15}
      //       offsetTop={-15}
      //     >
      //         <Image src="/home-solid.svg" alt="house" className="w-8" />

      //     </Marker>
      //   ))}</>
      // </GoogleMap>
      <></>
  ) : <></>
}

export default memo(Map)