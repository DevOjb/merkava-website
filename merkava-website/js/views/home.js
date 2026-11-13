/**
 * HOME VIEW
 * Homepage sections: trip search, routes, fleet, service benefits, terminals,
 * charter call-to-action, testimonials and frequently asked questions.
 * Rendering only: interactive actions are defined in /js/actions.
 */
/* Landing page */
V.home = function () {
  const R = DB.routes.slice(0, 2);
  const c1 = DB.vehicles[0] || {},
    c2 = DB.vehicles[1] || c1;
  const real = (DB.feedback || []).filter((f) => f.status == "approved").slice(-3).reverse().map((f) => [f.name, f.text, f.rating]);
  const TS = real.length ? real : SAMPLE_TESTIMONIALS;
  const price = R.length ? M(Math.min(...R.map((r) => r.price))) : "";
  return `<section class="hero"><div class="w hg"><div>
<span class="chip"><i></i>Jos ⇄ Abuja · daily departures</span>
<h1>Travel Jos ⇄ Abuja the <em>trusted</em> way.</h1>
<p>Safe, comfortable and affordable inter-city travel. Choose your seat, pay online and ride with confidence. Going somewhere else? Charter a vehicle with us.</p>
<div class="cta"><a class="btn" href="#results" onclick="S.q.from='Jos';S.q.to='Abuja'">Book a trip</a><a class="btn gh" href="#charter">Charter a vehicle</a></div>
<div class="stats"><div><b>3½ hrs</b>Typical journey</div><div><b>Pick your seat</b>Online, in seconds</div><div><b>WhatsApp</b>Fast support</div></div></div>
<div class="vis"><div class="glow"></div><img class="car1" src="${vimg(c1.id)}" alt="${E(c1.name)}"><img class="car2" src="${vimg(c2.id)}" alt="${E(c2.name)}"><div class="vc"><small>Jos ⇄ Abuja</small><b>${price ? "from " + price : "Book today"}</b></div></div></div></section>
<div class="w">${searchForm()}</div>
<div class="w"><div class="stops rv"><div><small>Jos · Head office</small><b>${E(ADDR)}</b></div><span aria-hidden="true">⇄</span><div class="ab"><small>Abuja · Stop${ABUJA_ADDR ? "" : " · address coming soon"}</small><b>${ABUJA_ADDR ? E(ABUJA_ADDR) : "Exact pickup point being confirmed"}</b></div></div></div>
<section class="sec"><div class="w"><div class="eb rv">Our routes</div><h2 class="rv">Scheduled trips, both ways</h2><p class="lead rv">Fixed daily departures between Jos and Abuja. Book a seat in minutes.</p><div class="g2" style="margin-top:30px">${R.map((r, i) => `<div class="card rc rv" role="button" tabindex="0" onclick="pick(${i})" onkeydown="if(event.key==='Enter')pick(${i})"><span class="mu">${r.dur} · ${E(vh(r.vid).name)}</span><h3>${r.from} → ${r.to}</h3><div class="row"><span class="pr">${M(r.price)}</span><span class="btn sm">Book this route →</span></div></div>`).join("")}</div></div></section>
<section class="sec alt"><div class="w"><div class="eb rv">Our fleet</div><h2 class="rv">Clean, comfortable vehicles</h2><p class="lead rv">Ride in well-kept Toyota vehicles. Need a specific vehicle for a private trip? Request a charter.</p><div class="fleet" style="margin-top:30px">${DB.vehicles.map((x) => `<div class="card fc rv"><div class="im"><img src="${vimg(x.id)}" alt="${E(x.name)}" loading="lazy"></div><div class="bd"><h3>${E(x.name)}</h3><p class="mu">${E(x.type || "Vehicle")} · ${x.seats} passenger seats</p></div></div>`).join("")}</div></div></section>
<section class="sec"><div class="w"><div class="eb rv">Why Merkava</div><h2 class="rv">Built on trust, from seat to destination</h2><div class="g3" style="margin-top:34px">${[
    ["shield", "Safe &amp; reliable", "Your safety and peace of mind come first on every journey."],
    ["clock", "Scheduled departures", "Fixed daily times so you can plan your day."],
    ["seat", "Choose your seat", "See the vehicle layout and pick exactly where you sit."],
    ["wallet", "Fair pricing", "Clear fares with no surprises at checkout."],
    ["head", "Real human support", "Reach us by phone, email or WhatsApp."],
    ["pin", "Go beyond Jos &amp; Abuja", "Charter a vehicle to other destinations."],
  ]
    .map((f) => `<div class="ft rv"><div class="ico">${ic(f[0])}</div><div><h3>${f[1]}</h3><p>${f[2]}</p></div></div>`)
    .join("")}</div></div></section>
<section class="sec alt"><div class="w"><div class="eb rv">How it works</div><h2 class="rv">Book in four easy steps</h2><div class="g3" style="margin-top:30px">${["Search|Choose Jos or Abuja, your date and seats.", "Pick seats|Select your exact seats on the vehicle.", "Pay online|Confirm with secure online payment.", "Travel|Show your booking reference and enjoy the ride."].map((s, i) => `<div class="rv"><div class="st">${i + 1}</div><h3>${s.split("|")[0]}</h3><p class="mu">${s.split("|")[1]}</p></div>`).join("")}</div></div></section>
<section class="sec" style="padding-bottom:0"><div class="w"><div class="band rv"><div><div class="eb" style="color:var(--b)">Charter &amp; other cities</div><h2>Travelling beyond Jos and Abuja?</h2><p>Our scheduled service runs between Jos and Abuja. For any other destination, make a booking request and our team will confirm the vehicle, price and pickup details with you.</p></div><div class="cta" style="margin:0"><a class="btn" href="#charter">Request a charter</a><a class="btn g" target="_blank" rel="noopener" href="https://wa.me/${WA}?text=Hello%20Merkava%2C%20I%20want%20to%20charter%20a%20vehicle">WhatsApp us</a></div></div></div></section>
<section class="sec"><div class="w"><div class="eb rv">Terminals &amp; pickup</div><h2 class="rv">Find us</h2><div class="term" style="margin-top:30px">
<div class="card rv"><div class="ph">${HAS_TERMINAL_PHOTOS ? `<img src="${IMG.terminals.jos}" alt="Merkava Jos terminal" loading="lazy" onerror="this.remove()">` : ""}<span>📍 Jos terminal</span></div><h3>Jos · Head office</h3><p class="mu">${ADDR}</p><div class="cta" style="margin-top:12px"><a class="btn o sm" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDR)}">Get directions</a><a class="btn sm" href="tel:${TEL}">Call ${TEL}</a></div></div>
<div class="card rv"><div class="ph">${HAS_TERMINAL_PHOTOS ? `<img src="${IMG.terminals.abuja}" alt="Merkava Abuja pickup point" loading="lazy" onerror="this.remove()">` : ""}<span>📍 Abuja pickup</span></div><h3>Abuja · Pickup point${ABUJA_ADDR ? "" : ' <span class="tag c">Coming soon</span>'}</h3><p class="mu">${ABUJA_ADDR ? E(ABUJA_ADDR) : "The exact Abuja address is being confirmed. Message us on WhatsApp and we will share it."}</p><div class="cta" style="margin-top:12px">${ABUJA_ADDR ? `<a class="btn o sm" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ABUJA_ADDR + ", Abuja")}">Get directions</a>` : ""}<a class="btn g sm" target="_blank" rel="noopener" href="https://wa.me/${WA}?text=Hello%20Merkava%2C%20please%20share%20the%20Abuja%20pickup%20location">WhatsApp us</a></div></div></div></div></section>
<section class="sec alt"><div class="w"><div class="eb rv">Testimonials</div><h2 class="rv">What travellers are saying</h2><div class="g3" style="margin-top:30px">${TS.map((x) => `<div class="card rv"><div style="color:#f5a623">${"★".repeat(x[2] || 5)}</div><p>“${E(x[1])}”</p><b>${E(x[0])}</b><div class="mu">Customer</div></div>`).join("")}</div><div class="card rv" style="margin-top:20px"><h3>🎁 Refer a friend</h3><p class="mu" style="margin:0">Every Merkava account has a personal referral code in the dashboard. Share it with friends and family; we track everyone who joins with your code.</p></div></div></section>
<section class="sec"><div class="w" style="max-width:820px"><div class="eb rv">FAQ</div><h2 class="rv">Good to know</h2>${[
    ["Which routes do you run?", "We run scheduled trips between Jos and Abuja, in both directions."],
    [
      "Can I travel to other cities?",
      "Yes. For any destination other than Jos or Abuja, submit a charter request. Our team confirms price and details with you before the trip.",
    ],
    ["How do I pay?", "Pay online at checkout. Your booking reference is issued once payment is complete."],
    [
      "Can I get a refund?",
      "Per Merkava policy there is no refund of money after payment. Contact us if you have a problem with your booking.",
    ],
    ["How do I find my booking?", "Use Manage booking with your reference and phone number, or log in to your dashboard."],
    ...(boarding().length ? [["What should I know before travelling?", boarding().map((x) => E(x[0] + ": " + x[1])).join(". ")]] : []),
  ]
    .map((f) => `<details class="rv"><summary>${f[0]}</summary><p>${f[1]}</p></details>`)
    .join("")}</div></section>`;
};
