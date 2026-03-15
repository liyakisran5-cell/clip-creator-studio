import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Phone, User, Eye, EyeOff, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { RecaptchaVerifier } from "@/lib/firebase";
import { auth, isConfigured } from "@/lib/firebase";

type Mode = "landing" | "email-login" | "email-signup" | "phone" | "otp" | "username-login" | "forgot-password";

export default function AuthPage() {
  const navigate = useNavigate();
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, signInWithPhone, signInWithUsername, forgotPassword, isFirebaseReady } = useAuth();

  const [mode, setMode] = useState<Mode>("landing");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [username, setUsername] = useState("");
  const [confirmResult, setConfirmResult] = useState<{ confirm: (c: string) => Promise<void> } | null>(null);
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const go = (path: string) => navigate(path);

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Google login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    if (!email || !password) return setError("Please fill all fields");
    setError("");
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      navigate("/");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Login failed";
      setError(msg.includes("wrong-password") || msg.includes("user-not-found") ? "Wrong email or password" : msg);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignup = async () => {
    if (!email || !password || !displayName) return setError("Please fill all fields");
    if (password.length < 6) return setError("Password must be at least 6 characters");
    setError("");
    setLoading(true);
    try {
      await signUpWithEmail(email, password, displayName);
      navigate("/username-setup");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Signup failed";
      setError(msg.includes("email-already-in-use") ? "Email already registered. Try logging in." : msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) return setError("Enter a valid phone number with country code");
    setError("");
    setLoading(true);
    try {
      let verifier: RecaptchaVerifier | undefined;
      if (isFirebaseReady && auth && recaptchaRef.current) {
        verifier = new RecaptchaVerifier(auth, recaptchaRef.current, { size: "invisible" });
      }
      const result = await signInWithPhone(phone, verifier as RecaptchaVerifier);
      setConfirmResult(result);
      setMode("otp");
      toast.success("OTP sent successfully!");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to send OTP";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const code = otp.join("");
    if (code.length !== 6) return setError("Enter the complete 6-digit OTP");
    if (!confirmResult) return setError("Please request OTP first");
    setError("");
    setLoading(true);
    try {
      await confirmResult.confirm(code);
      navigate("/username-setup");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid OTP";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleUsernameLogin = async () => {
    if (!username || !password) return setError("Please fill all fields");
    setError("");
    setLoading(true);
    try {
      await signInWithUsername(username, password);
      navigate("/");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) return setError("Enter your email address");
    setError("");
    setLoading(true);
    try {
      await forgotPassword(email);
      setSuccess("Reset link sent! Check your email.");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to send reset email";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpInput = (val: string, idx: number) => {
    const digits = val.replace(/\D/g, "").split("");
    if (digits.length > 1) {
      const newOtp = [...otp];
      digits.slice(0, 6 - idx).forEach((d, i) => { newOtp[idx + i] = d; });
      setOtp(newOtp);
      const next = Math.min(idx + digits.length, 5);
      otpRefs.current[next]?.focus();
    } else {
      const newOtp = [...otp];
      newOtp[idx] = val.replace(/\D/g, "");
      setOtp(newOtp);
      if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
    }
  };

  const inputClass = "w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-tiktok-pink text-sm font-body transition";

  const back = () => setMode("landing");

  return (
    <div className="dark min-h-screen bg-background text-foreground flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-tiktok-pink/20 via-background to-tiktok-cyan/10 pointer-events-none" />
      <div id="recaptcha-container" ref={recaptchaRef} />

      <AnimatePresence mode="wait">
        {mode === "landing" && (
          <motion.div key="landing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="relative z-10 w-full max-w-sm px-6 flex flex-col items-center gap-5">
            <div className="text-center mb-2">
              <h1 className="text-4xl font-display font-black tracking-tight">
                <span className="text-tiktok-pink">Tik</span><span className="text-tiktok-cyan">Tok</span>
              </h1>
              <p className="text-muted-foreground font-body text-sm mt-1">Videos, vibes, and viral moments</p>
            </div>

            {!isFirebaseReady && (
              <div className="w-full bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-300 font-body">Demo mode: Firebase not configured. Login still works with local storage.</p>
              </div>
            )}

            <button data-testid="btn-google-login" onClick={handleGoogle} disabled={loading} className="w-full flex items-center justify-center gap-3 bg-white text-black rounded-xl py-3 font-display font-semibold text-sm hover:bg-white/90 transition">
              <FcGoogle className="w-5 h-5" />
              Continue with Google
            </button>

            <button data-testid="btn-phone-login" onClick={() => setMode("phone")} className="w-full flex items-center justify-center gap-3 bg-white/10 border border-white/20 rounded-xl py-3 font-display font-semibold text-sm hover:bg-white/15 transition">
              <Phone className="w-5 h-5 text-tiktok-pink" />
              Phone Number (OTP)
            </button>

            <button data-testid="btn-email-login" onClick={() => setMode("email-login")} className="w-full flex items-center justify-center gap-3 bg-white/10 border border-white/20 rounded-xl py-3 font-display font-semibold text-sm hover:bg-white/15 transition">
              <Mail className="w-5 h-5 text-tiktok-cyan" />
              Email & Password
            </button>

            <button data-testid="btn-username-login" onClick={() => setMode("username-login")} className="w-full flex items-center justify-center gap-3 bg-white/10 border border-white/20 rounded-xl py-3 font-display font-semibold text-sm hover:bg-white/15 transition">
              <User className="w-5 h-5 text-accent" />
              Username Login
            </button>

            <p className="text-xs text-muted-foreground font-body text-center">
              Don't have an account?{" "}
              <button onClick={() => setMode("email-signup")} className="text-tiktok-pink font-display font-semibold">Sign Up</button>
            </p>
          </motion.div>
        )}

        {mode === "email-login" && (
          <motion.div key="email-login" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="relative z-10 w-full max-w-sm px-6 space-y-4">
            <button onClick={back} className="flex items-center gap-2 text-muted-foreground mb-2"><ArrowLeft className="w-4 h-4" /> Back</button>
            <h2 className="font-display font-bold text-2xl">Login</h2>
            {error && <p className="text-destructive text-sm font-body flex items-center gap-1"><AlertCircle className="w-4 h-4" />{error}</p>}
            <input data-testid="input-email" type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} />
            <div className="relative">
              <input data-testid="input-password" type={showPass ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className={inputClass} onKeyDown={e => e.key === "Enter" && handleEmailLogin()} />
              <button onClick={() => setShowPass(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">{showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
            </div>
            <button onClick={() => { setMode("forgot-password"); setError(""); }} className="text-xs text-tiktok-pink font-display">Forgot password?</button>
            <button data-testid="btn-login-submit" onClick={handleEmailLogin} disabled={loading} className="w-full bg-tiktok-pink rounded-xl py-3 font-display font-bold text-sm hover:opacity-90 transition disabled:opacity-50">
              {loading ? "Logging in..." : "Login"}
            </button>
            <p className="text-xs text-center text-muted-foreground">New here? <button onClick={() => setMode("email-signup")} className="text-tiktok-pink font-display font-semibold">Sign Up</button></p>
          </motion.div>
        )}

        {mode === "email-signup" && (
          <motion.div key="email-signup" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="relative z-10 w-full max-w-sm px-6 space-y-4">
            <button onClick={back} className="flex items-center gap-2 text-muted-foreground mb-2"><ArrowLeft className="w-4 h-4" /> Back</button>
            <h2 className="font-display font-bold text-2xl">Create Account</h2>
            {error && <p className="text-destructive text-sm font-body flex items-center gap-1"><AlertCircle className="w-4 h-4" />{error}</p>}
            <input data-testid="input-displayname" type="text" placeholder="Your name" value={displayName} onChange={e => setDisplayName(e.target.value)} className={inputClass} />
            <input data-testid="input-email" type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} />
            <div className="relative">
              <input data-testid="input-password" type={showPass ? "text" : "password"} placeholder="Password (min 6 chars)" value={password} onChange={e => setPassword(e.target.value)} className={inputClass} />
              <button onClick={() => setShowPass(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">{showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
            </div>
            <button data-testid="btn-signup-submit" onClick={handleEmailSignup} disabled={loading} className="w-full bg-tiktok-pink rounded-xl py-3 font-display font-bold text-sm hover:opacity-90 transition disabled:opacity-50">
              {loading ? "Creating account..." : "Sign Up"}
            </button>
            <p className="text-xs text-center text-muted-foreground">Already have one? <button onClick={() => setMode("email-login")} className="text-tiktok-pink font-display font-semibold">Login</button></p>
          </motion.div>
        )}

        {mode === "phone" && (
          <motion.div key="phone" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="relative z-10 w-full max-w-sm px-6 space-y-4">
            <button onClick={back} className="flex items-center gap-2 text-muted-foreground mb-2"><ArrowLeft className="w-4 h-4" /> Back</button>
            <h2 className="font-display font-bold text-2xl">Phone Login</h2>
            <p className="text-sm text-muted-foreground font-body">We'll send a 6-digit OTP to your number</p>
            {error && <p className="text-destructive text-sm font-body flex items-center gap-1"><AlertCircle className="w-4 h-4" />{error}</p>}
            {!isFirebaseReady && <p className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-xl p-2">Demo: use any number, OTP is 123456</p>}
            <input data-testid="input-phone" type="tel" placeholder="+92 3XX XXXXXXX" value={phone} onChange={e => setPhone(e.target.value)} className={inputClass} />
            <button data-testid="btn-send-otp" onClick={handleSendOtp} disabled={loading} className="w-full bg-tiktok-pink rounded-xl py-3 font-display font-bold text-sm hover:opacity-90 transition disabled:opacity-50">
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </motion.div>
        )}

        {mode === "otp" && (
          <motion.div key="otp" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="relative z-10 w-full max-w-sm px-6 space-y-5">
            <button onClick={() => setMode("phone")} className="flex items-center gap-2 text-muted-foreground mb-2"><ArrowLeft className="w-4 h-4" /> Back</button>
            <div>
              <h2 className="font-display font-bold text-2xl">Enter OTP</h2>
              <p className="text-sm text-muted-foreground font-body mt-1">Sent to <span className="text-foreground">{phone}</span></p>
            </div>
            {error && <p className="text-destructive text-sm font-body flex items-center gap-1"><AlertCircle className="w-4 h-4" />{error}</p>}
            <div className="flex gap-2 justify-center">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  data-testid={`input-otp-${i}`}
                  ref={el => { otpRefs.current[i] = el; }}
                  type="text"
                  maxLength={6}
                  value={digit}
                  onChange={e => handleOtpInput(e.target.value, i)}
                  onKeyDown={e => {
                    if (e.key === "Backspace" && !digit && i > 0) otpRefs.current[i - 1]?.focus();
                  }}
                  className="w-12 h-14 text-center text-xl font-display font-bold bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-tiktok-pink transition"
                />
              ))}
            </div>
            <button data-testid="btn-verify-otp" onClick={handleVerifyOtp} disabled={loading} className="w-full bg-tiktok-pink rounded-xl py-3 font-display font-bold text-sm hover:opacity-90 transition disabled:opacity-50">
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button onClick={() => { setOtp(["","","","","",""]); handleSendOtp(); }} className="w-full text-sm text-muted-foreground font-body">Resend OTP</button>
          </motion.div>
        )}

        {mode === "username-login" && (
          <motion.div key="username-login" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="relative z-10 w-full max-w-sm px-6 space-y-4">
            <button onClick={back} className="flex items-center gap-2 text-muted-foreground mb-2"><ArrowLeft className="w-4 h-4" /> Back</button>
            <h2 className="font-display font-bold text-2xl">Username Login</h2>
            {error && <p className="text-destructive text-sm font-body flex items-center gap-1"><AlertCircle className="w-4 h-4" />{error}</p>}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-display text-sm">@</span>
              <input data-testid="input-username" type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value.replace(/[^a-zA-Z0-9_.]/g, ""))} className={`${inputClass} pl-8`} />
            </div>
            <div className="relative">
              <input data-testid="input-password" type={showPass ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className={inputClass} />
              <button onClick={() => setShowPass(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">{showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
            </div>
            <button data-testid="btn-username-submit" onClick={handleUsernameLogin} disabled={loading} className="w-full bg-tiktok-pink rounded-xl py-3 font-display font-bold text-sm hover:opacity-90 transition disabled:opacity-50">
              {loading ? "Logging in..." : "Login"}
            </button>
          </motion.div>
        )}

        {mode === "forgot-password" && (
          <motion.div key="forgot" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="relative z-10 w-full max-w-sm px-6 space-y-4">
            <button onClick={() => setMode("email-login")} className="flex items-center gap-2 text-muted-foreground mb-2"><ArrowLeft className="w-4 h-4" /> Back</button>
            <h2 className="font-display font-bold text-2xl">Reset Password</h2>
            <p className="text-sm text-muted-foreground font-body">Enter your email and we'll send a reset link</p>
            {error && <p className="text-destructive text-sm font-body flex items-center gap-1"><AlertCircle className="w-4 h-4" />{error}</p>}
            {success && <p className="text-green-400 text-sm font-body flex items-center gap-1"><CheckCircle2 className="w-4 h-4" />{success}</p>}
            <input data-testid="input-reset-email" type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} />
            <button data-testid="btn-reset-submit" onClick={handleForgotPassword} disabled={loading || !!success} className="w-full bg-tiktok-pink rounded-xl py-3 font-display font-bold text-sm hover:opacity-90 transition disabled:opacity-50">
              {loading ? "Sending..." : success ? "Sent!" : "Send Reset Link"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
