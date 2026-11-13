# Merkava Transport & Logistics — Frontend Handover

A browser-based frontend for Merkava's Jos ⇄ Abuja passenger booking experience and vehicle charter requests. Built with plain HTML, CSS and classic JavaScript. There is no package manager, bundler or framework requirement.

> **Project status:** frontend/demo implementation. The current browser store, login, booking confirmation and payment flow are not production services. Do not accept real payments or treat browser-stored records as authoritative until a secure backend is implemented.

## 1. Run locally

1. Extract the project folder.
2. Open the `merkava-website` folder in Visual Studio Code.
3. Install/use the **Live Server** extension (recommended).
4. Right-click `index.html` and choose **Open with Live Server**.
5. Test the page at desktop and mobile widths.

The project uses classic `<script>` tags and a deliberate load order. It can also be opened directly as a file, but a local HTTP server is recommended for realistic browser testing.

## 2. Project structure

```text
merkava-website/
├── index.html                 # App shell, metadata, stylesheet and script order
├── _headers                   # Hosting response-header configuration (review before deploy)
├── .gitignore                 # Excludes local/editor/secrets and generated files
├── .env.example               # Backend placeholder variables; no real secrets
├── .prettierrc                # Formatting preferences
├── README.md                  # Project overview and quick start
├── CHANGELOG.md               # Change history and implementation notes
├── assets/
│   └── images/
│       ├── logo.png
│       ├── favicon.png
│       ├── fleet/             # Vehicle imagery used by the fleet cards
│       └── terminals/         # Add approved terminal photos here
├── css/
│   ├── tokens.css             # Brand colours, type and design tokens
│   ├── base.css               # Reset, typography and base form styles
│   ├── layout.css             # Header, navigation, page layout and footer
│   ├── components.css         # Reusable controls, cards and UI components
│   ├── sections.css           # Homepage and informational section styling
│   ├── booking.css            # Search, trip, seat and booking flow styling
│   └── responsive.css         # Mobile/tablet, reduced-motion and print rules
├── js/
│   ├── config.js              # Business details, content placeholders and asset paths
│   ├── utils.js               # Shared helpers
│   ├── store.js               # Browser-only demo data store (replace for production)
│   ├── components.js          # Shared navigation/footer/search UI
│   ├── app.js                 # Hash router and application bootstrap
│   ├── views/                 # Screen rendering functions
│   └── actions/               # Form submissions and interaction handlers
└── docs/
    ├── PROJECT-OVERVIEW.md
    ├── FRONTEND-GUIDE.md
    ├── BACKEND-INTEGRATION.md
    ├── DATA-MODEL.md
    ├── API-CONTRACT.md
    ├── SECURITY-REQUIREMENTS.md
    ├── QA-AND-RELEASE.md
    └── CLIENT-CONTENT-CHECKLIST.md
```

## 3. Important frontend files

| Change | File |
|---|---|
| Phone, WhatsApp, email, address and tagline | `js/config.js` |
| Brand colours and design tokens | `css/tokens.css` |
| Global typography and base controls | `css/base.css` |
| Header, navigation and footer | `js/components.js`, `css/layout.css` |
| Homepage content and sections | `js/views/home.js`, `css/sections.css` |
| Booking screens | `js/views/booking.js`, `css/booking.css` |
| Booking behaviour | `js/actions/booking.js` |
| Login/register/reset screens | `js/views/auth.js` |
| Demo authentication behaviour | `js/actions/auth.js` |
| Customer account screen | `js/views/account.js` |
| Admin interface and actions | `js/views/admin.js`, `js/actions/admin.js` |
| Charter and booking lookup | `js/views/charter.js`, `js/actions/charter.js` |
| About/terms content | `js/views/info.js` |
| Seed/demo data and local persistence | `js/store.js` |
| Page routing and rendering | `js/app.js` |

## 4. Script dependency order

`index.html` loads classic scripts in this order:

1. `config.js`
2. `utils.js`
3. `store.js`
4. `components.js`
5. view files
6. action files
7. `app.js`

This order is intentional because the application currently shares named functions and state through the browser's classic-script global scope. Do not reorder scripts or convert them to JavaScript modules without refactoring and testing the dependency model.

## 5. Current capabilities

The frontend currently presents these workflows:

- Public homepage, routes, fleet, service information and terms.
- Jos ⇄ Abuja scheduled trip search.
- Trip result selection and seat selection.
- Passenger details and booking summary.
- Demo booking confirmation/ticket.
- Customer registration, login, profile and booking dashboard.
- Booking lookup and cancellation interface.
- Vehicle charter request.
- Admin screens for routes, vehicles, bookings, charter requests and feedback.
- Customer feedback submission and admin moderation.
- Booking CSV export.
- WhatsApp contact links.

The current scheduled route seed is Jos → Abuja and Abuja → Jos. Other destinations are handled through the charter request flow. Confirm this operating rule with the business before production.

## 6. Demo limitations — read before launch

- `js/store.js` stores data in `localStorage`; each browser/device has its own separate data.
- The demo admin credentials and customer records are visible to anyone inspecting the frontend/browser storage.
- Passwords in the demo are not hashed.
- The payment action is simulated with a client-side delay. It does not contact a payment processor or verify a transaction.
- The seeded fares, departure times, vehicle passenger capacities and sample testimonials require client confirmation.
- Demo taken seats are generated locally. They do not represent real-time inventory.
- A client-side cancellation is not a real operator-side cancellation or refund.
- The browser's localStorage must not be used as the source of truth for real bookings, payments, user roles or seat inventory.

See `docs/SECURITY-REQUIREMENTS.md` and `docs/BACKEND-INTEGRATION.md`.

## 7. Backend handover

The backend technology has intentionally **not** been selected. The frontend handover therefore specifies technology-neutral entities, API behaviour, validation, security and integration expectations.

Start with:

1. `docs/PROJECT-OVERVIEW.md`
2. `docs/FRONTEND-GUIDE.md`
3. `docs/DATA-MODEL.md`
4. `docs/API-CONTRACT.md`
5. `docs/BACKEND-INTEGRATION.md`
6. `docs/SECURITY-REQUIREMENTS.md`

The backend developer can choose a server language/framework, database, hosting platform and payment provider, then implement the documented contract. The frontend should call a configured API base URL and must not contain private backend or payment credentials.

## 8. Client details still to confirm

Use `docs/CLIENT-CONTENT-CHECKLIST.md`. In particular, confirm real fares, departure times, journey duration, passenger capacities, plate numbers, terminal/pickup addresses, contact numbers, policies, testimonials and social links.

## 9. GitHub and deployment

- Initialise or connect this folder to the intended GitHub repository.
- Commit the source and documentation, but never commit real `.env` files, credentials, customer exports or production database dumps.
- Deploy the frontend to the selected static hosting platform only after reviewing `_headers`, asset paths, canonical URL and social preview metadata.
- The API must be deployed separately or through a chosen full-stack hosting architecture.
- Configure HTTPS, production environment variables, backups, monitoring and error reporting before accepting customers.

See `docs/QA-AND-RELEASE.md` for the release checklist.
