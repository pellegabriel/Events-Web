import { useEffect, useState } from "react"
import { supabase } from "../supabase"

type TCategory = {
    id:number,
    label:string
    icon_name:string
}

type TUseGetCategories = {
    data: TCategory[]
    error:string
    loading:boolean
}

export const useGetCategories = (): TUseGetCategories => {
    const [data, setData] = useState<TCategory[]>(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
  
    const fetchCategories = async () => {
      try {
          setLoading(true)
          const { data } = await supabase.from("categories").select();
          setData(data)
      } catch (err){
          setError(err)
      } finally {
          setLoading(false)
      }
    }

    const filterCategories = async (categoriesIds: string[]) => {
        try {
            setLoading(true)
            const { data } = await supabase.from("categories").select('id');
            setData(data)
        } catch (err){
            setError(err)
        } finally {
            setLoading(false)
        }
    }
  
    useEffect(() => {
      fetchCategories()
    }, [])

    return { data, error, loading }
}