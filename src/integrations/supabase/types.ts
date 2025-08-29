export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          check_in: string
          check_out: string
          created_at: string | null
          guests: number
          hotel_id: string | null
          id: string
          room_id: string | null
          status: string
          total_price: number
          user_id: string | null
        }
        Insert: {
          check_in: string
          check_out: string
          created_at?: string | null
          guests?: number
          hotel_id?: string | null
          id?: string
          room_id?: string | null
          status?: string
          total_price: number
          user_id?: string | null
        }
        Update: {
          check_in?: string
          check_out?: string
          created_at?: string | null
          guests?: number
          hotel_id?: string | null
          id?: string
          room_id?: string | null
          status?: string
          total_price?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          budget: string | null
          company: string | null
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          project_type: string | null
          timeline: string | null
          updated_at: string | null
        }
        Insert: {
          budget?: string | null
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          project_type?: string | null
          timeline?: string | null
          updated_at?: string | null
        }
        Update: {
          budget?: string | null
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          project_type?: string | null
          timeline?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      hotels: {
        Row: {
          amenities: string[] | null
          available_rooms: number
          city: string
          country: string
          created_at: string | null
          description: string
          id: string
          image_url: string
          location: string
          name: string
          price_per_night: number
          rating: number
          total_rooms: number
        }
        Insert: {
          amenities?: string[] | null
          available_rooms?: number
          city: string
          country?: string
          created_at?: string | null
          description: string
          id?: string
          image_url: string
          location: string
          name: string
          price_per_night: number
          rating?: number
          total_rooms?: number
        }
        Update: {
          amenities?: string[] | null
          available_rooms?: number
          city?: string
          country?: string
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string
          location?: string
          name?: string
          price_per_night?: number
          rating?: number
          total_rooms?: number
        }
        Relationships: []
      }
      opportunities: {
        Row: {
          deadline: string | null
          description: string | null
          id: number
          link: string | null
          posted_on: string | null
          title: string | null
          type: string | null
        }
        Insert: {
          deadline?: string | null
          description?: string | null
          id: number
          link?: string | null
          posted_on?: string | null
          title?: string | null
          type?: string | null
        }
        Update: {
          deadline?: string | null
          description?: string | null
          id?: number
          link?: string | null
          posted_on?: string | null
          title?: string | null
          type?: string | null
        }
        Relationships: []
      }
      product_orders: {
        Row: {
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string | null
          customization_notes: string | null
          id: string
          order_status: string
          product_name: string
          product_price: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          customization_notes?: string | null
          id?: string
          order_status?: string
          product_name: string
          product_price: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          customization_notes?: string | null
          id?: string
          order_status?: string
          product_name?: string
          product_price?: number
          updated_at?: string
        }
        Relationships: []
      }
      project_bookings: {
        Row: {
          budget_range: string
          company: string | null
          contact_preference: string | null
          created_at: string
          description: string
          email: string
          id: string
          name: string
          phone: string | null
          project_type: string
          status: string | null
          timeline: string
          updated_at: string
        }
        Insert: {
          budget_range: string
          company?: string | null
          contact_preference?: string | null
          created_at?: string
          description: string
          email: string
          id?: string
          name: string
          phone?: string | null
          project_type: string
          status?: string | null
          timeline: string
          updated_at?: string
        }
        Update: {
          budget_range?: string
          company?: string | null
          contact_preference?: string | null
          created_at?: string
          description?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          project_type?: string
          status?: string | null
          timeline?: string
          updated_at?: string
        }
        Relationships: []
      }
      rooms: {
        Row: {
          amenities: string[] | null
          capacity: number
          created_at: string | null
          hotel_id: string | null
          id: string
          image_url: string
          is_available: boolean | null
          price_per_night: number
          room_type: string
        }
        Insert: {
          amenities?: string[] | null
          capacity?: number
          created_at?: string | null
          hotel_id?: string | null
          id?: string
          image_url: string
          is_available?: boolean | null
          price_per_night: number
          room_type: string
        }
        Update: {
          amenities?: string[] | null
          capacity?: number
          created_at?: string | null
          hotel_id?: string | null
          id?: string
          image_url?: string
          is_available?: boolean | null
          price_per_night?: number
          room_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "rooms_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      trendingSkill: {
        Row: {
          Category: string | null
          "Learning Resource": string | null
          Skill: string
          "Trend (%)": number | null
        }
        Insert: {
          Category?: string | null
          "Learning Resource"?: string | null
          Skill: string
          "Trend (%)"?: number | null
        }
        Update: {
          Category?: string | null
          "Learning Resource"?: string | null
          Skill?: string
          "Trend (%)"?: number | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: string
          phone: string | null
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          id: string
          email: string
          status: string
          subscribed_at: string
          created_at?: string | null
        }
        Insert: {
          id?: string
          email: string
          status?: string
          subscribed_at?: string
          created_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          status?: string
          subscribed_at?: string
          created_at?: string | null
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
