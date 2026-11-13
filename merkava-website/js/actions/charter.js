/**
 * CHARTER AND BOOKING LOOKUP ACTIONS
 * Current implementation stores demo requests locally.
 * Production lookup must verify ownership using secure server-side checks.
 */
/* Charter request and booking lookup */
function sendCh(e) {
  e.preventDefault();
  const c = {
    id: "c" + Date.now(),
    ref: "CH-" + Date.now().toString(36).toUpperCase().slice(-5),
    name: v("cn"),
    phone: v("cp"),
    email: v("ce"),
    from: v("cf"),
    to: v("ct"),
    date: v("cd"),
    time: v("ctm"),
    pax: v("cx"),
    veh: v("cv"),
    note: v("cnote"),
    status: "new",
  };
  DB.charters.push(c);
  save();
  S.ch = c;
  render();
  return false;
}
function look(e) {
  e.preventDefault();
  const r = v("mr").trim().toUpperCase(),
    p = v("mp").replace(/\D/g, "").slice(-10);
  S.found = DB.bookings.find((b) => b.ref == r && b.pass.some((x) => x.phone.replace(/\D/g, "").slice(-10) == p)) || null;
  S.nf = !S.found;
  render(1);
  return false;
}
