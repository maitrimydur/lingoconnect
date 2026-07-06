import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const isValidUrl = /^https?:\/\//.test(supabaseUrl ?? '')

if (!isValidUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase env vars are missing or invalid. Copy .env.example to .env and fill in your project URL and anon key. Auth and progress sync will not work until then.'
  )
}

// Fall back to a syntactically valid placeholder so createClient doesn't throw
// and crash the whole app before real credentials are configured.
export const supabase = createClient(
  isValidUrl ? supabaseUrl : 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
)
