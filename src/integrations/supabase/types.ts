export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
          password_hash: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name: string
          password_hash: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          password_hash?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string | null
          description: string | null
          event_date: string | null
          event_type: string
          id: string
          location: string | null
          poster_image_url: string | null
          price: number | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          event_date?: string | null
          event_type: string
          id?: string
          location?: string | null
          poster_image_url?: string | null
          price?: number | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          event_date?: string | null
          event_type?: string
          id?: string
          location?: string | null
          poster_image_url?: string | null
          price?: number | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      feedback_requests: {
        Row: {
          created_at: string | null
          id: string
          judge_id: string | null
          judge_name: string
          message: string | null
          performance_description: string | null
          performance_title: string
          performer_email: string
          performer_name: string
          requested_at: string | null
          status: Database["public"]["Enums"]["request_status"] | null
          updated_at: string | null
          video_url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          judge_id?: string | null
          judge_name: string
          message?: string | null
          performance_description?: string | null
          performance_title: string
          performer_email: string
          performer_name: string
          requested_at?: string | null
          status?: Database["public"]["Enums"]["request_status"] | null
          updated_at?: string | null
          video_url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          judge_id?: string | null
          judge_name?: string
          message?: string | null
          performance_description?: string | null
          performance_title?: string
          performer_email?: string
          performer_name?: string
          requested_at?: string | null
          status?: Database["public"]["Enums"]["request_status"] | null
          updated_at?: string | null
          video_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_requests_judge_id_fkey"
            columns: ["judge_id"]
            isOneToOne: false
            referencedRelation: "judges"
            referencedColumns: ["id"]
          },
        ]
      }
      judges: {
        Row: {
          available_for_hire: boolean | null
          bio: string | null
          country: string | null
          created_at: string | null
          dance_genres: string[] | null
          email: string
          hourly_rate: number | null
          id: string
          is_active: boolean | null
          is_platinum: boolean | null
          languages: string[] | null
          name: string
          password: string | null
          profile_image: string | null
          rating: number | null
          review_count: number | null
          role: string | null
          updated_at: string | null
          user_id: string | null
          username: string | null
        }
        Insert: {
          available_for_hire?: boolean | null
          bio?: string | null
          country?: string | null
          created_at?: string | null
          dance_genres?: string[] | null
          email: string
          hourly_rate?: number | null
          id?: string
          is_active?: boolean | null
          is_platinum?: boolean | null
          languages?: string[] | null
          name: string
          password?: string | null
          profile_image?: string | null
          rating?: number | null
          review_count?: number | null
          role?: string | null
          updated_at?: string | null
          user_id?: string | null
          username?: string | null
        }
        Update: {
          available_for_hire?: boolean | null
          bio?: string | null
          country?: string | null
          created_at?: string | null
          dance_genres?: string[] | null
          email?: string
          hourly_rate?: number | null
          id?: string
          is_active?: boolean | null
          is_platinum?: boolean | null
          languages?: string[] | null
          name?: string
          password?: string | null
          profile_image?: string | null
          rating?: number | null
          review_count?: number | null
          role?: string | null
          updated_at?: string | null
          user_id?: string | null
          username?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          id: string
          payment_intent_id: string | null
          performance_id: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          id?: string
          payment_intent_id?: string | null
          performance_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          id?: string
          payment_intent_id?: string | null
          performance_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_performance_id_fkey"
            columns: ["performance_id"]
            isOneToOne: false
            referencedRelation: "performances"
            referencedColumns: ["id"]
          },
        ]
      }
      page_content: {
        Row: {
          content_type: string
          content_value: string
          created_at: string | null
          id: string
          page_name: string
          section_name: string
          updated_at: string | null
        }
        Insert: {
          content_type: string
          content_value: string
          created_at?: string | null
          id?: string
          page_name: string
          section_name: string
          updated_at?: string | null
        }
        Update: {
          content_type?: string
          content_value?: string
          created_at?: string | null
          id?: string
          page_name?: string
          section_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      page_images: {
        Row: {
          alt_text: string | null
          created_at: string
          display_order: number
          id: string
          image_url: string
          is_active: boolean
          page_name: string
          section_name: string
          updated_at: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          display_order?: number
          id?: string
          image_url: string
          is_active?: boolean
          page_name: string
          section_name: string
          updated_at?: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          display_order?: number
          id?: string
          image_url?: string
          is_active?: boolean
          page_name?: string
          section_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      performance_feedback: {
        Row: {
          created_at: string | null
          creativity: number | null
          id: string
          judge_id: string | null
          judge_name: string
          order_id: string | null
          overall: number | null
          performance_id: string | null
          reflex: number | null
          smoothness: number | null
          submitted_at: string | null
          technique: number | null
          text_feedback: string
          timing: number | null
          video_feedback_file_url: string | null
          video_feedback_url: string | null
        }
        Insert: {
          created_at?: string | null
          creativity?: number | null
          id?: string
          judge_id?: string | null
          judge_name: string
          order_id?: string | null
          overall?: number | null
          performance_id?: string | null
          reflex?: number | null
          smoothness?: number | null
          submitted_at?: string | null
          technique?: number | null
          text_feedback: string
          timing?: number | null
          video_feedback_file_url?: string | null
          video_feedback_url?: string | null
        }
        Update: {
          created_at?: string | null
          creativity?: number | null
          id?: string
          judge_id?: string | null
          judge_name?: string
          order_id?: string | null
          overall?: number | null
          performance_id?: string | null
          reflex?: number | null
          smoothness?: number | null
          submitted_at?: string | null
          technique?: number | null
          text_feedback?: string
          timing?: number | null
          video_feedback_file_url?: string | null
          video_feedback_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "performance_feedback_judge_id_fkey"
            columns: ["judge_id"]
            isOneToOne: false
            referencedRelation: "judges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "performance_feedback_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "performance_feedback_performance_id_fkey"
            columns: ["performance_id"]
            isOneToOne: false
            referencedRelation: "performances"
            referencedColumns: ["id"]
          },
        ]
      }
      performances: {
        Row: {
          assigned_judge_id: string | null
          assigned_judge_name: string | null
          country: string
          created_at: string | null
          dance_genre: string
          email: string
          feedback_type: Database["public"]["Enums"]["feedback_type"]
          global_entry: boolean | null
          global_scoring: boolean | null
          id: string
          language: string
          payment_status: string | null
          performance_description: string | null
          performance_title: string
          performer_name: string
          platinum_judge_id: string | null
          platinum_upgrade: boolean | null
          status: Database["public"]["Enums"]["performance_status"]
          submitted_at: string | null
          teacher_recommendations_shown: boolean | null
          updated_at: string | null
          video_url: string
        }
        Insert: {
          assigned_judge_id?: string | null
          assigned_judge_name?: string | null
          country: string
          created_at?: string | null
          dance_genre: string
          email: string
          feedback_type?: Database["public"]["Enums"]["feedback_type"]
          global_entry?: boolean | null
          global_scoring?: boolean | null
          id?: string
          language: string
          payment_status?: string | null
          performance_description?: string | null
          performance_title: string
          performer_name: string
          platinum_judge_id?: string | null
          platinum_upgrade?: boolean | null
          status?: Database["public"]["Enums"]["performance_status"]
          submitted_at?: string | null
          teacher_recommendations_shown?: boolean | null
          updated_at?: string | null
          video_url: string
        }
        Update: {
          assigned_judge_id?: string | null
          assigned_judge_name?: string | null
          country?: string
          created_at?: string | null
          dance_genre?: string
          email?: string
          feedback_type?: Database["public"]["Enums"]["feedback_type"]
          global_entry?: boolean | null
          global_scoring?: boolean | null
          id?: string
          language?: string
          payment_status?: string | null
          performance_description?: string | null
          performance_title?: string
          performer_name?: string
          platinum_judge_id?: string | null
          platinum_upgrade?: boolean | null
          status?: Database["public"]["Enums"]["performance_status"]
          submitted_at?: string | null
          teacher_recommendations_shown?: boolean | null
          updated_at?: string | null
          video_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "performances_assigned_judge_id_fkey"
            columns: ["assigned_judge_id"]
            isOneToOne: false
            referencedRelation: "judges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "performances_platinum_judge_id_fkey"
            columns: ["platinum_judge_id"]
            isOneToOne: false
            referencedRelation: "judges"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id?: string | null
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
      feedback_type: "free" | "paid"
      performance_status: "pending" | "reviewed" | "in-progress"
      request_status: "pending" | "accepted" | "declined"
      user_role: "admin" | "judge" | "performer"
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
    Enums: {
      feedback_type: ["free", "paid"],
      performance_status: ["pending", "reviewed", "in-progress"],
      request_status: ["pending", "accepted", "declined"],
      user_role: ["admin", "judge", "performer"],
    },
  },
} as const
