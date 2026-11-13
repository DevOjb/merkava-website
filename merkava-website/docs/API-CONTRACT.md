# Proposed API Contract (Technology-Neutral)

This is a proposed versioned REST-style contract to align frontend and backend work. It is not an existing live API. The backend developer may adjust naming and transport conventions, but must preserve equivalent behaviour and communicate changes before the frontend is connected.

## 1. Conventions
- Base path: `/api/v1`
- Request/response format: JSON, UTF-8.
- Dates: ISO 8601 calendar dates (`YYYY-MM-DD`); timestamps in UTC ISO 8601.
- Times: local departure time with an explicitly documented service timezone.
- Money: integer minor units or decimal strings with explicit currency; never use ambiguous floating-point arithmetic for financial totals.
- IDs: opaque strings; clients must not assume numeric IDs.
- Pagination: cursor or page-based; document limits.
- All errors use the common error structure below.
- Authentication: secure cookie session or a documented token strategy; never trust user IDs/roles sent by the browser.

## 2. Common response envelope

Success example:
```json
{
  "data": {},
  "meta": {
    "request_id": "opaque-request-id"
  }
}
```

Error example:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please correct the highlighted fields.",
    "fields": {
      "email": "Enter a valid email address."
    },
    "request_id": "opaque-request-id"
  }
}
```

Use appropriate HTTP status codes: `200` read/update success, `201` creation, `202` asynchronous processing, `204` successful no-content operation, `400` malformed request, `401` unauthenticated, `403` forbidden, `404` not found, `409` inventory/state conflict, `422` validation failure, `429` rate limited, `500` unexpected server error.

## 3. Public trip discovery

### `GET /routes`
Returns active routes available for search.

### `GET /departures`
Query parameters:
- `origin`
- `destination`
- `date`
- `passengers` (positive integer)

Response data should include each departure's ID, route, date/time, estimated duration, fare/currency, vehicle display details, capacity and current available-seat count. Do not expose passenger records or internal admin data.

### `GET /departures/{departureId}/seats`
Returns seat numbers and availability state. Availability is advisory and may change before checkout.

## 4. Authentication and profile

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `POST /auth/password/forgot`
- `POST /auth/password/reset`
- `GET /me`
- `PATCH /me`

Registration accepts name, email, phone and password (or identity-provider handoff). Referral code may be optional if programme confirmed. Role must not be accepted from public registration input.

Password recovery must use a short-lived, single-use token delivered through a verified channel. Do not reveal whether an email address exists in a way that enables account enumeration.

## 5. Booking lifecycle

### `POST /booking-holds` (if temporary holds are adopted)
Request:
```json
{
  "departure_id": "departure-id",
  "seat_numbers": [1, 2],
  "passengers": [
    {"full_name": "Passenger One", "phone": "08000000000"},
    {"full_name": "Passenger Two", "phone": "08000000001"}
  ],
  "contact_email": "customer@example.com"
}
```
Response should include a hold ID, expiry timestamp, authoritative fare breakdown and next action. Server must atomically verify all requested seats.

### `POST /bookings`
Creates a booking or a payment-pending booking after server-side validation. If a hold endpoint is used, the request must reference a valid hold. The server calculates the total; never trust a browser-supplied total.

### `GET /bookings/{bookingId}`
Authenticated owner or authorised staff only.

### `GET /me/bookings`
Returns the authenticated customer's booking history.

### `POST /bookings/{bookingId}/cancel`
Server checks ownership, booking state, departure time and the current approved cancellation policy. Return the resulting status and any refund workflow details. Do not assume cancellation automatically means refund.

### `GET /booking-lookup`
If the business requires public reference lookup, use a sufficiently strong reference plus a second verification factor and rate limiting. Do not expose a booking using a guessable reference alone.

## 6. Payments

- `POST /payments/checkout` — server creates a provider checkout session for a valid pending booking.
- `GET /payments/{paymentId}` — authenticated customer/staff reads payment status.
- `POST /webhooks/{provider}` — server-only provider notification endpoint.

Webhook signature verification, amount/currency comparison, idempotency and final booking confirmation are mandatory. The browser must not be able to mark a payment as successful.

## 7. Charter requests and feedback

- `POST /charter-requests`
- `GET /me/charter-requests` (if customers need history)
- `POST /feedback`
- `GET /feedback/public` — approved feedback only

Apply validation, spam controls and rate limits. Admin moderation endpoints must require an appropriate permission.

## 8. Admin endpoints

Suggested operations:
- `GET/POST/PATCH/DELETE /admin/routes`
- `GET/POST/PATCH /admin/vehicles`
- `GET/POST/PATCH /admin/departures`
- `GET /admin/bookings`
- `GET /admin/charter-requests`
- `PATCH /admin/charter-requests/{id}`
- `GET /admin/feedback`
- `PATCH /admin/feedback/{id}`
- `GET /admin/reports/bookings.csv`

All admin endpoints require server-side authorization, input validation and audit logging. Restrict CSV export to authorised staff and avoid formula injection in spreadsheet exports.

## 9. Frontend integration expectations
- Configure one API base URL per environment.
- Centralise HTTP calls in an API adapter.
- Handle `401` by prompting for login or refreshing the session according to the agreed strategy.
- Handle `409` seat conflicts by refreshing availability and asking the customer to reselect.
- Display safe validation messages from `422` responses.
- Show pending payment states while waiting for verified status.
- Do not put private credentials, provider secrets or privileged admin tokens in JavaScript.
