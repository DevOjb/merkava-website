# Merkava — Project Overview

## Purpose
The project is a customer-facing transport booking frontend for Merkava Transport & Logistics. The supplied implementation is a single-page application (SPA) hosted from `index.html`; hash fragments select views and JavaScript renders the relevant screen into `#app`.

The current business flow is centred on scheduled inter-city trips between Jos and Abuja, with a charter enquiry for other destinations. Confirm this with the business owner before the backend is finalised.

## Reference and implementation approach
The Ohio Multi-Solution source was used as a code-quality and handover reference for:
- readable semantic HTML and explicit document metadata;
- clear CSS responsibilities and centralised design tokens;
- meaningful file naming and separation of concerns;
- comments that explain responsibilities and maintenance points;
- explicit security limitations and pre-launch checklists;
- deployment and maintenance documentation.

Merkava already had a modular structure (separate CSS layers, view files and action files). That structure has been retained rather than forcing it into Ohio's different multi-page architecture. The intent is to improve maintainability without replacing the Merkava UI or changing its established workflows.

## Runtime architecture
- `index.html` is the single document shell.
- `js/app.js` owns hash routing, view selection and DOM rendering.
- `js/views/` creates screen markup.
- `js/actions/` handles user interactions and form workflows.
- `js/components.js` supplies shared navigation, footer and search components.
- `js/config.js` holds public business configuration and asset paths.
- `js/store.js` currently supplies demo data and browser persistence.
- `css/` is layered by tokens, base rules, layout, components, page sections, booking UI and responsive behaviour.

## Current state vs target state

| Area | Current frontend/demo | Production target |
|---|---|---|
| User accounts | Browser-side demo records | Secure backend/provider identity |
| Sessions | Session storage identifier | Secure server-managed session or token strategy |
| Routes/fleet | Seed data and local admin edits | Persistent backend records with role checks |
| Seat availability | Browser-derived demo occupancy | Atomic server-side inventory/locking |
| Bookings | Local browser records | Authoritative booking records |
| Payment | Simulated delay | Provider checkout + verified server notification |
| Tickets | Frontend confirmation view | Server-issued reference and verifiable ticket |
| Charter | Local request record | Persisted enquiry and staff workflow |
| Feedback | Local records | Server persistence, moderation and spam controls |
| Admin | Client-side role check | Server-side authorization on every privileged request |

## Non-goals
This handover does not select a backend framework, database, payment provider, hosting vendor or final commercial policy. It does not claim the demo is production-secure. Those decisions require the client and backend developer.
