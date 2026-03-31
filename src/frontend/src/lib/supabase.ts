import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://koyxdrjjgahogbfejbvv.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable__Tugx1tY8JaYWcKRLUAdug_NxY00GOR";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface Lead {
  form_type: "quote" | "contact" | "franchise" | "booking" | "conversion";
  name: string;
  phone: string;
  email?: string;
  vehicle_interest?: string;
  message?: string;
  status?: string;
}

export async function saveLead(lead: Lead): Promise<void> {
  try {
    const { error } = await supabase.from("leads").insert([
      {
        ...lead,
        status: lead.status ?? "new",
        created_at: new Date().toISOString(),
      },
    ]);
    if (error) {
      console.error("Supabase lead save error:", error.message);
    }
  } catch (err) {
    console.error("Supabase connection error:", err);
  }
}
