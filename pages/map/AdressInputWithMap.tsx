import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY, gecodificateLocation } from '../../api/geocodification';

const defaultCenter = {
  latitude: -34.92317666584001,
  longitude: -57.94956215165454,
};
interface IProps {
  location: { lat: number, lng: number };
  map_point: string;
  center?: { latitude: number; longitude: number };
  onChange: (location: { lat: number, lng: number }) => void; // Cambio en la definición de onChange
}

export const AdressInputWithMap = ({ location, map_point, center, onChange }: IProps) => {
  const [position, setPosition] = useState(center || defaultCenter);
  const [value, setValue] = useState(map_point || '');

  // const [address, setAddress] = useState();

  useEffect(() => {
    const getAddressData = async () => {
      const addressData = await gecodificateLocation(location);
      setValue(addressData);
    };

    getAddressData();
  }, [location]);

  const handlePlaceSelect = (data, details) => {
    const { lat, lng } = details.geometry.location;
    const newPosition = { latitude: lat, longitude: lng };
    setPosition(newPosition);
    setValue(details.formatted_address);
    onChange({ lat, lng });
  };
  
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={styles.inputContainer}
      >
        <GooglePlacesAutocomplete
          apiKey={GOOGLE_MAPS_API_KEY}
          // fetchDetails={true}
          // placeholder="Type a place"
          // onPress={handlePlaceSelect}
          // query={{ key: GOOGLE_MAPS_API_KEY, language: 'es' }}
          selectProps={{
            value,
            onChange: setValue,
          }}        />
      </ScrollView>

      <MapView
        style={styles.map}
        region={{
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          latitude: position.latitude,
          longitude: position.longitude,
        }}
      >
        <Marker
          coordinate={position}
          onDragEnd={(e) => setPosition(e.nativeEvent.coordinate)}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: Dimensions.get('screen').width - 80,
    height: 200,
    borderRadius: 6
  },
  inputContainer: {
    flex: 1,
    marginBottom: 8
  },
  inputStyle: {
    width: Dimensions.get('screen').width - 30,
    padding: 0,
    margin: 0
  }
});