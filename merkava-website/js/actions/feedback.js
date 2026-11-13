/**
 * CUSTOMER FEEDBACK ACTIONS
 * Captures feedback and allows moderation in the demo admin interface.
 * Production submissions require server validation, abuse controls and moderation.
 */
/* Trip feedback: customers submit, admin approves which ones appear on the home page */
function sendFb(e) {
  e.preventDefault();
  const name = v("fn").trim(),
    text = v("ft").trim(),
    rating = Math.min(5, Math.max(1, +v("fr") || 5));
  if (!name || !text) {
    toast("Please add your name and a comment", 1);
    return false;
  }
  DB.feedback.push({ id: "f" + Date.now(), name, text, rating, ref: v("fx").trim().toUpperCase(), status: "new" });
  save();
  S.fbDone = true;
  render();
  return false;
}
function setFb(id, status) {
  DB.feedback.find((f) => f.id == id).status = status;
  save();
  render(1);
}
