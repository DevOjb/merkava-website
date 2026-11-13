/**
 * ADMIN ACTIONS — DEMO ONLY
 * Route/fleet maintenance, charter status, feedback moderation and CSV export.
 * Every privileged mutation and export must be authorized and audited server-side.
 */
/* Admin actions: edit routes, vehicles, charters */
function setCh(id) {
  DB.charters.find((x) => x.id == id).status = "contacted";
  save();
  render(1);
}
function upd(id, k, val) {
  const bad = (m) => {
    toast(m, 1);
    render(1);
  };
  if (k == "price" && !(val > 0)) return bad("Enter a valid price");
  if (k == "times") {
    if (!val.length || val.some((t) => !/^([01]\d|2[0-3]):[0-5]\d$/.test(t))) return bad("Use 24h times such as 06:00, 14:30");
    val.sort();
  }
  rt(id)[k] = val;
  save();
  toast("Saved");
}
function delR(id) {
  if (confirm("Delete route?")) {
    DB.routes = DB.routes.filter((r) => r.id != id);
    save();
    render(1);
  }
}
function addR(e) {
  e.preventDefault();
  if (v("a1").trim().toLowerCase() == v("a2").trim().toLowerCase()) {
    toast("From and To must be different", 1);
    return false;
  }
  DB.routes.push({
    id: "r" + Date.now(),
    from: v("a1").trim(),
    to: v("a2").trim(),
    price: +v("a3"),
    dur: v("a4"),
    vid: DB.vehicles[0]?.id,
    times: ["07:00", "14:00"],
  });
  save();
  render(1);
  return false;
}
function addV(e) {
  e.preventDefault();
  DB.vehicles.push({ id: "v" + Date.now(), name: v("a1"), plate: v("a2"), seats: +v("a3") });
  save();
  render(1);
  return false;
}
function delV(id) {
  if (DB.routes.some((r) => r.vid == id)) {
    toast("Reassign routes using this vehicle first", 1);
    return;
  }
  DB.vehicles = DB.vehicles.filter((x) => x.id != id);
  save();
  render(1);
}

// Opens WhatsApp to a Nigerian number (0803... or 234803...) with a prefilled message
function waLink(phone, msg) {
  const d = String(phone || "").replace(/\D/g, "");
  return "https://wa.me/" + (d.startsWith("234") ? d : d.replace(/^0/, "234")) + "?text=" + encodeURIComponent(msg);
}
// Bookings as a spreadsheet file (open in Excel): handy as a passenger manifest per trip
function exportCsv() {
  const cell = (x) => {
    let s = String(x ?? "");
    if (/^[=+\-@]/.test(s)) s = "'" + s; // stops spreadsheet formula injection
    return '"' + s.replace(/"/g, '""') + '"';
  };
  const rows = [["Ref", "From", "To", "Date", "Time", "Seats", "Passengers", "Phones", "Email", "Total", "Status"]];
  DB.bookings.forEach((b) =>
    rows.push([b.ref, b.from, b.to, b.date, b.time, b.seats.join(" "), b.pass.map((p) => p.name).join("; "), b.pass.map((p) => p.phone).join("; "), b.email, b.total, b.status]),
  );
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob(["\ufeff" + rows.map((r) => r.map(cell).join(",")).join("\n")], { type: "text/csv" }));
  a.download = "merkava-bookings-" + iso(new Date()) + ".csv";
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
