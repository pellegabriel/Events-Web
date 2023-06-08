import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export type TEvent = {
    audio: string
    categoria: string
    created_by: string
    description: string
    event_date_end: string
    event_date_start: string
    event_end_time: string
    event_time_end: string
    event_time_start: string
    id: string
    image: string
    location: {
        lat: string
        lng: string
    }
    subtitle: string
    title: string
}

type TUseGetEvents = {
    data: TEvent[]
    error: string
    loading: boolean
}

type TUseCreateEvents = {
    data: TEvent[]
    createEvent: (eventData: TEvent) => Promise<void>
    error: string
    loading: boolean
}

export const useGetEvents = (): TUseGetEvents => {
    const [data, setData] = useState<TEvent[]>(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
  
    const fetchEvents = async () => {
      try {
          setLoading(true)
          const { data } = await supabase.from("events").select();
          setData(data)
      } catch (err){
          setError(err)
      } finally {
          setLoading(false)
      }
    }
  
    useEffect(() => {
      fetchEvents()
    }, [])

    return { data, error, loading }
}

export const useCreateEvent = (): TUseCreateEvents => {
    const [data, setData] = useState<TEvent[]>(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
  
    const createEvent = async (eventData: TEvent) => {
        try {
            setLoading(true)
            const response = await supabase.from("events").insert([eventData]);
            console.log(response)
            setData(response.data);
        } catch (err){
            console.log({ err })
            setError(err)
        }   finally {
            setLoading(false)
        }
    }
  
    return { data, createEvent, error, loading }
}