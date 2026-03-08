export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          organization_name: string | null
          phone: string | null
          avatar_url: string | null
          role: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          full_name: string
          organization_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          role?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string
          organization_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          role?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      campaigns: {
        Row: {
          id: string
          user_id: string
          title: string
          slug: string
          description: string | null
          campaign_type: string
          target_amount: number
          collected_amount: number | null
          donor_count: number | null
          cover_image_url: string | null
          beneficiary_story: string | null
          start_date: string | null
          end_date: string | null
          is_active: boolean | null
          mayar_product_id: string | null
          mayar_payment_link: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          slug: string
          description?: string | null
          campaign_type: string
          target_amount: number
          collected_amount?: number | null
          donor_count?: number | null
          cover_image_url?: string | null
          beneficiary_story?: string | null
          start_date?: string | null
          end_date?: string | null
          is_active?: boolean | null
          mayar_product_id?: string | null
          mayar_payment_link?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          slug?: string
          description?: string | null
          campaign_type?: string
          target_amount?: number
          collected_amount?: number | null
          donor_count?: number | null
          cover_image_url?: string | null
          beneficiary_story?: string | null
          start_date?: string | null
          end_date?: string | null
          is_active?: boolean | null
          mayar_product_id?: string | null
          mayar_payment_link?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      donations: {
        Row: {
          id: string
          campaign_id: string
          donor_name: string
          donor_email: string | null
          donor_phone: string | null
          amount: number
          donation_type: string
          is_anonymous: boolean | null
          message: string | null
          payment_status: string | null
          mayar_transaction_id: string | null
          mayar_payment_url: string | null
          mayar_invoice_id: string | null
          paid_at: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          campaign_id: string
          donor_name: string
          donor_email?: string | null
          donor_phone?: string | null
          amount: number
          donation_type: string
          is_anonymous?: boolean | null
          message?: string | null
          payment_status?: string | null
          mayar_transaction_id?: string | null
          mayar_payment_url?: string | null
          mayar_invoice_id?: string | null
          paid_at?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          campaign_id?: string
          donor_name?: string
          donor_email?: string | null
          donor_phone?: string | null
          amount?: number
          donation_type?: string
          is_anonymous?: boolean | null
          message?: string | null
          payment_status?: string | null
          mayar_transaction_id?: string | null
          mayar_payment_url?: string | null
          mayar_invoice_id?: string | null
          paid_at?: string | null
          created_at?: string | null
        }
      }
      donors: {
        Row: {
          id: string
          user_id: string
          name: string
          email: string | null
          phone: string | null
          total_donated: number | null
          donation_count: number | null
          last_donation_at: string | null
          mayar_customer_id: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          email?: string | null
          phone?: string | null
          total_donated?: number | null
          donation_count?: number | null
          last_donation_at?: string | null
          mayar_customer_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          email?: string | null
          phone?: string | null
          total_donated?: number | null
          donation_count?: number | null
          last_donation_at?: string | null
          mayar_customer_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
  }
}
