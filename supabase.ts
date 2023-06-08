import { Database } from "./supabase-types";
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://ssdzombqzuvdrnzurmfw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzZHpvbWJxenV2ZHJuenVybWZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE1ODcwMDQsImV4cCI6MTk5NzE2MzAwNH0.llE1huTUo4sPjRpUH8PlVY2Wea_aOFq833pVhM8EDoM'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
