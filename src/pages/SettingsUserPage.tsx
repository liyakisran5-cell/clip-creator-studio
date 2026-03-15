import { ArrowLeft, Moon, Sun, Lock, Bell, Shield, TrendingUp, Instagram, Youtube, Facebook, Smartphone, LogOut, Trash2, Link2, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function SettingsUserPage() {
  const navigate = useNavigate();
  const { user, updateSocialLinks, logoutDevice, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(true);
  const [privateAccount, setPrivateAccount] = useState(false);
  const [commentsOff, setCommentsOff] = useState(false);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [showSocialDialog, setShowSocialDialog] = useState(false);
  const [showDevicesDialog, setShowDevicesDialog] = useState(false);
  const [instagram, setInstagram] = useState(user?.socialLinks?.instagram || "");
  const [youtube, setYoutube] = useState(user?.socialLinks?.youtube || "");
  const [facebook, setFacebook] = useState(user?.socialLinks?.facebook || "");

  const mockDevices = user?.devices?.length
    ? user.devices
    : [
        { id: "d1", name: "Mobile Device", browser: "Chrome", os: "Android", location: "Lahore, Pakistan", lastActive: new Date().toISOString(), isCurrent: true },
        { id: "d2", name: "Desktop", browser: "Firefox", os: "Windows", location: "Karachi, Pakistan", lastActive: new Date(Date.now() - 86400000).toISOString(), isCurrent: false },
      ];

  const saveSocialLinks = () => {
    updateSocialLinks({ instagram: instagram || undefined, youtube: youtube || undefined, facebook: facebook || undefined });
    setShowSocialDialog(false);
    toast.success("Social links updated!");
  };

  const handleLogoutDevice = (id: string, isCurrent: boolean) => {
    if (isCurrent) {
      toast.info("You can't logout your current device from here");
      return;
    }
    logoutDevice(id);
    toast.success("Device logged out successfully");
  };

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  const formatLastActive = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground pb-20">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <button onClick={() => navigate(-1)} data-testid="btn-back-settings">
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <span className="font-display font-bold text-base">Settings</span>
        </div>

        <div className="p-4 space-y-3">
          {user && (
            <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tiktok-pink to-tiktok-cyan flex items-center justify-center text-foreground font-display font-bold">
                {(user.displayName || user.username || "U").charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="font-display font-semibold text-sm">{user.displayName || user.username || "User"}</p>
                <p className="text-xs text-muted-foreground font-body">{user.email || user.phoneNumber || `@${user.username}`}</p>
              </div>
            </div>
          )}

          <div className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon className="w-5 h-5 text-tiktok-cyan" /> : <Sun className="w-5 h-5 text-amber-500" />}
              <div>
                <p className="font-display font-semibold text-sm">Dark Mode</p>
                <p className="text-xs text-muted-foreground font-body">Toggle app theme</p>
              </div>
            </div>
            <Switch data-testid="switch-dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
          </div>

          <div className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-tiktok-pink" />
              <div>
                <p className="font-display font-semibold text-sm">Private Account</p>
                <p className="text-xs text-muted-foreground font-body">Only followers can see your content</p>
              </div>
            </div>
            <Switch data-testid="switch-private" checked={privateAccount} onCheckedChange={setPrivateAccount} />
          </div>

          <div className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-accent" />
              <div>
                <p className="font-display font-semibold text-sm">Disable Comments</p>
                <p className="text-xs text-muted-foreground font-body">Turn off comments on your videos</p>
              </div>
            </div>
            <Switch data-testid="switch-comments" checked={commentsOff} onCheckedChange={setCommentsOff} />
          </div>

          <div className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-tiktok-cyan" />
              <div>
                <p className="font-display font-semibold text-sm">Push Notifications</p>
                <p className="text-xs text-muted-foreground font-body">Get notified for likes, follows & messages</p>
              </div>
            </div>
            <Switch data-testid="switch-notifs" checked={pushNotifs} onCheckedChange={setPushNotifs} />
          </div>

          <button data-testid="btn-social-links" onClick={() => setShowSocialDialog(true)} className="w-full bg-card rounded-xl border border-border p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link2 className="w-5 h-5 text-tiktok-cyan" />
              <div className="text-left">
                <p className="font-display font-semibold text-sm">Social Media Links</p>
                <p className="text-xs text-muted-foreground font-body">Instagram, YouTube, Facebook</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>

          <button data-testid="btn-device-management" onClick={() => setShowDevicesDialog(true)} className="w-full bg-card rounded-xl border border-border p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-tiktok-pink" />
              <div className="text-left">
                <p className="font-display font-semibold text-sm">Device Management</p>
                <p className="text-xs text-muted-foreground font-body">Manage active login sessions</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-tiktok-pink/20 text-tiktok-pink font-display font-semibold px-2 py-0.5 rounded-full">{mockDevices.length}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </button>

          <button data-testid="btn-analytics" onClick={() => navigate("/analytics")} className="w-full bg-card rounded-xl border border-border p-4 flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-tiktok-pink" />
            <div className="text-left">
              <p className="font-display font-semibold text-sm">Creator Analytics</p>
              <p className="text-xs text-muted-foreground font-body">View your performance stats</p>
            </div>
          </button>

          <button data-testid="btn-logout" onClick={handleLogout} className="w-full bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex items-center gap-3 hover:bg-destructive/20 transition">
            <LogOut className="w-5 h-5 text-destructive" />
            <p className="font-display font-semibold text-sm text-destructive">Logout</p>
          </button>
        </div>
      </div>

      <Dialog open={showSocialDialog} onOpenChange={setShowSocialDialog}>
        <DialogContent className="dark bg-card border border-border text-foreground max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="font-display font-bold">Social Media Links</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Instagram className="w-5 h-5 text-pink-400 flex-shrink-0" />
              <input
                data-testid="input-instagram"
                type="text"
                placeholder="instagram.com/username"
                value={instagram}
                onChange={e => setInstagram(e.target.value)}
                className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm font-body focus:outline-none focus:border-tiktok-pink"
              />
            </div>
            <div className="flex items-center gap-3">
              <Youtube className="w-5 h-5 text-red-400 flex-shrink-0" />
              <input
                data-testid="input-youtube"
                type="text"
                placeholder="youtube.com/@channel"
                value={youtube}
                onChange={e => setYoutube(e.target.value)}
                className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm font-body focus:outline-none focus:border-tiktok-pink"
              />
            </div>
            <div className="flex items-center gap-3">
              <Facebook className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <input
                data-testid="input-facebook"
                type="text"
                placeholder="facebook.com/username"
                value={facebook}
                onChange={e => setFacebook(e.target.value)}
                className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm font-body focus:outline-none focus:border-tiktok-pink"
              />
            </div>
            <button data-testid="btn-save-social" onClick={saveSocialLinks} className="w-full bg-tiktok-pink rounded-xl py-3 font-display font-bold text-sm">Save Links</button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showDevicesDialog} onOpenChange={setShowDevicesDialog}>
        <DialogContent className="dark bg-card border border-border text-foreground max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="font-display font-bold">Active Devices</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {mockDevices.map((device) => (
              <div key={device.id} data-testid={`device-card-${device.id}`} className={`rounded-xl border p-3 ${device.isCurrent ? "border-tiktok-cyan/50 bg-tiktok-cyan/5" : "border-border"}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <Smartphone className={`w-5 h-5 mt-0.5 ${device.isCurrent ? "text-tiktok-cyan" : "text-muted-foreground"}`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-display font-semibold text-sm">{device.name}</p>
                        {device.isCurrent && <span className="text-[10px] bg-tiktok-cyan/20 text-tiktok-cyan font-display font-semibold px-1.5 py-0.5 rounded-full">Current</span>}
                      </div>
                      <p className="text-xs text-muted-foreground font-body">{device.browser} · {device.os}</p>
                      <p className="text-xs text-muted-foreground font-body">{device.location}</p>
                      <p className="text-[10px] text-muted-foreground font-body mt-0.5">{formatLastActive(device.lastActive)}</p>
                    </div>
                  </div>
                  {!device.isCurrent && (
                    <button
                      data-testid={`btn-logout-device-${device.id}`}
                      onClick={() => handleLogoutDevice(device.id, device.isCurrent)}
                      className="flex items-center gap-1 text-destructive hover:bg-destructive/10 rounded-lg px-2 py-1 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="text-xs font-display">Logout</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
