# Conceptual Data Model

This document describes the business entities implied by the current frontend. It is a logical model, not a database-specific schema. The backend developer should choose physical tables/collections, indexes, constraints and migrations based on the selected technology.

## 1. Core entities

### User
- `id` — unique internal identifier
- `full_name`
- `email` — unique, normalised
- `phone`
- `password_hash` or external identity reference (never plaintext password)
- `role` — customer/admin or a more granular permission model
- `referral_code` — unique code, if referral programme remains active
- `referred_by_user_id` — optional relationship
- `status` — active, suspended, pending, etc.
- `created_at`, `updated_at`, `last_login_at`

### Vehicle
- `id`
- `name`, `type`
- `registration_number` — confirm business terminology
- `passenger_capacity` — exclude driver if that is the client's rule
- `image_asset` — optional frontend asset key/URL
- `status` — active, maintenance, retired
- `created_at`, `updated_at`

### Route
- `id`
- `origin`, `destination`
- `duration_estimate`
- `status`
- `created_at`, `updated_at`

### Departure / Schedule
A departure is a specific scheduled instance of a route, not merely a reusable time string.
- `id`, `route_id`, `vehicle_id`
- `departure_date`, `departure_time`
- `fare_amount`, `currency`
- `status` — scheduled, boarding, departed, cancelled, completed
- `created_at`, `updated_at`

### Seat / Inventory
- `id`, `departure_id`, `seat_number`
- `status` — available, held, booked, blocked
- `hold_expires_at` — nullable
- `booking_id` — nullable until booked
- Unique constraint on `(departure_id, seat_number)`

For high-concurrency bookings, seat availability and assignment must be protected with database transactions, row/document locking or an equivalent atomic mechanism.

### Booking
- `id`, `booking_reference`
- `user_id`
- `departure_id`
- `status` — pending_payment, confirmed, cancelled, expired, failed
- `passenger_count`
- `subtotal`, `fees`, `total_amount`, `currency`
- `contact_email`, `contact_phone`
- `created_at`, `updated_at`, `cancelled_at`

### Booking Passenger
- `id`, `booking_id`
- `full_name`, `phone`
- `seat_number`
- Additional passenger information only where operationally necessary.

### Payment
- `id`, `booking_id`
- `provider`, `provider_transaction_reference`
- `amount`, `currency`
- `status` — initiated, pending, successful, failed, refunded, reversed
- `verified_at`, `created_at`, `updated_at`
- Store only safe provider metadata; do not store card numbers or security codes.

### Charter Request
- `id`, `request_reference`
- `customer_name`, `phone`, `email`
- `origin`, `destination`, `requested_date`, `requested_time`
- `passenger_count`, `vehicle_preference`, `notes`
- `status` — new, contacted, quoted, accepted, declined, closed
- `assigned_staff_id` (optional)
- `created_at`, `updated_at`

### Feedback
- `id`, `user_id` (nullable if guest feedback is allowed)
- `customer_name`, `comment`, `rating`
- `booking_reference` (optional)
- `moderation_status` — pending, approved, rejected
- `moderated_by`, `moderated_at`
- `created_at`

### Audit Event
- `id`, `actor_user_id`, `action`, `entity_type`, `entity_id`
- `metadata` (redacted; no secrets)
- `ip_address` where legally appropriate
- `created_at`

## 2. Relationships
- One route has many departures.
- A departure uses one vehicle.
- A departure has many seat inventory records.
- A user can have many bookings.
- A booking belongs to one user and one departure.
- A booking has one or more passenger records.
- A booking may have one or more payment attempts.
- A user may refer other users if referrals remain a confirmed feature.
- Charter requests and feedback may be linked to a user or captured as guest submissions.

## 3. Business rules requiring confirmation
- Jos ⇄ Abuja scheduled service only, or additional scheduled routes?
- Actual vehicle capacities and seat numbering convention.
- Whether seat holds are required and their expiry duration.
- Fare calculation, currency, taxes/fees and price-change rules.
- Whether round trips are one linked booking or two separate bookings.
- Cancellation cut-off, fees, refund eligibility and processing.
- Whether booking lookup is public or login-only.
- Passenger identity/document requirements and data retention.
- Referral reward rules and eligibility.
- Whether feedback must be tied to a completed booking.

## 4. Data protection
Collect the minimum personal information required to operate the service. Define retention periods, deletion/export processes, access restrictions and audit requirements before production.
