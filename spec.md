# JSR Electric Vehicles

## Current State
Full-stack EV dealership website with: Home, About, Vehicles (grid + detail), Services, Conversions, Franchise, Blog, Contact pages. Backend has 6 generic placeholder vehicles seeded. No brand filter on Vehicles page. No real vehicle data. No comparison feature. No booking calendar.

## Requested Changes (Diff)

### Add
- Real vehicle data from 7 brands in backend seed: Dynamo India (Lima, Flyer, RX1), OPG/Okaya (FAAST F4, FAAST F3, FAAST F2T, FAAST F2B, FAAST F2F, MOTOFAAST, DEFY 22, FREEDUM LI, FREEDUM LA), Batt:RE (One, EPIC, Loev, Storie, Loev+), Revolt Motors (RV1, RV400), Kinetic Green (E-Luna X3 Prime, E-Luna X2, E-Luna X3, Zoom, E-Zulu, Zing), Goeen (Chalo 1000 V2, Chalo Smart Pro, Chalo Smart Plus, Chalo Smart Eco, NJA-7), iVOOMi (ZeetX ZE, S1 Lite, Eco+)
- Brand filter on Vehicles page alongside existing category filter (All + 7 brand buttons)
- New /compare page: select any 2 vehicles from any brands side-by-side spec table
- New /booking page: real-time calendar showing available test drive slots; user picks date+time, submits name/phone
- Compare button on each vehicle card
- Navigation links for Compare and Book Test Drive in Navbar

### Modify
- backend/main.mo seedData(): replace 6 generic vehicles with 25+ real brand vehicles across all 7 brands
- VehiclesPage.tsx: add brand filter row below category filter; add "Compare" button per card
- App.tsx: add /compare and /booking routes
- helpers.ts: expand getVehicleImage() to return brand-specific images (using existing generated assets with fallback)
- Navbar.tsx: add Compare and Book Test Drive links

### Remove
- Nothing removed from existing structure

## Implementation Plan
1. Update backend/main.mo seed data with 25+ real vehicles from 7 brands (Dynamo, OPG, Battre, Revolt, Kinetic Green, Goeen, iVOOMi)
2. Update helpers.ts getVehicleImage() with brand-aware image mapping
3. Update VehiclesPage.tsx with brand filter + compare selection UI
4. Create ComparisonPage.tsx with 2-vehicle selector and side-by-side spec table
5. Create BookingCalendarPage.tsx with interactive calendar, time slots, and booking form wired to addAppointmentBooking backend
6. Update App.tsx with new routes
7. Update Navbar.tsx with new nav links
8. Validate build
