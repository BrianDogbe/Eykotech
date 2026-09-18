import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const USERS_KEY = "eyko_users";
const SESSION_KEY = "eyko_user";

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

    if (e === DEMO_ACCOUNT.email && pw === (await hashPw(DEMO_ACCOUNT.password))) {
      const session = { name: DEMO_ACCOUNT.name, email: DEMO_ACCOUNT.email, role: DEMO_ACCOUNT.role };
      setUser(session);
      persistSession(session);
      return { ok: true };
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

  const value = useMemo(
    () => ({ user, signIn, signUp, signOut, ready }),
    [user, signIn, signUp, signOut, ready]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}