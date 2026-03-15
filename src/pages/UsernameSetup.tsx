import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function UsernameSetup() {
  const { setUsername, checkUsernameAvailable, user } = useAuth();
  const navigate = useNavigate();
  const [username, setUsernameVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);

  const handleChange = (val: string) => {
    const clean = val.replace(/[^a-zA-Z0-9_.]/g, "").toLowerCase();
    setUsernameVal(clean);
    setAvailable(null);
    if (clean.length >= 3) {
      setChecking(true);
      setTimeout(() => {
        setAvailable(checkUsernameAvailable(clean));
        setChecking(false);
      }, 500);
    }
  };

  const handleSubmit = async () => {
    if (!username || username.length < 3) return toast.error("Username must be at least 3 characters");
    if (!available) return toast.error("Username not available");
    setLoading(true);
    const ok = await setUsername(username);
    setLoading(false);
    if (ok) {
      toast.success(`Welcome, @${username}! 🎉`);
      navigate("/");
    } else {
      toast.error("Username already taken. Try another.");
      setAvailable(false);
    }
  };

  const skip = () => navigate("/");

  return (
    <div className="dark min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-tiktok-pink/10 via-background to-tiktok-cyan/5 pointer-events-none" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-tiktok-pink/20 flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-tiktok-pink" />
          </div>
          <h1 className="font-display font-black text-2xl">Pick your username</h1>
          <p className="text-muted-foreground font-body text-sm mt-1">This is how people will find you on TikTok</p>
        </div>

        <div className="space-y-2">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-display text-sm">@</span>
            <input
              data-testid="input-username-setup"
              type="text"
              placeholder="your_username"
              value={username}
              onChange={e => handleChange(e.target.value)}
              maxLength={24}
              className="w-full bg-card border border-border rounded-xl px-4 py-3 pl-8 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-tiktok-pink text-sm font-body transition"
            />
            {username.length >= 3 && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {checking ? (
                  <div className="w-4 h-4 rounded-full border-2 border-tiktok-pink border-t-transparent animate-spin" />
                ) : available === true ? (
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                ) : available === false ? (
                  <XCircle className="w-5 h-5 text-destructive" />
                ) : null}
              </div>
            )}
          </div>

          {username.length >= 3 && !checking && available !== null && (
            <p className={`text-xs font-body flex items-center gap-1 ${available ? "text-green-400" : "text-destructive"}`}>
              {available ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
              {available ? `@${username} is available!` : "Username already taken"}
            </p>
          )}

          <p className="text-xs text-muted-foreground font-body">Letters, numbers, underscores, dots. Min 3 chars.</p>
        </div>

        <button
          data-testid="btn-set-username"
          onClick={handleSubmit}
          disabled={loading || !available || username.length < 3}
          className="w-full bg-tiktok-pink rounded-xl py-3 font-display font-bold text-sm hover:opacity-90 transition disabled:opacity-40"
        >
          {loading ? "Setting up..." : "Continue"}
        </button>

        <button data-testid="btn-skip-username" onClick={skip} className="w-full text-sm text-muted-foreground font-body text-center hover:text-foreground transition">
          Skip for now
        </button>
      </motion.div>
    </div>
  );
}
