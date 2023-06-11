import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Json } from "../supabase-types";

export type TEvent = {
    audio: string | null
    categoria: string | null
    created_by: string | null
    date: string | null
    description: string | null
    event_end_time: string | null
    id: string
    image: string | null
    location: Json
    subtitle: string | null
    title: string
}

type TUseGetEvents = {
    data: TEvent[]
    error: string
    loading: boolean
}

type TUseCreateEvents = {
    error: string
    data: TEvent[]
    loading: boolean
    createEvent: (eventData: TEvent) => Promise<void>
}

export const useGetEvents = (): TUseGetEvents => {
    const [data, setData] = useState<TEvent[]>([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
  
    const fetchEvents = async () => {
      try {
          setLoading(true)
          const { data } = await supabase.from("events").select();

          if (data) setData(data)
      } catch (error){
        console.log(`error-fetching-event, ${error}`)
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
    const [data, setData] = useState<TEvent[]>([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
  
    const createEvent = async (eventData: TEvent) => {
        try {
            setLoading(true)
            const response = await supabase.from("events").insert([eventData]);
            if (response.data) setData(response.data);
        } catch (err){
            console.log(`error-creating-event, ${error}`)
        }   finally {
            setLoading(false)
        }
    }
  
    return { data, createEvent, error, loading }
}