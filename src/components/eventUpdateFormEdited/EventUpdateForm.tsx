import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
// import { Picker } from '@react-native-picker/picker';
// import { AudioControls } from '../AudioControls';
import { TEvent, useCreateEvent } from '../../../api/events';
// import AppImagePicker from '../Camara/ImagePicker';
// import  DatePicker  from '../DatePicker/DatePicker';
// import { AdressInputWithMap } from '../Map/AdressInputWithMap';
// import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../../supabase';
import Select from 'react-select';
import errors from 'formidable/FormidableError';
import Map from '../../../pages/map/userMarker'
import { useGetCategories } from '../../../api/categories';

export const EventForm = () => {
  const categories = useGetCategories()
  const { createEvent } = useCreateEvent();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<TEvent>({
    id: uuidv4(),
    audio: '',
    categoria: '',
    created_by: '',
    date: '',
    description: '',
    event_end_time: '',
    image: '',
    location: {
      lat: '',
      lng: ''
    },
    subtitle: '',
    title: ''
  });

  const setCreatedByField = async () => {
    const { data: { user }} = await supabase.auth.getUser();
    if (user?.id) {
      setFormData((prevData) => ({ ...prevData, created_by: user.id }));
    }
  }

  const handleInputChange = (field: keyof TEvent, value: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleAddressChange = (location: any) => {
    setFormData((prevData) => ({ ...prevData, location }));
  };
  
  const handleImageChange = (image: any) => {
    setFormData((prevData) => ({ ...prevData, image }));
  } 

  const handleAudioRecorded = (audio: any) => {
    setFormData((prevData) => ({ ...prevData, audio }));
  };

  const handleDateSelected = (date: any) => {
    setFormData((prevData) => ({ ...prevData, date }));
  }
  
  const handleSubmit = async () => {
    try {
      setLoading(true)
      await createEvent(formData);
      // navigation.navigate('Home', {
      //   shouldRefetch: true
      // });
    } catch (error) {
      console.log('form-submit-error', error)
    } finally {
      setLoading(false)
    }
  };

  const handleCategorySelected = (category: any) => {
    console.log({ category })
  }

  const categoriesOptions = categories.data.map((category) => {
    return {
      value: category.label,
      label: category.label,
    }
  })

  return (
    <>
      <div style={{
          marginTop: 10,
          paddingTop: 20,
          paddingBottom: 10,
        }}>
        <div style={{
            marginTop: 10,
            justifyContent: 'center',
            padding: 15,
            borderRadius: 8,
          }}>
          <label placeholder='Titulo' />
          <textarea
            value={formData.title}
            onChange={(event) => handleInputChange('title', event.target.value)}
            style={{
                padding: '0px 8px',
                borderWidth: 1,
                borderColor: '#4e4e4e',
              }}
            placeholder="Escalada en el cerro Otto"
          />

          <label placeholder='Subtitulo' />
          <textarea
            value={formData.subtitle || ''}
            onChange={(event) => handleInputChange('subtitle', event.target.value)} 
            style={{
              padding: '0px 8px',
              borderWidth: 1,
              borderColor: '#4e4e4e',
            }}
            placeholder="Evento para para mayores de 26"
          />

          <label placeholder='Description' />
          <textarea
            value={formData.description || ''}
            onChange={(event) => handleInputChange('description', event.target.value)} 
            style={{
              padding: '0px 8px',
              borderWidth: 1,
              borderColor: '#4e4e4e',
            }}
            placeholder="Te esperamos de 5 a 8 en nuestro local..."
          />

          <label placeholder='Fecha del evento' />
          {/* <DatePicker handleDateSelected={handleDateSelected} /> */}

          <label placeholder='Elegi la categoria del evento' />
          <Select
            options={categoriesOptions} onChange={handleCategorySelected}
          />

          <label placeholder='Graba un audio contando acerca del evento' />
          {/* <AudioControls eventId={formData.id} handleAudioRecorded={handleAudioRecorded} /> */}

          <label placeholder='Subi una foto del evento' />
          {/* <AppImagePicker eventId={formData.id} handleImageChange={handleImageChange} /> */}
        </div>
      </div>

      <label placeholder='Ubicacion del evento' />
      <div style={{
        marginBottom: 160
      }}>
        {/* <Map map_point={formData.location} onDragEnd={handleDragEnd} /> */}
        {/* <AdressInputWithMap onChange={handleAddressChange} location={formData.location} map_point="" /> */}

        <button
          disabled={loading}
          style={{
            padding: 20,
            marginTop: 60,
            borderRadius: 5,
            backgroundColor:  '#f5694d',
          }}
          onClick={handleSubmit}
        >
          <h1 style={{
            color: '#FFFFFF',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>Crear evento</h1>
        </button>
      </div>
    </>
  );
};