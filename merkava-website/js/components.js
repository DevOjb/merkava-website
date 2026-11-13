/**
 * MERKAVA FRONTEND — SHARED UI COMPONENTS
 * Renders reusable site chrome and shared booking/search interface fragments.
 * Depends on configuration, utilities and the browser-side store.
 */
/* Shared page chrome: header/nav, footer, trip search card */
const nav = () => {
  const u = me();
  return `<header><div class="w"><a class="logo" href="#home"><img src="${LOGO}" alt="Merkava logo"><span>MERKAVA<small>TRANSPORT &amp; LOGISTICS</small></span></a><button class="mb" aria-label="Menu" onclick="this.setAttribute('aria-expanded',document.body.classList.toggle('mo'))" aria-expanded="false">☰</button><nav class="nl"><a class="l" href="#home">Book a trip</a><a class="l" href="#charter">Charter</a><a class="l" href="#manage">Manage booking</a><a class="l" href="#about">About</a><a class="l" href="#contact" onclick="return toContact()">Contact</a>${u ? `${u.role == "admin" ? '<a class="l" href="#admin">Admin</a>' : ""}<a class="l" href="#dash">${E(u.name.split(" ")[0])}</a><button class="btn o sm" onclick="logout()">Logout</button>` : '<a class="l" href="#login">Login</a><a class="btn sm" href="#register">Sign up</a>'}</nav></div></header>`;
};
const socials = () =>
  Object.entries(SOCIAL)
    .filter((x) => x[1])
    .map((x) => `<a href="${E(x[1])}" target="_blank" rel="noopener">${E(x[0])}</a>`)
    .join(" · ");
const foot = () =>
  `<footer id="contact"><div class="w"><div class="g3"><div><img src="${LOGO}" alt="Merkava"><p><i>${TAGLINE}</i></p></div><div><h3>Head office</h3><p>📍 ${ADDR}<br>📞 <a href="tel:${TEL}">${TEL}</a><br>✉️ <a href="mailto:${MAIL}">${MAIL}</a>${HOURS ? `<br>🕒 ${E(HOURS)}` : ""}</p></div><div><h3>Quick links</h3><p><a href="#home">Book a trip</a><br><a href="#charter">Charter a vehicle</a><br><a href="#manage">Manage your booking</a><br><a href="#about">About &amp; services</a><br><a href="#feedback">Trip feedback</a><br><a href="#terms">Terms &amp; conditions</a><br><a href="#login">Login</a></p></div><div><h3>WhatsApp</h3><p>Questions about a trip? Message us directly.</p><a class="btn g" target="_blank" rel="noopener" href="https://wa.me/${WA}">08151514404</a>${socials() ? `<p>${socials()}</p>` : ""}</div></div><div class="fb">© 2026 Merkava Transport and Logistics. All rights reserved. · Website by Ohio Multi-Solution</div></div></footer>`;
const searchForm = () => {
  const m = S.mode;
  return `<form class="card sc" onsubmit="return searchTrips(event)"><div class="mt">${[
    ["one", "Book a trip"],
    ["round", "Round trip"],
    ["charter", "Charter"],
  ]
    .map((x) => `<button type="button" class="${m == x[0] ? "on" : ""}" onclick="mode('${x[0]}')">${x[1]}</button>`)
    .join(
      "",
    )}</div>${m == "charter" ? `<div class="row"><p class="mu" style="margin:0;max-width:560px">We run scheduled trips between Jos and Abuja. Travelling anywhere else? Request a charter and we will confirm your price and vehicle.</p><a class="btn" href="#charter">Request a charter →</a></div>` : `<div class="fg"><div><label>From</label><select id="f" onchange="syncCity('t',this.value)">${opts(cities(), S.q.from)}</select></div><div><label>To</label><select id="t" onchange="syncCity('f',this.value)">${opts(cities(), S.q.to)}</select></div><div><label>Departure</label><input id="d" type="date" min="${iso(new Date())}" value="${S.q.date}" required></div>${m == "round" ? `<div><label>Return</label><input id="rd" type="date" min="${iso(new Date())}" value="${S.q.ret || ""}" required></div>` : ""}<div><label>Seats</label><select id="p">${[1, 2, 3, 4, 5, 6].map((n) => `<option ${n == S.q.pax ? "selected" : ""}>${n}</option>`).join("")}</select></div><button class="btn">Search trips</button></div>`}</form>`;
};
