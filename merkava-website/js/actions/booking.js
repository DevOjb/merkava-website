/**
 * BOOKING ACTIONS
 * Handles search criteria, trip selection, seat selection, passenger capture,
 * demo checkout and cancellation. Replace local persistence with backend requests.
 * Payment success must never be inferred from a client-side timer in production.
 */
/* Booking flow actions: search, select, seats, payment, cancel */
const mode = (m) => {
  S.mode = m;
  render(1);
};
function searchTrips(e) {
  e.preventDefault();
  const f = v("f"),
    t = v("t");
  if (f == t) {
    toast("Pick two different cities", 1);
    return false;
  }
  const rd = S.mode == "round" ? v("rd") : null;
  if (rd && rd < v("d")) {
    toast("Return date must be after departure", 1);
    return false;
  }
  S.q = { from: f, to: t, date: v("d"), pax: +v("p"), ret: rd };
  go("results");
  return false;
}
function pick(i) {
  const r = DB.routes[i];
  S.q.from = r.from;
  S.q.to = r.to;
  S.q.ret = null;
  go("results");
}
function retTrip() {
  const f = S.q.from;
  S.q = { from: S.q.to, to: f, date: S.q.ret, pax: S.q.pax, ret: null };
  S.done = null;
  go("results");
}
function choose(rid, time) {
  S.sel = { rid, time };
  S.seats = [];
  S.pass = null;
  go("seats");
}
function tog(n) {
  const i = S.seats.indexOf(n);
  if (i > -1) S.seats.splice(i, 1);
  else if (S.q.pax == 1) S.seats = [n];
  else if (S.seats.length < S.q.pax) S.seats.push(n);
  else toast("You selected " + S.q.pax + " seat(s). Deselect one first.", 1);
  render(1);
}
function toPass() {
  if (!me()) {
    toast("Please log in to continue");
    S.next = "passenger";
    go("login");
    return;
  }
  go("passenger");
}
function savePass(e) {
  e.preventDefault();
  S.pass = S.seats.map((s, i) => ({ seat: s, name: v("pn" + i), phone: v("pp" + i) }));
  S.email = v("pe");
  go("summary");
  return false;
}
function pay() {
  if (S.paying) return;
  S.paying = true;
  render(1);
  setTimeout(() => {
    if (location.hash !== "#summary" || !S.sel) {
      S.paying = false;
      return;
    }
    const r = rt(S.sel.rid),
      tk = taken(r.id, S.q.date, S.sel.time);
    if (S.seats.some((s) => tk.has(s))) {
      S.paying = false;
      toast("Sorry, a seat was just taken. Please reselect.", 1);
      go("seats");
      return;
    }
    const b = {
      id: "b" + Date.now(),
      ref: "MK-" + Date.now().toString(36).toUpperCase().slice(-6),
      uid: S.uid,
      rid: r.id,
      from: r.from,
      to: r.to,
      date: S.q.date,
      time: S.sel.time,
      seats: [...S.seats],
      pass: S.pass,
      email: S.email,
      total: r.price * S.seats.length,
      status: "confirmed",
    };
    DB.bookings.push(b);
    save();
    S.done = b;
    S.paying = false;
    S.sel = null;
    go("confirm");
  }, 1400);
}
function cancel(id) {
  if (!confirm("Cancel this booking? Note: no refund of money after payment.")) return;
  DB.bookings.find((b) => b.id == id).status = "cancelled";
  save();
  render(1);
  toast("Booking cancelled");
}
