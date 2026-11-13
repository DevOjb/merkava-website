/**
 * ADMINISTRATION VIEW
 * Demo admin interface for routes, fleet, bookings, charter requests and feedback.
 * Production authorization must be enforced by the backend for every admin operation.
 */
/* Admin dashboard: overview, routes, schedules, vehicles, bookings, users, charters */
V.admin = function () {
  const T = { ov: "Overview", rt: "Routes", sc: "Schedules", vh: "Vehicles", bk: "Bookings", us: "Users", ch: "Charters", fb: "Feedback" },
    bs = DB.bookings,
    ok = bs.filter((b) => b.status == "confirmed"),
    rev = ok.reduce((a, b) => a + b.total, 0);
  let c = "";
  if (S.tab == "ov") {
    const by = {};
    ok.forEach((b) => (by[b.from + " → " + b.to] = (by[b.from + " → " + b.to] || 0) + b.total));
    const mx = Math.max(1, ...Object.values(by));
    c = `<div class="kpi"><div class="card"><b>${M(rev)}</b>Revenue</div><div class="card"><b>${ok.length}</b>Confirmed bookings</div><div class="card"><b>${DB.users.length}</b>Users</div><div class="card"><b>${DB.routes.length}</b>Routes</div></div><div class="card"><h3>Revenue by route</h3>${
      Object.entries(by)
        .map(([k, x]) => `<div class="mu">${E(k)} · ${M(x)}</div><div class="bar" style="width:${(x / mx) * 100}%"></div>`)
        .join("") || '<p class="mu">No paid bookings yet.</p>'
    }</div>`;
  }
  if (S.tab == "rt")
    c = `<div class="card"><div class="tw"><table><tr><th>Route</th><th>Price</th><th>Duration</th><th>Vehicle</th><th></th></tr>${DB.routes.map((r) => `<tr><td>${E(r.from)} → ${E(r.to)}</td><td><input style="width:100px" type="number" value="${r.price}" onchange="upd('${r.id}','price',+this.value)"></td><td>${r.dur}</td><td><select onchange="upd('${r.id}','vid',this.value)">${DB.vehicles.map((x) => `<option value="${x.id}" ${x.id == r.vid ? "selected" : ""}>${E(x.name)}</option>`).join("")}</select></td><td><button class="btn r sm" onclick="delR('${r.id}')">Delete</button></td></tr>`).join("")}</table></div></div><form class="card" style="margin-top:12px" onsubmit="return addR(event)"><h3>Add route</h3><div class="fg"><div><label>From</label><input id="a1" required></div><div><label>To</label><input id="a2" required></div><div><label>Price ₦</label><input id="a3" type="number" required></div><div><label>Duration</label><input id="a4" placeholder="4h" required></div><button class="btn">Add</button></div></form>`;
  if (S.tab == "sc")
    c = `<div class="card"><p class="mu">Daily departure times (comma separated, 24h).</p>${DB.routes.map((r) => `<div class="row" style="margin-bottom:8px"><span>${E(r.from)} → ${E(r.to)}</span><input style="max-width:280px" value="${r.times.join(", ")}" onchange="upd('${r.id}','times',this.value.split(',').map(s=>s.trim()).filter(Boolean))"></div>`).join("")}</div>`;
  if (S.tab == "vh")
    c = `<div class="card"><table><tr><th>Vehicle</th><th>Plate</th><th>Seats</th><th></th></tr>${DB.vehicles.map((x) => `<tr><td>${E(x.name)}</td><td>${E(x.plate)}</td><td>${x.seats}</td><td><button class="btn r sm" onclick="delV('${x.id}')">Delete</button></td></tr>`).join("")}</table></div><form class="card" style="margin-top:12px" onsubmit="return addV(event)"><h3>Add vehicle</h3><div class="fg"><div><label>Name</label><input id="a1" required></div><div><label>Plate</label><input id="a2" required></div><div><label>Seats</label><input id="a3" type="number" min="4" max="60" required></div><button class="btn">Add</button></div></form>`;
  if (S.tab == "bk")
    c = `<p><button class="btn o sm" onclick="exportCsv()">Download bookings (CSV)</button></p><div class="card tw"><table><tr><th>Ref</th><th>Trip</th><th>Date</th><th>Seats</th><th>Total</th><th>Status</th><th></th></tr>${[...bs].reverse().map((b) => `<tr><td>${b.ref}</td><td>${E(b.from)} → ${E(b.to)}</td><td>${b.date} ${b.time}</td><td>${b.seats.join(",")}</td><td>${M(b.total)}</td><td><span class="tag ${b.status == "confirmed" ? "" : "c"}">${b.status}</span></td><td><a class="btn g sm" target="_blank" rel="noopener" href="${waLink(b.pass[0]?.phone, "Hello, this is Merkava about booking " + b.ref + " (" + b.from + " to " + b.to + ", " + fmtDate(b.date) + " at " + b.time + ").")}">WhatsApp</a> ${b.status == "confirmed" ? `<button class="btn r sm" onclick="cancel('${b.id}')">Cancel</button>` : ""}</td></tr>`).join("") || '<tr><td colspan="7" class="mu">No bookings yet.</td></tr>'}</table></div>`;
  if (S.tab == "us")
    c = `<div class="card tw"><table><tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th></tr>${DB.users.map((u) => `<tr><td>${E(u.name)}</td><td>${E(u.email)}</td><td>${E(u.phone)}</td><td>${u.role || "customer"}</td></tr>`).join("")}</table></div>`;
  if (S.tab == "ch")
    c = `<div class="card tw"><table><tr><th>Ref</th><th>Customer</th><th>Trip</th><th>When</th><th>Vehicle</th><th>Status</th><th></th></tr>${DB.charters.map((x) => `<tr><td>${x.ref}</td><td>${E(x.name)}<br><span class="mu">${E(x.phone)}<br>${E(x.email)}</span></td><td>${E(x.from)} → ${E(x.to)}</td><td>${E(x.date)} ${E(x.time)}<br><span class="mu">${E(x.pax)} pax</span></td><td>${E(x.veh)}${x.note ? `<br><span class="mu">${E(x.note)}</span>` : ""}</td><td><span class="tag ${x.status == "new" ? "c" : ""}">${x.status}</span></td><td><a class="btn g sm" target="_blank" rel="noopener" href="${waLink(x.phone, "Hello " + x.name + ", this is Merkava about your charter request " + x.ref + ".")}">WhatsApp</a> ${x.status == "new" ? `<button class="btn sm" onclick="setCh('${x.id}')">Mark contacted</button>` : ""}</td></tr>`).join("") || '<tr><td colspan="7" class="mu">No charter requests yet.</td></tr>'}</table></div>`;
  if (S.tab == "fb")
    c = `<div class="card tw"><table><tr><th>Customer</th><th>Rating</th><th>Comment</th><th>Status</th><th></th></tr>${
      [...DB.feedback]
        .reverse()
        .map(
          (f) =>
            `<tr><td>${E(f.name)}<br><span class="mu">${E(f.ref)}</span></td><td>${"★".repeat(f.rating)}</td><td>${E(f.text)}</td><td><span class="tag ${f.status == "approved" ? "" : "c"}">${f.status}</span></td><td>${f.status != "approved" ? `<button class="btn sm" onclick="setFb('${f.id}','approved')">Show on homepage</button>` : `<button class="btn o sm" onclick="setFb('${f.id}','hidden')">Hide</button>`}</td></tr>`,
        )
        .join("") || '<tr><td colspan="5" class="mu">No feedback yet.</td></tr>'
    }</table></div>`;
  return `<div class="pg" style="max-width:1000px"><h2>Admin dashboard</h2><div class="tabs">${Object.entries(T)
    .map(([k, n]) => `<button class="${S.tab == k ? "on" : ""}" onclick="S.tab='${k}';render(1)">${n}</button>`)
    .join("")}</div>${c}</div>`;
};
