import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const USERS_KEY = "eyko_users";
const SESSION_KEY = "eyko_user";
const DEMO_PW_KEY = "eyko_demo_pw";
const RESET_KEY = "eyko_reset_ticket";
const RESET_TTL = 10 * 60 * 1000;

export const DEMO_ACCOUNT = {
  email: "demo@eykotech.com",
  password: "eyko2026",
  name: "Demo User",
  role: "Procurement & IT",
};

const AuthContext = createContext(null);

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

async function hashPw(password) {
  try {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch {
    return password;
  }
}

function persistSession(u) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(u));
  } catch {
    /* storage unavailable */
  }
}

function readDemoPw() {
  try {
    return localStorage.getItem(DEMO_PW_KEY) || null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore corrupted storage */
    }
    setReady(true);
  }, []);

  const signIn = useCallback(async (email, password) => {
    const e = email.trim().toLowerCase();
    const pw = await hashPw(password);

    if (e === DEMO_ACCOUNT.email) {
      const demoPw = readDemoPw() || DEMO_ACCOUNT.password;
      if (pw === (await hashPw(demoPw))) {
        const session = { name: DEMO_ACCOUNT.name, email: DEMO_ACCOUNT.email, role: DEMO_ACCOUNT.role };
        setUser(session);
        persistSession(session);
        return { ok: true };
      }
      return { ok: false, error: "Invalid email or password." };
    }

    const found = readUsers().find((u) => u.email === e && u.password === pw);
    if (!found) return { ok: false, error: "Invalid email or password." };

    const session = { name: found.name, email: found.email, company: found.company, role: "Business customer" };
    setUser(session);
    persistSession(session);
    return { ok: true };
  }, []);

  const signUp = useCallback(async ({ name, company, email, password }) => {
    const e = email.trim().toLowerCase();
    const n = name.trim();
    const c = company.trim();

    if (!n || !e || !password) return { ok: false, error: "Please fill in all required fields." };
    if (password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };
    if (e === DEMO_ACCOUNT.email) return { ok: false, error: "That email is reserved. Please use another address." };

    if (readUsers().some((u) => u.email === e)) {
      return { ok: false, error: "An account with this email already exists. Sign in instead." };
    }

    const pw = await hashPw(password);
    const users = readUsers();
    users.push({ name: n, company: c, email: e, password: pw });
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch {
      /* storage unavailable */
    }

    const session = { name: n, company: c, email: e, role: "Business customer" };
    setUser(session);
    persistSession(session);
    return { ok: true };
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const accountExists = useCallback((email) => {
    const e = email.trim().toLowerCase();
    if (!e) return false;
    if (e === DEMO_ACCOUNT.email) return true;
    return readUsers().some((u) => u.email === e);
  }, []);

  const requestReset = useCallback((email) => {
    const e = email.trim().toLowerCase();
    if (!accountExists(e)) {
      return { ok: false, error: "No account found with that email address — check and try again, or create an account instead." };
    }
    const code = String(Math.floor(100000 + Math.random() * 900000));
    try {
      localStorage.setItem(
        RESET_KEY,
        JSON.stringify({ email: e, code, expires: Date.now() + RESET_TTL })
      );
    } catch {
      return { ok: false, error: "Could not start the reset. Please try again." };
    }
    return { ok: true, code };
  }, [accountExists]);

  const confirmReset = useCallback(({ email, code, password }) => {
    const e = email.trim().toLowerCase();
    if (password.length < 6) return { ok: false, error: "New password must be at least 6 characters." };

    let ticket;
    try {
      ticket = JSON.parse(localStorage.getItem(RESET_KEY));
    } catch {
      ticket = null;
    }
    if (!ticket || ticket.email !== e) {
      return { ok: false, error: "No active reset for this email. Please start over." };
    }
    if (Date.now() > ticket.expires) {
      try { localStorage.removeItem(RESET_KEY); } catch { /* ignore */ }
      return { ok: false, error: "That reset code has expired. Please request a new one." };
    }
    if (String(code).trim() !== ticket.code) {
      return { ok: false, error: "That code is not correct. Please double-check it." };
    }

    return (async () => {
      const pw = await hashPw(password);
      if (e === DEMO_ACCOUNT.email) {
        try { localStorage.setItem(DEMO_PW_KEY, pw); } catch { return { ok: false, error: "Could not save the new password." }; }
      } else {
        const users = readUsers();
        const idx = users.findIndex((u) => u.email === e);
        if (idx === -1) return { ok: false, error: "Account no longer exists." };
        users[idx].password = pw;
        try { localStorage.setItem(USERS_KEY, JSON.stringify(users)); } catch { return { ok: false, error: "Could not save the new password." }; }
      }
      try { localStorage.removeItem(RESET_KEY); } catch { /* ignore */ }
      setUser(null);
      try { localStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
      return { ok: true };
    })();
  }, []);

  const value = useMemo(
    () => ({ user, signIn, signUp, signOut, ready, accountExists, requestReset, confirmReset }),
    [user, signIn, signUp, signOut, ready, accountExists, requestReset, confirmReset]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}