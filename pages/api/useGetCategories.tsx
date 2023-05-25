import { useEffect, useState } from "react";
import { supabase } from "../supabase";

type TUseGetCategories = {
  data: {
    id: number,
    label: string
  }[] | null,
  error: string,
  loading: boolean
};

export const useGetCategories = (): TUseGetCategories => {
  const [data, setData] = useState<TUseGetCategories["data"]>(null);
  const [error, setError] = useState<TUseGetCategories["error"]>('');
  const [loading, setLoading] = useState<TUseGetCategories["loading"]>(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await supabase.from("").select();
      setData(data);
    } catch (err) {
      setError(err as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { data, error, loading };
};
