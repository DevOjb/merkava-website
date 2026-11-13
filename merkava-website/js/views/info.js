/**
 * INFORMATION VIEWS
 * Public informational content such as About/Services and Terms & Conditions.
 * Confirm business, legal and policy wording with the client before launch.
 */
/* About & services, and Terms pages. Wording is a draft: confirm it with the client before launch. */
V.about = function () {
  const cards = [
    ["Scheduled trips", "Fixed daily departures between Jos and Abuja, both ways. Pick your date, vehicle and exact seat online."],
    ["Vehicle charter", "Travelling elsewhere, or want a vehicle just for your group? Send a charter request and we confirm the price and details."],
    ["Customer support", `Reach us on <a href="tel:${TEL}">${TEL}</a>, on WhatsApp, or at <a href="mailto:${MAIL}">${MAIL}</a>.`],
    ["Head office", E(ADDR)],
  ];
  return `<div class="pg"><div class="eb">About us</div><h1>Merkava Transport &amp; Logistics</h1><p class="lead">${TAGLINE}</p>
<p class="mu" style="font-size:16px">Merkava runs safe, comfortable and affordable inter-city travel between Jos and Abuja, with online seat selection and WhatsApp support from a real team.</p>
<div class="g2" style="margin-top:24px">${cards.map((c) => `<div class="card"><h3>${c[0]}</h3><p class="mu" style="margin:0">${c[1]}</p></div>`).join("")}</div>
<div class="cta"><a class="btn" href="#home">Book a trip</a><a class="btn o" href="#charter">Request a charter</a></div></div>`;
};
V.terms = function () {
  const T = [
    ["Bookings and payment", "A booking is confirmed once payment is complete. You receive a booking reference. Keep it: you need it, with your phone number, to find or manage your booking."],
    ["No refund policy", "Per Merkava policy there is no refund of money after payment. If there is a problem with your booking, contact us and we will do our best to help."],
    ["Cancellations", "You can cancel a booking from your account or the Manage booking page. Cancelling frees your seat but does not entitle you to a refund."],
    ["Passenger details", "Please give correct names and phone numbers for every passenger so we can reach you about your trip."],
    ["Charter requests", "A charter request is not a confirmed booking. Price, vehicle and pickup details are agreed with our team before the trip."],
    ["Contact", `Questions about these terms? Call <a href="tel:${TEL}">${TEL}</a> or email <a href="mailto:${MAIL}">${MAIL}</a>.`],
  ];
  return `<div class="pg"><div class="eb">Legal</div><h1>Terms &amp; conditions</h1><p class="mu">Last updated November 2026</p>${T.map(
    (t) => `<h3 style="margin-top:22px">${t[0]}</h3><p class="mu" style="font-size:16px;margin:0">${t[1]}</p>`,
  ).join("")}</div>`;
};
V.feedback = function () {
  if (S.fbDone)
    return `<div class="pg"><div class="card" style="text-align:center;padding:40px"><div style="font-size:48px">🙏</div><h1>Thank you!</h1><p class="mu">Your feedback helps us improve every journey.</p><a class="btn" href="#home">Back home</a></div></div>`;
  return `<div class="pg" style="max-width:640px"><div class="eb">Feedback</div><h1>How was your trip?</h1><p class="lead">Tell us about your journey with Merkava.</p><form class="card" style="margin-top:20px" onsubmit="return sendFb(event)"><div class="fg" style="margin-bottom:14px"><div><label>Your name</label><input id="fn" required value="${E(me()?.name || "")}"></div><div><label>Rating</label><select id="fr">${[5, 4, 3, 2, 1].map((n) => `<option value="${n}">${"★".repeat(n)} (${n})</option>`).join("")}</select></div><div><label>Booking reference (optional)</label><input id="fx" placeholder="MK-XXXXXX"></div></div><label>Your comment</label><textarea id="ft" required maxlength="400"></textarea><br><br><button class="btn">Send feedback</button></form></div>`;
};
