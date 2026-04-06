import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Lazy-init: returns a working client when env vars are set, or a no-op stub
let _client: ReturnType<typeof createClient> | null = null;

export function getSupabase() {
  if (_client) return _client;
  if (supabaseUrl && supabaseAnonKey) {
    _client = createClient(supabaseUrl, supabaseAnonKey);
  }
  return _client;
}

// Convenience — pages should use getSupabase() instead of this directly
export const supabase = {
  from(table: string) {
    const client = getSupabase();
    if (!client) {
      // Return a stub that resolves to empty data
      return {
        insert: async () => ({ data: null, error: new Error("Supabase not configured") }),
        select: (...args: string[]) => ({
          eq: () => ({ data: [], error: null }),
          order: () => ({ data: [], error: null }),
          data: [],
          error: null,
        }),
        update: () => ({
          eq: async () => ({ data: null, error: null }),
        }),
      } as ReturnType<ReturnType<typeof createClient>["from"]>;
    }
    return client.from(table);
  },
};

export type Report = {
  id: string;
  created_at: string;
  category: string;
  description: string;
  location: string;
  city: string;
  state: string;
  time_of_day: string;
  plate_text: string | null; // internal only, never public
  media_url: string | null;
  status: "pending" | "approved" | "rejected";
  archetype_tag: string | null;
};

export const CATEGORIES = [
  "Tailgating",
  "Aggressive driving",
  "Unsafe lane change",
  "Distracted driving",
  "Speeding",
  "Parking like a maniac",
  "No turn signal",
  "Blocking traffic",
  "Road rage",
  "Other",
] as const;

export const STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
] as const;
