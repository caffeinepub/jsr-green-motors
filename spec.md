# JSR Green Motors

## Current State
New project — no existing code.

## Requested Changes (Diff)

### Add
- Full professional multi-page website for JSR Green Motors, an EV dealership and service company in Andhra Pradesh, India
- Sticky header/navigation: Home, About, Vehicles, Services, Franchise, Conversions, Blog, Contact + "Get a Quote" CTA button
- **Home page**: Hero section (headline, subheadline, two CTAs), services icon overview (4 columns), featured vehicles carousel, Why Choose Us (4 benefits), conversion promo strip, franchise partner strip, contact strip, footer
- **About page**: Mission statement, company history, team member cards, vision section
- **Vehicles page**: Filter bar (type, price, range, battery, brand), vehicle grid with cards (image, specs, price, View Details / Get Quote buttons), vehicle detail modal/page with full specs, gallery, EMI calculator, inquiry form
- **Services page**: Service offerings (EV servicing, battery check, accessories), pricing cards, appointment booking form with date/time picker
- **Conversions page**: Petrol-to-electric conversion showcase, before/after visuals, process steps, benefits, pricing tiers, FAQs, "Start Conversion" CTA
- **Franchise page**: Network benefits, franchise info, Apply for Franchise form
- **Blog page**: Article grid with SEO-friendly headings, tags, read-more links; 4–6 sample blog posts about EV tech, regulations, incentives
- **Contact page**: Contact form (name, email, phone, message), business address, hours of operation, embedded map placeholder
- **WhatsApp floating chat button** (bottom-right, persistent)
- **Newsletter signup** in footer
- Social media icons (Facebook, Instagram, YouTube) in footer
- SEO meta tags per page (title, description, schema markup)
- Responsive for mobile and desktop
- Backend: store contact form submissions, quote requests, appointment bookings, franchise applications, newsletter subscriptions, vehicle enquiries

### Modify
- None

### Remove
- None

## Implementation Plan
1. Write spec.md (this file) and rename project
2. Generate brand assets: JSR logo, hero EV image, vehicle images, team photos
3. Select Caffeine components (none required beyond base)
4. Generate Motoko backend with data types and CRUD for: contacts, quotes, appointments, franchiseApplications, newsletterSubscribers, vehicleEnquiries, blogPosts, vehicles
5. Build frontend:
   - App shell with React Router, sticky nav, WhatsApp FAB, footer
   - Home page with all sections
   - About, Vehicles (with filters + detail view), Services (with booking), Conversions, Franchise, Blog, Contact pages
   - Responsive layout, green/black/white theme, modern EV-brand aesthetic
6. Deploy
