# Backend Integration Guide (Technology-Neutral)

## 1. Objective
Replace the browser-only demo data layer with a secure server-side application while preserving the customer-facing Merkava experience.

No backend stack has been selected. The contract below can be implemented with any suitable server framework and relational or document database, provided the required consistency, security and API behaviour are met.

## 2. Required backend responsibilities
The backend is the authoritative source for:
- user identity, authentication and account recovery;
- roles and permissions;
- route, schedule and vehicle data;
- seat availability and temporary seat holds;
- booking creation, confirmation and cancellation;
- payment initiation, provider callbacks/webhooks and reconciliation;
- charter enquiries;
- feedback moderation;
- admin operations and audit records;
- referral attribution and reporting.

The browser must not decide that a payment succeeded, a seat is available, a user is an administrator or a cancellation is valid.

## 3. Suggested implementation sequence
1. Confirm business rules and client content.
2. Agree the API contract and error format with the frontend developer.
3. Select server framework, database, hosting and payment provider.
4. Implement authentication and role/permission middleware.
5. Implement routes, vehicles, schedules and seat inventory.
6. Implement booking creation with atomic seat allocation/locking.
7. Integrate payment provider and verified webhook processing.
8. Implement customer dashboard, cancellation policy and ticket verification.
9. Implement charter, feedback and admin workflows.
10. Add logging, backups, monitoring, rate limits and security tests.
11. Connect the frontend API adapter and run end-to-end acceptance tests.

## 4. Integration boundary
Recommended logical layers (names are conceptual, not framework requirements):
- **HTTP/API layer:** routes, request parsing, response formatting and versioning.
- **Authentication/authorization:** session or token validation and role checks.
- **Application/services:** booking, inventory, payment, charter and feedback workflows.
- **Persistence:** database access and transaction handling.
- **External adapters:** payment provider, email/SMS, maps or notification services.

Keep payment-provider and database-specific code behind server-side adapters. Do not expose provider secret keys to the browser.

## 5. Critical booking consistency
Seat selection in the browser is advisory only. The server must re-check availability when a booking is initiated. Seat allocation must be atomic so two customers cannot successfully purchase the same seat.

Recommended lifecycle:
1. Customer requests trips for route/date/passenger count.
2. Server returns departures and current availability.
3. Customer selects a departure and seats.
4. Server validates the selected seats and creates a short-lived hold, if the business chooses to use holds.
5. Server creates a pending booking/payment attempt and returns a payment session or hosted checkout URL.
6. Payment provider processes the payment.
7. Server verifies the provider notification/webhook signature and transaction status directly with the provider where supported.
8. Server idempotently confirms the booking and marks seats sold only after verified payment.
9. Server issues a booking reference/ticket and sends customer notification.
10. Expired or failed holds are released safely.

A browser redirect to a “success” page is not proof of payment. Webhook handling must be idempotent and reconcile duplicate/out-of-order notifications.

## 6. Authentication
Use a reputable identity provider or implement server-side authentication with secure password hashing, secure session handling, account recovery and rate limiting. Do not copy the demo's `pw` property or localStorage-based login into production.

Admin access must be assigned through a trusted server-side process, not a public registration field or client-side role flag.

## 7. Payment integration
Select a payment provider with the client. Support:
- server-created payment intent/checkout session;
- amount and currency calculated on the server;
- unique transaction reference;
- verified provider webhook/callback;
- idempotency and transaction reconciliation;
- pending, successful, failed, expired and refunded/reversed states;
- secure storage of provider references, not card data.

Never collect or store raw card details in the Merkava application unless the organisation is specifically authorised and equipped to do so. Prefer provider-hosted checkout or tokenised payment components.

## 8. Environment and deployment
- Keep environment-specific configuration outside version control.
- Use separate development, staging and production environments.
- Use HTTPS for all customer and API traffic.
- Configure CORS narrowly for approved frontend origins.
- Keep database credentials and payment secrets in the hosting platform's secret manager.
- Back up the database and test restoration.
- Monitor API errors, payment reconciliation and booking anomalies.

See `API-CONTRACT.md`, `DATA-MODEL.md` and `SECURITY-REQUIREMENTS.md`.
