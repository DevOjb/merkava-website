# Security Requirements and Launch Risks

## 1. Current frontend is a demo
The existing site is static browser code. Anything delivered to the browser can be inspected or modified by a visitor. Browser storage, hidden buttons, client-side role checks and JavaScript validation do not provide security.

The current demo includes browser-side user records, a demo admin account, localStorage persistence, a simulated payment delay and local booking/seat state. These are development conveniences only. Remove demo credentials and do not migrate raw demo passwords into production.

## 2. Minimum production controls

### Identity and access
- Hash passwords using a modern password-hashing algorithm through a trusted library/provider.
- Use secure, HttpOnly, SameSite cookies for sessions where applicable; if tokens are used, define safe storage, rotation, expiry and revocation.
- Enforce role/permission checks on the server for every protected resource and mutation.
- Require strong admin credentials and multi-factor authentication where supported.
- Rate-limit login, password reset, booking lookup and sensitive endpoints.

### Input and output
- Validate all input on the server, including type, length, range, format and business rules.
- Use parameterised database operations or an equivalent safe data-access mechanism.
- Encode untrusted content before rendering it into HTML.
- Protect state-changing requests against CSRF when cookie authentication is used.
- Apply a restrictive Content Security Policy appropriate to the final integrations.

### Booking and payment
- Re-check inventory on the server and allocate seats atomically.
- Calculate all prices on the server.
- Verify payment events using provider signatures and server-to-server verification.
- Make webhook processing idempotent.
- Never trust a payment success query parameter or client-side callback alone.
- Keep payment secrets only in server-side environment/secret storage.
- Do not store raw card data.

### Data and operations
- Use HTTPS end-to-end.
- Restrict CORS to known frontend origins.
- Encrypt sensitive data in transit and protect it at rest where appropriate.
- Back up data and test restore procedures.
- Log security-relevant events without logging passwords, tokens, card data or unnecessary personal information.
- Patch server dependencies and operating systems.
- Define data retention, privacy notice, customer access and deletion processes.
- Monitor failed logins, unusual booking patterns, payment discrepancies and API errors.

## 3. Hosting headers
The root `_headers` file is a hosting-platform configuration, not a universal server configuration. Review it against the actual deployment platform and all external integrations before release. A restrictive Content Security Policy may block fonts, images, analytics, forms or payment widgets until explicitly configured. Security headers are defence-in-depth, not a substitute for secure backend implementation.

## 4. Demo-to-production removal list
- Remove demo admin credentials and seeded raw passwords.
- Disable all simulated payment and confirmation paths.
- Remove fake taken seats and local-only inventory.
- Replace localStorage persistence with the backend API.
- Replace client-side role checks with server-side authorization.
- Review public booking lookup and customer privacy.
- Replace sample testimonials and placeholder business terms.
- Verify cancellation/refund policy wording with the business and legal adviser.
