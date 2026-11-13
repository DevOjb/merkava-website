/**
 * MERKAVA FRONTEND — CONFIGURATION
 * Central source for brand contact details, content placeholders, asset paths
 * and demo-mode switches. Confirm all business details with the client before launch.
 * This file is public browser code: never put passwords, private keys or API secrets here.
 */
/* ============================================================
   MERKAVA — site configuration
   Brand, contact details and asset paths live here only.
   ============================================================ */
const WA = "2348151514404"; // WhatsApp, international format, no "+"
const TEL = "09037472272";
const MAIL = "merkava.tl@gmail.com";
const ADDR = "Plot 499 Yakubu Gowon Way, Jos, Plateau State, Nigeria";
// ABUJA STOP: paste the confirmed Abuja pickup address between the quotes. Leave "" until then.
// The "coming soon" notices on the home page and tickets switch to the address automatically.
const ABUJA_ADDR = "";
const TAGLINE = "Where Every Committed Journey Begins With Trust.";
const STORE_KEY = "merkava-site-v5"; // localStorage key (replaced by the API in the backend phase)
const DEMO_TAKEN_SEATS = true; // true = a few fake "taken" seats per trip for demos. Set to false at launch.
const HAS_TERMINAL_PHOTOS = false; // set true once jos-terminal.jpg and abuja-terminal.jpg exist in assets/images/terminals/

const IMG = {
  logo: "assets/images/logo.png",
  fleet: {
    "sienna-white": "assets/images/fleet/sienna-white.webp",
    "wish-blue": "assets/images/fleet/wish-blue.webp",
    "sienna-black": "assets/images/fleet/sienna-black.webp",
    "sienna-beige": "assets/images/fleet/sienna-beige.webp",
    "camry-grey": "assets/images/fleet/camry-grey.webp",
  },
  terminals: {
    jos: "assets/images/terminals/jos-terminal.jpg", // add your photo here
    abuja: "assets/images/terminals/abuja-terminal.jpg", // add your photo here
  },
};
const LOGO = IMG.logo;

// ---- Content the client supplies. Anything left empty ("") simply does not appear on the site. ----
const BOARDING = { arrive: "", luggage: "", id: "" }; // e.g. arrive: "30 minutes before departure", luggage: "one bag per passenger", id: "bring a valid ID"
const HOURS = ""; // e.g. "Mon - Sat: 8 AM to 6 PM"
const SOCIAL = { Facebook: "", Instagram: "", X: "" }; // full profile URLs
// Shown only until real feedback is approved in Admin > Feedback. Replace or delete before launch.
const SAMPLE_TESTIMONIALS = [
  ["Amina B.", "Booking took two minutes and the bus left on time.", 5],
  ["Chukwudi O.", "Picking my seat online was a big plus. Very smooth trip.", 5],
  ["Danjuma T.", "Friendly staff and a clean vehicle. I’ll travel with Merkava again.", 5],
];
