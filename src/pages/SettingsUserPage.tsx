import { ArrowLeft, Moon, Sun, Lock, Bell, Shield, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function SettingsUserPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [privateAccount, setPrivateAccount] = useState(false);
  const [commentsOff, setCommentsOff] = useState(false);
  const [pushNotifs, setPushNotifs] = useState(true);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-background text-foreground pb-20">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <span className="font-display font-bold text-base">Settings</span>
        </div>

        <div className="p-4 space-y-3">
          {/* Dark/Light Mode */}
          <div className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon className="w-5 h-5 text-tiktok-cyan" /> : <Sun className="w-5 h-5 text-amber-500" />}
              <div>
                <p className="font-display font-semibold text-sm">Dark Mode</p>
                <p className="text-xs text-muted-foreground font-body">Toggle app theme</p>
              </div>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>

          {/* Private Account */}
          <div className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-tiktok-pink" />
              <div>
                <p className="font-display font-semibold text-sm">Private Account</p>
                <p className="text-xs text-muted-foreground font-body">Only followers can see your content</p>
              </div>
            </div>
            <Switch checked={privateAccount} onCheckedChange={setPrivateAccount} />
          </div>

          {/* Comments */}
          <div className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-accent" />
              <div>
                <p className="font-display font-semibold text-sm">Disable Comments</p>
                <p className="text-xs text-muted-foreground font-body">Turn off comments on your videos</p>
              </div>
            </div>
            <Switch checked={commentsOff} onCheckedChange={setCommentsOff} />
          </div>

          {/* Push Notifications */}
          <div className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-tiktok-cyan" />
              <div>
                <p className="font-display font-semibold text-sm">Push Notifications</p>
                <p className="text-xs text-muted-foreground font-body">Get notified for likes, follows & messages</p>
              </div>
            </div>
            <Switch checked={pushNotifs} onCheckedChange={setPushNotifs} />
          </div>

          {/* Analytics link */}
          <button
            onClick={() => navigate("/analytics")}
            className="w-full bg-card rounded-xl border border-border p-4 flex items-center gap-3"
          >
            <TrendingUp className="w-5 h-5 text-tiktok-pink" />
            <div className="text-left">
              <p className="font-display font-semibold text-sm">Creator Analytics</p>
              <p className="text-xs text-muted-foreground font-body">View your performance stats</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
