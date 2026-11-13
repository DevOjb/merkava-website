/**
 * CUSTOMER ACCOUNT VIEW
 * Customer dashboard, booking history, profile details and referral information.
 */
/* Customer dashboard */
V.dash = function () {
  const u = me(),
    bs = DB.bookings.filter((b) => b.uid == u.id).reverse();
  return `<div class="pg" style="max-width:1000px"><div class="row"><h2>Hello, ${E(u.name.split(" ")[0])} 👋</h2><a class="btn" href="#home">Book new ticket</a></div><div class="kpi"><div class="card"><b>${bs.filter((b) => b.status == "confirmed" && !departed(b.date, b.time)).length}</b>Upcoming trips</div><div class="card"><b>${u.refs || 0}</b>Friends referred</div><div class="card">Your referral code<b>${u.ref}</b></div></div><div class="card"><h3>Booking history</h3><div class="tw"><table><tr><th>Ref</th><th>Trip</th><th>Date</th><th>Seats</th><th>Total</th><th>Status</th><th></th></tr>${bs.map((b) => `<tr><td>${b.ref}</td><td>${E(b.from)} → ${E(b.to)}</td><td>${b.date} ${b.time}</td><td>${b.seats.join(",")}</td><td>${M(b.total)}</td><td><span class="tag ${b.status == "confirmed" ? "" : "c"}">${b.status}</span></td><td>${b.status == "confirmed" && !departed(b.date, b.time) ? `<button class="btn r sm" onclick="cancel('${b.id}')">Cancel</button>` : ""}</td></tr>`).join("") || '<tr><td colspan="7" class="mu">No bookings yet.</td></tr>'}</table></div></div><form class="card" style="margin-top:16px" onsubmit="return prof(event)"><h3>Profile</h3><div class="fg"><div><label>Name</label><input id="n" value="${E(u.name)}" required></div><div><label>Phone</label><input id="ph" value="${E(u.phone)}" required></div><button class="btn">Save</button></div></form></div>`;
};
