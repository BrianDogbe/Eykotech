import { useEffect, useState } from "react";
import { useAuth } from "../useAuth";
import { go } from "../useHashRoute";
import { Button } from "../components/ui/Button";

const inputCls =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-mute focus:border-primary focus:ring-2 focus:ring-primary/20";

export function LoginPage() {
  const { user, signIn, signOut, ready } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setError("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setError("");
    setBusy(true);
    await new Promise((r) => setTimeout(r, 450));
    const res = await signIn(email, password);
    if (!res.ok) {
      setError(res.error);
      setBusy(false);
      return;
    }
    go("");
  };

  return (
    <div className="relative min-h-dvh overflow-hidden bg-surface">
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-accent/10 blur-[110px]" style={{ animation: "drift-b 22s ease-in-out infinite" }} />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-[420px] w-[420px] rounded-full bg-cyan/10 blur-[110px]" style={{ animation: "drift-a 26s ease-in-out infinite" }} />

      <main className="relative z-10 flex min-h-dvh items-center justify-center px-5 py-10">
        <div className="w-full max-w-md overflow-hidden rounded-[2rem] bg-surface ring-1 ring-line shadow-[0_40px_90px_-30px_rgba(10,20,40,0.45)]">
          {/* Form panel */}
          <div className="p-8 md:p-10">
            <a href="#top" className="flex items-center gap-2.5 md:hidden">
              <img src="/assets/img/logo.png" alt="Eykotech" className="h-8 w-auto" />
              <span className="font-display text-lg font-extrabold tracking-tight text-ink">Eykotech</span>
            </a>

            <h2 className="mt-8 font-display text-2xl font-extrabold tracking-tight text-ink md:mt-0">
              {user ? `Welcome back, ${user.name.split(" ")[0]}` : "Sign in"}
            </h2>
            <p className="mt-1.5 text-sm text-mute">
              {user
                ? "Your session is active. Continue where you left off."
                : "Business portal access for Eykotech procurement & IT accounts."}
            </p>

            {user ? (
              <div className="mt-8 rounded-2xl bg-surface2 p-6 text-center ring-1 ring-line">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary font-display text-xl font-extrabold text-white">
                  {user.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <p className="mt-4 font-bold text-ink">{user.name}</p>
                <p className="font-mono text-xs text-mute">{user.email}</p>
                <p className="mt-0.5 font-mono text-xs text-primary">{user.role}</p>
                <div className="mt-6 grid gap-2">
                  <Button
                    variant="primary"
                    href="#top"
                    className="rounded-xl py-3 text-sm"
                  >
                    Continue browsing →
                  </Button>
                  <Button
                    variant="quiet"
                    onClick={() => signOut()}
                    className="rounded-xl py-3 text-sm"
                  >
                    Sign out
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div>
                  <label htmlFor="login-email" className="mb-1.5 block text-xs font-semibold text-ink/85">
                    Email address
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.de"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputCls}
                  />
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label htmlFor="login-password" className="block text-xs font-semibold text-ink/85">
                      Password
                    </label>
                    <a href="mailto:info@eykotech.com?subject=Password%20reset" className="text-xs font-medium text-primary hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      id="login-password"
                      type={showPw ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={inputCls}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      aria-label={showPw ? "Hide password" : "Show password"}
                      className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-mute transition-colors hover:text-ink hover:bg-surface2"
                    >
                      {showPw ? "🙈" : "👁"}
                    </button>
                  </div>
                </div>

                {error && (
                  <p role="alert" className="rounded-xl bg-rose-500/10 px-4 py-2.5 text-xs font-medium text-rose-600 ring-1 ring-rose-500/20">
                    {error}
                  </p>
                )}

                <label className="flex cursor-pointer items-center gap-2 text-xs text-mute">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-line accent-primary"
                  />
                  Keep me signed in on this device
                </label>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={busy}
                  className="w-full rounded-xl py-3.5 text-sm"
                >
                  {busy ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />
                      Signing in…
                    </>
                  ) : (
                    "Sign in →"
                  )}
                </Button>
              </form>
            )}

            <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-mute sm:flex-row">
              <a href="#top" className="font-semibold text-mute transition-colors hover:text-ink hover:underline">
                ← Back to website
              </a>
              <span className="text-center">
                Don't have an account?{" "}
                <a href="#/signup" className="font-semibold text-primary hover:underline">
                  Create an account
                </a>
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}