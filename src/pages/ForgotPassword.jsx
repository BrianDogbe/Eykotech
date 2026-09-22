import { useEffect, useState } from "react";
import { useAuth } from "../useAuth";
import { go } from "../useHashRoute";
import { Button } from "../components/ui/Button";

const inputCls =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-mute focus:border-primary/25";

export function ForgotPasswordPage() {
  const { requestReset, confirmReset } = useAuth();
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [mockCode, setMockCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setError("");
  }, [email, code, password, confirm]);

  const handleRequest = async (e) => {
    e.preventDefault();
    if (busy) return;
    setError("");
    setBusy(true);
    await new Promise((r) => setTimeout(r, 450));
    const res = requestReset(email);
    setBusy(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setMockCode(res.code);
    setStep("code");
  };

  const handleCode = (e) => {
    e.preventDefault();
    if (busy) return;
    setError("");
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      if (code.trim() !== mockCode) {
        setError("That code is not correct. Please double-check it.");
        return;
      }
      setStep("password");
    }, 350);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (busy) return;
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setBusy(true);
    await new Promise((r) => setTimeout(r, 500));
    const res = confirmReset({ email, code, password });
    setBusy(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setStep("done");
  };

  const input = (props) => <input {...props} className={inputCls} />;

  return (
    <div className="relative min-h-dvh overflow-hidden bg-surface">
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-accent/10 blur-[110px]" style={{ animation: "drift-b 22s ease-in-out infinite" }} />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-[420px] w-[420px] rounded-full bg-cyan/10 blur-[110px]" style={{ animation: "drift-a 26s ease-in-out infinite" }} />

      <main className="relative z-10 flex min-h-dvh items-center justify-center px-5 py-10">
        <div className="w-full max-w-md overflow-hidden rounded-[2rem] bg-surface ring-1 ring-line shadow-[0_40px_90px_-30px_rgba(10,20,40,0.45)]">
          <div className="p-8 md:p-10">
            <a href="#top" className="flex items-center gap-2.5 md:hidden">
              <img src="/assets/img/logo.png" alt="Eykotech" className="h-8 w-auto" />
              <span className="font-display text-lg font-extrabold tracking-tight text-ink">Eykotech</span>
            </a>

            {step === "done" ? (
              <>
                <div className="mt-8 md:mt-0">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-500/15 text-emerald-600" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <h2 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-ink">
                    Password updated
                  </h2>
                  <p className="mt-1.5 text-sm text-mute">
                    Your password has been reset. You can now sign in with your new password.
                  </p>
                </div>

                <div className="mt-8 grid gap-2">
                  <Button variant="primary" href="#/login" className="rounded-full py-3 text-sm">
                    Back to sign in
                  </Button>
                  <Button variant="quiet" href="#top" className="rounded-xl py-3 text-sm">
                    Continue browsing
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h2 className="mt-8 font-display text-2xl font-extrabold tracking-tight text-ink md:mt-0">
                  {step === "email" ? "Reset your password" : step === "code" ? "Check your inbox" : "Create a new password"}
                </h2>
                <p className="mt-1.5 text-sm text-mute">
                  {step === "email" &&
                    "Enter the email linked to your account and we'll send you a reset code."}
                  {step === "code" &&
                    "A six-digit code was sent to your inbox. Enter it below to continue."}
                  {step === "password" &&
                    "Choose a new password for your Eykotech account."}
                </p>

                {step === "email" && (
                  <form onSubmit={handleRequest} className="mt-8 space-y-4">
                    <div>
                      <label htmlFor="reset-email" className="mb-1.5 block text-xs font-semibold text-ink/85">
                        Email address
                      </label>
                      {input({
                        id: "reset-email",
                        type: "email",
                        required: true,
                        autoComplete: "email",
                        placeholder: "you@company.de",
                        value: email,
                        onChange: (e) => setEmail(e.target.value),
                      })}
                    </div>

                    {error && (
                      <p role="alert" className="rounded-xl bg-rose-500/10 px-4 py-2.5 text-xs font-medium text-rose-600 ring-1 ring-rose-500/20">
                        {error}
                      </p>
                    )}

                    <Button type="submit" variant="primary" disabled={busy} className="w-full rounded-full py-3.5 text-sm">
                      {busy ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />
                          Sending code…
                        </>
                      ) : (
                        "Send reset code"
                      )}
                    </Button>
                  </form>
                )}

                {step === "code" && (
                  <form onSubmit={handleCode} className="mt-8 space-y-4">
                    <div className="rounded-xl bg-amber-500/10 px-4 py-3 text-xs leading-relaxed text-amber-700 ring-1 ring-amber-500/20">
                      <span className="font-semibold">Demo notice:</span> this storefront has no mail server, so
                      your reset code is shown here instead of being emailed:{" "}
                      <span className="ml-1 rounded bg-amber-100 px-1.5 py-0.5 font-mono text-sm font-bold tracking-widest">
                        {mockCode}
                      </span>
                    </div>

                    <div>
                      <label htmlFor="reset-code" className="mb-1.5 block text-xs font-semibold text-ink/85">
                        Reset code
                      </label>
                      {input({
                        id: "reset-code",
                        type: "text",
                        required: true,
                        inputMode: "numeric",
                        autoComplete: "one-time-code",
                        placeholder: "123456",
                        value: code,
                        onChange: (e) => setCode(e.target.value.replace(/[^0-9]/g, "")),
                        className: `${inputCls} tracking-[0.35em]`,
                      })}
                    </div>

                    {error && (
                      <p role="alert" className="rounded-xl bg-rose-500/10 px-4 py-2.5 text-xs font-medium text-rose-600 ring-1 ring-rose-500/20">
                        {error}
                      </p>
                    )}

                    <Button type="submit" variant="primary" disabled={busy || code.length !== 6} className="w-full rounded-full py-3.5 text-sm">
                      {busy ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />
                          Verifying…
                        </>
                      ) : (
                        "Verify code"
                      )}
                    </Button>

                    <button
                      type="button"
                      onClick={() => setStep("email")}
                      className="w-full text-center text-xs font-semibold text-mute transition-colors hover:text-ink hover:underline"
                    >
                      ← Use a different email
                    </button>
                  </form>
                )}

                {step === "password" && (
                  <form onSubmit={handleReset} className="mt-8 space-y-4">
                    <div>
                      <label htmlFor="new-password" className="mb-1.5 block text-xs font-semibold text-ink/85">
                        New password
                      </label>
                      <div className="relative">
                        {input({
                          id: "new-password",
                          type: showPw ? "text" : "password",
                          required: true,
                          minLength: 6,
                          autoComplete: "new-password",
                          placeholder: "At least 6 characters",
                          value: password,
                          onChange: (e) => setPassword(e.target.value),
                        })}
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

                    <div>
                      <label htmlFor="confirm-password" className="mb-1.5 block text-xs font-semibold text-ink/85">
                        Confirm password
                      </label>
                      {input({
                        id: "confirm-password",
                        type: showPw ? "text" : "password",
                        required: true,
                        minLength: 6,
                        autoComplete: "new-password",
                        placeholder: "Repeat your password",
                        value: confirm,
                        onChange: (e) => setConfirm(e.target.value),
                      })}
                    </div>

                    {error && (
                      <p role="alert" className="rounded-xl bg-rose-500/10 px-4 py-2.5 text-xs font-medium text-rose-600 ring-1 ring-rose-500/20">
                        {error}
                      </p>
                    )}

                    <Button type="submit" variant="primary" disabled={busy} className="w-full rounded-full py-3.5 text-sm">
                      {busy ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />
                          Saving…
                        </>
                      ) : (
                        "Set new password"
                      )}
                    </Button>
                  </form>
                )}

                <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-mute sm:flex-row">
                  <a href="#/login" className="font-semibold text-mute transition-colors hover:text-ink hover:underline">
                    ← Back to sign in
                  </a>
                  <span className="text-center">
                    Just remembered?{" "}
                    <a href="#/signup" className="font-semibold text-primary hover:underline">
                      Create an account
                    </a>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}