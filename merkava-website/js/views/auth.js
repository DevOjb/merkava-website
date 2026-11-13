/**
 * AUTHENTICATION VIEWS
 * Login, registration and password-reset screens for the current demo experience.
 * The production backend must own authentication, password storage and reset tokens.
 */
/* Login, registration and password reset views */
V.login = function () {
  return `<div class="pg" style="max-width:420px"><h2>Welcome back</h2><form class="card" onsubmit="return login(event)"><label>Email</label><input id="e" type="email" required><br><br><label>Password</label><input id="pw" type="password" required><br><br><button class="btn" style="width:100%">Log in</button><p class="mu"><a href="#reset">Forgot password?</a> · <a href="#register">Create account</a></p></form></div>`;
};
V.register = function () {
  return `<div class="pg" style="max-width:420px"><h2>Create your account</h2><form class="card" onsubmit="return reg(event)"><label>Full name</label><input id="n" required><br><br><label>Email</label><input id="e" type="email" required><br><br><label>Phone</label><input id="ph" type="tel" required><br><br><label>Password (min 6)</label><input id="pw" type="password" minlength="6" required><br><br><label>Referral code (optional)</label><input id="rc"><br><br><button class="btn" style="width:100%">Sign up</button><p class="mu">Have an account? <a href="#login">Log in</a></p></form></div>`;
};
V.reset = function () {
  return `<div class="pg" style="max-width:420px"><h2>Reset password</h2><form class="card" onsubmit="return resetPw(event)"><label>Account email</label><input id="e" type="email" required><br><br><label>New password</label><input id="pw" type="password" minlength="6" required><br><br><button class="btn" style="width:100%">Reset</button></form></div>`;
};
