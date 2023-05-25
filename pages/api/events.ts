import { useEffect, useState } from "react";
import { supabase } from "../supabase";

type TUseGetEvents = {
  data: any;
  error: string;
  loading: boolean;
};

type TUseCreateEvents = {
  data: any;
  createEvent: (eventData: any) => Promise<void>;
  error: string;
  loading: boolean;
};

export const useGetEvents = (): TUseGetEvents => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data } = await supabase.from("events").select();
      setData(data);
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { data, error, loading };
};

export const useCreateEvent = (): TUseCreateEvents => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const createEvent = async (eventData: any) => {
    try {
      setLoading(true);
      const { data } = await supabase.from("events").insert([eventData]);
      setData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, createEvent, error, loading };
};
