# QA, Testing and Release Checklist

## 1. Frontend smoke tests
- [ ] `index.html` loads without console errors.
- [ ] Header, footer and WhatsApp link render.
- [ ] All CSS and image paths resolve.
- [ ] Hash navigation works for every view.
- [ ] Browser back/forward navigation behaves correctly.
- [ ] Refreshing a supported hash route does not break the application.
- [ ] Search rejects identical origin/destination.
- [ ] Return date cannot precede outbound date.
- [ ] Trip selection leads to seat selection.
- [ ] Seat selection respects passenger count.
- [ ] Passenger form validates required fields.
- [ ] Booking summary totals match the displayed fare and selected seats.
- [ ] Demo payment and confirmation are clearly treated as demo-only.
- [ ] Customer account and booking history render.
- [ ] Charter request and booking lookup forms behave as expected.
- [ ] Admin route/fleet/feedback/charter controls work with demo data.
- [ ] CSV export opens correctly and safely handles formula-like values.
- [ ] Contact links and social links are correct.

## 2. Responsive/accessibility checks
- [ ] Test at narrow mobile, tablet and desktop widths.
- [ ] No horizontal overflow or clipped form controls.
- [ ] Keyboard navigation and visible focus indicators work.
- [ ] Inputs have accessible labels.
- [ ] Images have meaningful alternative text or are decorative.
- [ ] Colour contrast is sufficient.
- [ ] Reduced-motion preference is respected.
- [ ] Print styles are usable for any ticket/manifest view.

## 3. Backend acceptance tests
- [ ] Unauthenticated users cannot access customer/private data.
- [ ] Customers cannot read or modify another customer's booking.
- [ ] Non-admin users cannot access admin operations.
- [ ] Duplicate email registration is handled safely.
- [ ] Password reset tokens expire and are single-use.
- [ ] Concurrent requests cannot book the same seat.
- [ ] Server calculates fare and total independently.
- [ ] Expired holds release seats correctly.
- [ ] Invalid/forged payment webhook is rejected.
- [ ] Duplicate webhook does not duplicate booking/payment effects.
- [ ] Payment amount/currency mismatch is rejected and flagged.
- [ ] Cancellation follows the approved policy.
- [ ] API validation and error responses match the agreed contract.
- [ ] Rate limiting, CSRF/CORS and audit logging are verified.
- [ ] Backup restoration has been tested.

## 4. Release gates
Do not launch real bookings until:
- business data and policy wording are confirmed;
- backend and payment integration are deployed;
- production credentials are stored securely outside Git;
- HTTPS, backups, monitoring and error reporting are active;
- the full booking/payment/cancellation journey has passed staging tests;
- the business owner has approved the site content and acceptance test.

## 5. Test record
Record test date, environment, browser/device, tester, result, defect reference and retest result. Clearly distinguish automated checks from manual acceptance testing.
