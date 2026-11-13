/**
 * AUTHENTICATION ACTIONS — DEMO ONLY
 * Current handlers use browser-side sample data for demonstration.
 * Replace with server/provider authentication; never compare or store raw passwords
 * in browser storage in a production deployment.
 */
/* Account actions: login, register, reset, logout, profile */
function setU(u) {
  S.uid = u.id;
  try {
    sessionStorage.setItem("mku", u.id);
  } catch (e) {}
}
function login(e) {
  e.preventDefault();
  const u = DB.users.find((x) => x.email == v("e").trim().toLowerCase() && x.pw == v("pw"));
  if (!u) {
    toast("Wrong email or password", 1);
    return false;
  }
  setU(u);
  const n = S.next;
  S.next = null;
  go(n && S.sel ? n : u.role == "admin" ? "admin" : "dash");
  return false;
}
function reg(e) {
  e.preventDefault();
  const em = v("e").trim().toLowerCase();
  if (DB.users.some((x) => x.email == em)) {
    toast("Email already registered", 1);
    return false;
  }
  const rc = v("rc").trim().toUpperCase(),
    rf = DB.users.find((x) => x.ref == rc);
  if (rf) rf.refs = (rf.refs || 0) + 1;
  const u = {
    id: "u" + Date.now(),
    name: v("n").trim(),
    email: em,
    phone: v("ph"),
    pw: v("pw"),
    role: "customer",
    ref: "MK" + Math.random().toString(36).slice(2, 7).toUpperCase(),
    refs: 0,
  };
  DB.users.push(u);
  save();
  setU(u);
  toast("Account created 🎉");
  const n = S.next;
  S.next = null;
  go(n && S.sel ? n : "dash");
  return false;
}
function resetPw(e) {
  e.preventDefault();
  const u = DB.users.find((x) => x.email == v("e").trim().toLowerCase());
  if (!u) {
    toast("No account with that email", 1);
    return false;
  }
  u.pw = v("pw");
  save();
  toast("Password updated. Please log in.");
  go("login");
  return false;
}
function logout() {
  S.uid = null;
  try {
    sessionStorage.removeItem("mku");
  } catch (e) {}
  go("home");
}
function prof(e) {
  e.preventDefault();
  const u = me();
  u.name = v("n");
  u.phone = v("ph");
  save();
  render(1);
  toast("Profile saved");
  return false;
}
