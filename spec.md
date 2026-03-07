# JSR Green Motors — High-Conversion Platform Upgrade

## Current State

A fully functional 10-page EV dealership website exists with:
- Sticky navbar with logo (using generated logo), Get a Quote modal
- Homepage: hero, services overview, featured vehicles, Why Choose Us, conversion promo, franchise strip, contact strip
- Vehicles page with filters, vehicle cards, detail pages with EMI calculator
- Services page with appointment booking form
- Conversions page with 4-step process, pricing tiers, FAQ
- Franchise page with benefits, 3-step join process, application form
- Blog page with articles and detail pages
- Contact page with form and business info
- Footer with newsletter, quick links, contact info
- WhatsApp floating button
- Backend: vehicles, blog posts, contacts, franchise applications, appointments, newsletter, quotes, vehicle enquiries

**Problems to fix:**
- Contact details are still placeholder: phone "+91-XXXXXXXXXX", email "info@jsrgreenmotors.com", address generic
- Logo in navbar/footer still uses generated placeholder, not the uploaded JSR_LOGO-2.png
- Homepage lacks lead capture form, trust strip, 3 primary CTAs, brand authority block, testimonials, FAQ section, showroom gallery, mobile sticky action bar
- Conversion page lacks cost comparison table, specific conversion inquiry form with petrol expense field, updated headline, trust badges
- Franchise page lacks investment estimate block, "Why EV Business Now" section, "Support You Receive" detailed section
- Footer lacks GST/business info block
- No mobile sticky bottom action bar
- No conversion-specific inquiry form stored in backend
- No lead capture (callback request) form stored in backend
- No location-focused SEO pages (Kodad, Suryapet)

## Requested Changes (Diff)

### Add
- **Real contact details** throughout: phone +91 9948955517, email jsrgreenmotors5399@gmail.com, Head Branch: Suryapet road, beside Kashinadam function hall, Kodad, Suryapet dist, Telangana-508206
- **Logo**: Replace generated logo with uploaded `/assets/uploads/JSR_LOGO-2.png` in navbar and footer; use `/assets/uploads/JSR-SEAL-1-1.png` as circular seal where appropriate
- **Homepage hero upgrade**: New headline "Complete Electric Mobility Solutions — Sales, Service & EV Conversion Under One Roof", new subheadline, 3 CTAs (Book Free Test Ride / Get Best Price / Convert to Electric), trust strip (20+ Dealer Network / Certified EV Technicians / Dedicated Service Support)
- **Lead capture form** on homepage (above fold, side panel): Name, Phone, City, Interested In dropdown (Buy EV / Convert Vehicle / Franchise / Service), "Request Callback in 10 Minutes" button, urgency text "Our EV Expert Will Call You Shortly"
- **Mobile sticky bottom action bar**: Call Now / WhatsApp / Book Test Ride (3 large buttons, thumb-friendly, visible only on mobile)
- **Homepage brand authority block**: "Why JSR Green Motors? We Are Not Just a Dealer. We Are Electric Mobility Specialists." with 4 points
- **Homepage testimonials section**: 3 customer testimonials (sample placeholders)
- **Homepage FAQ section**: 5–6 common EV questions with accordion
- **Homepage showroom gallery**: using uploaded showroom images (Gemini_Generated_Image and ChatGPT-Image showroom photos)
- **Homepage latest blogs section**: link to top 3 blog articles
- **Vehicle cards**: Range highlight badge, price badge, "Best for City"/"Best for Delivery" tag, dual buttons (View Details / Get Best Price)
- **Vehicle detail page**: Running cost comparison (Petrol vs EV monthly savings), model-specific FAQ, trust message "Delivered with Full Documentation & Service Support"
- **Conversion page upgrade**: New hero headline, cost comparison table (Petrol vs Electric monthly cost), before/after visual section, 5-step horizontal process timeline (Inspection → Quotation → Installation → Testing → Delivery), dedicated Conversion Inquiry Form (Name, Phone, Bike Model, Location, Approx Monthly Petrol Expense), trust badges (Warranty Supported / Certified Components / Local Installation)
- **Franchise page upgrade**: New headline "Start Your Own Electric Vehicle Business With JSR Green Motors", "Why EV Business Now?" section, "Support You Receive" section (Setup Assistance / Technical Training / Branding Support / Supply Chain Support), investment estimate block "Investment Starting From ₹5 Lakhs"
- **Footer GST/business info block**: Company Name, GST Number (placeholder), Registered Address, Phone, Email
- **Contact page**: Real address for Head Branch + note about Branch 2 (Haliya), embedded Google Maps iframe for Kodad location, serving areas section, 3 local landmarks
- **SEO meta tags**: Updated page titles and descriptions for all pages, H1/H2 hierarchy, alt text
- **Backend**: Add `addConversionInquiry` method (name, phone, bike_model, location, petrol_expense) and `addCallbackRequest` method (name, phone, city, interest)

### Modify
- Navbar logo: switch from `/assets/generated/jsr-logo-transparent.dim_300x100.png` to `/assets/uploads/JSR_LOGO-2.png`
- Footer logo: same switch
- Contact strip phone: +91 9948955517
- Contact strip email: jsrgreenmotors5399@gmail.com
- Homepage hero: replace existing headline/subheadline/CTAs with new copy
- Conversion page hero headline and process steps (4 → 5 steps)
- WhatsApp button pre-filled message to use real number +91 9948955517
- All "Book a Test Ride" CTAs link to the lead capture form or contact page

### Remove
- Placeholder phone "+91-XXXXXXXXXX" everywhere
- Placeholder email "info@jsrgreenmotors.com" everywhere

## Implementation Plan

1. Update backend Motoko to add `addConversionInquiry` and `addCallbackRequest` methods
2. Update Navbar to use real logo `/assets/uploads/JSR_LOGO-2.png`
3. Update Footer to use real logo, real contact details, add GST/business info block
4. Upgrade HomePage: hero copy, 3 CTAs, trust strip, lead capture form panel, brand authority block, testimonials, FAQ accordion, showroom gallery, latest blogs, mobile sticky bar
5. Upgrade VehiclesPage: vehicle cards with range badge, price badge, use/delivery tag, dual CTA buttons
6. Upgrade VehicleDetailPage: running cost comparison table, model FAQ, trust message
7. Upgrade ConversionsPage: new headline, cost comparison table, before/after section, 5-step timeline, conversion inquiry form, trust badges
8. Upgrade FranchisePage: new headline, Why EV Business Now section, support breakdown, investment estimate
9. Upgrade ContactPage: real addresses, Google Maps embed placeholder, serving areas, business hours
10. Update WhatsApp button with real phone number
11. Update all page meta titles and SEO content
