export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          icon_name: string | null
          id: number
          label: string | null
        }
        Insert: {
          icon_name?: string | null
          id?: number
          label?: string | null
        }
        Update: {
          icon_name?: string | null
          id?: number
          label?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          audio: string | null
          categoria: string | null
          created_by: string | null
          date: string | null
          description: string | null
          event_end_time: string | null
          id: string
          image: string | null
          location: Json | null
          subtitle: string | null
          title: string
        }
        Insert: {
          audio?: string | null
          categoria?: string | null
          created_by?: string | null
          date?: string | null
          description?: string | null
          event_end_time?: string | null
          id?: string
          image?: string | null
          location?: Json | null
          subtitle?: string | null
          title: string
        }
        Update: {
          audio?: string | null
          categoria?: string | null
          created_by?: string | null
          date?: string | null
          description?: string | null
          event_end_time?: string | null
          id?: string
          image?: string | null
          location?: Json | null
          subtitle?: string | null
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
