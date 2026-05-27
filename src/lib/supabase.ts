import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Product = {
  id: string
  handle: string
  name: string
  category: string
  price: number
  stock: number
  discontinued: boolean   // true = ยกเลิกจำหน่าย
  image_url: string
  description: string
  created_at: string
  updated_at: string
}
