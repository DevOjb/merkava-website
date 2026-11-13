/**
 * MERKAVA FRONTEND — DEMO DATA STORE
 * Holds the current browser-only demo state and localStorage persistence.
 * This is a replaceable adapter, NOT a production database or security boundary.
 * Backend integration should preserve the data contract documented in /docs.
 */
/* Data layer. Everything the site stores lives in DB (persisted to localStorage).
   BACKEND PHASE: replace DB/save() with the technology-neutral API contract in /docs/BACKEND-INTEGRATION.md. */
const seed = () => ({
  users: [
    { id: "u0", name: "Merkava Admin", email: "admin@merkava.com", pw: "admin123", phone: TEL, role: "admin", ref: "MKADMIN", refs: 0 },
  ],
  // img = key in IMG.fleet. seats = passenger seats (excluding the driver). ASSUMED: confirm real figures.
  vehicles: [
    { id: "v1", name: "Toyota Sienna (White)", type: "Minivan", plate: "", seats: 7, img: "sienna-white" },
    { id: "v2", name: "Toyota Wish", type: "Minivan", plate: "", seats: 6, img: "wish-blue" },
    { id: "v3", name: "Toyota Sienna (Black)", type: "Minivan", plate: "", seats: 7, img: "sienna-black" },
    { id: "v4", name: "Toyota Sienna (Classic)", type: "Minivan", plate: "", seats: 7, img: "sienna-beige" },
    { id: "v5", name: "Toyota Camry", type: "Sedan", plate: "", seats: 4, img: "camry-grey" },
  ],
  // Scheduled routes: Jos <-> Abuja only. Fares and times are PLACEHOLDERS.
  routes: [
    { id: "r0", from: "Jos", to: "Abuja", price: 9000, dur: "3h 30m", vid: "v1", times: ["06:00", "10:00", "15:00"] },
    { id: "r1", from: "Abuja", to: "Jos", price: 9000, dur: "3h 30m", vid: "v2", times: ["06:00", "10:00", "15:00"] },
  ],
  bookings: [],
  charters: [],
});

let DB;
try {
  DB = JSON.parse(localStorage.getItem(STORE_KEY));
} catch (e) {}
DB = DB || seed();
DB.feedback = DB.feedback || [];
const save = () => {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(DB));
  } catch (e) {
    toast("Could not save on this device (private browsing?).", 1);
  }
};
let S = { q: { from: "Jos", to: "Abuja", date: tom(), pax: 1 }, seats: [], tab: "ov", mode: "one" };
try {
  S.uid = sessionStorage.getItem("mku");
} catch (e) {}
const me = () => DB.users.find((u) => u.id === S.uid),
  rt = (id) => DB.routes.find((r) => r.id === id),
  vh = (id) => DB.vehicles.find((x) => x.id === id) || { name: "Bus", seats: 14, plate: "" };
function taken(rid, date, time) {
  let h = 0;
  for (const c of rid + date + time) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const n = vh(rt(rid).vid).seats,
    s = new Set(DEMO_TAKEN_SEATS ? [(h % n) + 1, ((h >> 3) % n) + 1, ((h >> 6) % n) + 1] : []);
  DB.bookings
    .filter((b) => b.rid == rid && b.date == date && b.time == time && b.status == "confirmed")
    .forEach((b) => b.seats.forEach((x) => s.add(x)));
  return s;
}
// Cities come from the routes, so any route added in Admin becomes searchable
const cities = () => {
  const c = [...new Set(DB.routes.flatMap((r) => [r.from, r.to]))].filter(Boolean);
  return c.length ? c : ["Jos", "Abuja"];
};
const vimg = (id) => {
  const x = vh(id).img;
  return IMG.fleet[x] || LOGO;
};
