# JSR Electric Vehicles — Supabase Integration

## Current State
The website has multiple forms (Quote/Enquiry, Contact, Franchise, Test Ride Booking, EV Conversion) that currently only open WhatsApp with pre-filled messages. Phone OTP verification is a placeholder UI flow.

## Requested Changes (Diff)

### Add
- Supabase client configuration using URL `https://koyxdrjjgahogbfejbvv.supabase.co` and anon key `sb_publishable__Tugx1tY8JaYWcKRLUAdug_NxY00GOR`
- `src/frontend/src/lib/supabase.ts` — Supabase client singleton
- On every form submission, save lead data to Supabase `leads` table in addition to opening WhatsApp

### Modify
- QuoteModal.tsx — save to Supabase on submit
- ContactPage.tsx — save to Supabase on submit
- FranchisePage.tsx — save to Supabase on submit
- BookingCalendarPage.tsx — save to Supabase on submit
- ConversionsPage.tsx — save to Supabase on submit

### Remove
- Nothing

## Implementation Plan
1. Install `@supabase/supabase-js` in frontend package
2. Create `src/frontend/src/lib/supabase.ts` with client
3. Update each form to call `supabase.from('leads').insert(...)` on submit with fields: form_type, name, phone, email, vehicle_interest, message, created_at
4. Keep WhatsApp routing intact — Supabase save is additive
5. Handle errors silently (don't block WhatsApp if Supabase fails)

## Supabase Table Structure (user must create this in Supabase dashboard)
Table: `leads`
Columns: id (uuid, default gen_random_uuid()), created_at (timestamptz, default now()), form_type (text), name (text), phone (text), email (text), vehicle_interest (text), message (text), status (text, default 'new')
