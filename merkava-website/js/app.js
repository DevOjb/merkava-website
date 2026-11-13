/**
 * MERKAVA FRONTEND — APPLICATION ENTRY POINT
 * Owns hash-based navigation, page rendering, document titles and global UI events.
 * Classic script load order is intentional; see index.html and FRONTEND-GUIDE.md.
 */
/* Router and start-up. Hash routes: #home #results #seats #passenger #summary #confirm #login #register #reset #dash #admin #charter #manage #contact */
const io = window.IntersectionObserver
  ? new IntersectionObserver(
      (es) =>
        es.forEach((x) => {
          if (x.isIntersecting) {
            x.target.classList.add("in");
            io.unobserve(x.target);
          }
        }),
      { threshold: 0.1 },
    )
  : null;
const TITLES = {
  results: "Available trips", seats: "Choose your seats", passenger: "Passenger details", summary: "Review booking", confirm: "Booking confirmed",
  login: "Log in", register: "Create account", reset: "Reset password", dash: "My account", admin: "Admin", charter: "Charter a vehicle",
  manage: "Manage booking",
  feedback: "Trip feedback", about: "About & services", terms: "Terms & conditions",
};
const BASE_TITLE = document.title;
let fio;
function render(keep) {
  let h = (location.hash || "#home").slice(1),
    sc = h == "contact";
  if (sc || !V[h]) h = "home";
  if (["seats", "passenger", "summary"].includes(h) && !S.sel) h = "home";
  if (["dash", "admin"].includes(h) && !me()) h = "login";
  if (h == "admin" && me().role != "admin") h = "dash";
  if (h == "confirm" && !S.done) h = "home";
  document.body.classList.remove("mo");
  document.title = TITLES[h] ? TITLES[h] + " | Merkava Transport & Logistics" : BASE_TITLE;
  q("#app").innerHTML =
    '<a class="skip" href="#home" onclick="q(\'#main\').focus();return false">Skip to content</a>' + nav() + '<main id="main" tabindex="-1">' + V[h]() + "</main>" + foot();
  // Link every <label> to the control that follows it (click-to-focus and screen readers)
  document.querySelectorAll("label:not([for])").forEach((l) => {
    const c = l.nextElementSibling;
    if (c && c.id && /^(INPUT|SELECT|TEXTAREA)$/.test(c.tagName)) l.htmlFor = c.id;
  });
  // Hide the floating WhatsApp button while the footer (which has its own WhatsApp button) is on screen
  if (window.IntersectionObserver) {
    if (fio) fio.disconnect();
    fio = new IntersectionObserver(([x]) => document.body.classList.toggle("nf", x.isIntersecting), { threshold: 0.15 });
    fio.observe(q("footer"));
  }
  document.querySelectorAll(".rv").forEach((e) => (io && keep !== 1 ? io.observe(e) : e.classList.add("in")));
  if (sc) q("#contact").scrollIntoView();
  else if (keep !== 1) scrollTo({ top: 0, behavior: "instant" });
}
addEventListener("hashchange", () => {
  S.ch = null;
  S.fbDone = null;
  S.found = null;
  S.nf = 0;
  render();
});
render();
// "Contact" scrolls to the footer on the current page instead of re-rendering the home page
function toContact() {
  const f = q("#contact");
  if (!f) return true;
  document.body.classList.remove("mo");
  f.scrollIntoView({ behavior: "smooth" });
  return false;
}
// Close the mobile menu after any nav choice, even when the link points at the page you are already on
document.addEventListener("click", (e) => {
  if (e.target.closest(".nl a, .nl button")) document.body.classList.remove("mo");
});
