/**
 * MERKAVA FRONTEND — SHARED UTILITIES
 * Small reusable helpers used by components, views and action handlers.
 * Keep view-specific rendering and business workflows in their own files.
 */
/* Small helpers: DOM, formatting, escaping, toast, icons */
const q = (s) => document.querySelector(s),
  M = (n) => "₦" + Number(n).toLocaleString("en-NG"),
  E = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const v = (id) => (q("#" + id) || {}).value || "";
// Local-date helpers (toISOString() is UTC, which is a day behind Nigerian time between 00:00 and 01:00)
const iso = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"),
  tom = () => iso(new Date(Date.now() + 864e5)),
  fmtDate = (s) => {
    const d = new Date(s + "T12:00:00");
    return isNaN(d) ? s : d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
  },
  departed = (date, time) => new Date(date + "T" + time) < new Date();
const ic = (n) =>
  '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
  {
    shield: '<path d="M12 3l8 3v6c0 5-3.500 8-8 9-4.500-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    seat: '<path d="M7 3v9a3 3 0 003 3h7M7 12H5v6h14v-3"/>',
    wallet: '<rect x="3" y="6" width="18" height="13" rx="3"/><path d="M16 13h2M3 10h18"/>',
    head: '<path d="M4 14v-2a8 8 0 0116 0v2"/><rect x="3" y="14" width="4" height="6" rx="1"/><rect x="17" y="14" width="4" height="6" rx="1"/>',
    pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.500"/>',
  }[n] +
  "</svg>";
function toast(m, bad) {
  const t = q("#toast");
  t.textContent = m;
  t.style.display = "block";
  t.style.borderColor = bad ? "#dc2626" : "#00AFEF";
  clearTimeout(t.h);
  t.h = setTimeout(() => (t.style.display = "none"), 3200);
}
// Navigate. A hash change triggers render() by itself; only render directly when the hash is unchanged.
const go = (h) => {
  if (location.hash === "#" + h) render();
  else location.hash = h;
};
function syncCity(otherId, val) {
  const o = q("#" + otherId);
  if (o.value == val) o.value = [...o.options].map((x) => x.value).find((x) => x != val) || val;
}
const opts = (a, s) => a.map((c) => `<option ${c == s ? "selected" : ""}>${E(c)}</option>`).join("");
const V = {}; // view registry: V.name = function () { return html }
const boarding = () =>
  [["Arrive", BOARDING.arrive], ["Luggage", BOARDING.luggage], ["ID", BOARDING.id]].filter((x) => x[1]);
const boardingHtml = () =>
  boarding().length ? `<p class="mu"><b>Before you travel</b><br>${boarding().map((x) => x[0] + ": " + E(x[1])).join("<br>")}</p>` : "";
