import { Home, Search, Plus, MessageSquare, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Search, label: "Discover", path: "/discover" },
  { icon: Plus, label: "", path: "/upload", isCreate: true },
  { icon: MessageSquare, label: "Inbox", path: "/inbox" },
  { icon: User, label: "Profile", path: "/profile/@you" },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around py-2 pb-safe bg-background/90 backdrop-blur-md border-t border-foreground/10">
      {navItems.map((item) =>
        item.isCreate ? (
          <button
            key="create"
            onClick={() => navigate(item.path)}
            className="relative flex items-center justify-center w-12 h-8 rounded-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-tiktok-cyan rounded-lg translate-x-[3px]" />
            <div className="absolute inset-0 bg-tiktok-pink rounded-lg -translate-x-[3px]" />
            <div className="relative z-10 bg-foreground rounded-md w-[90%] h-[90%] flex items-center justify-center">
              <Plus className="w-5 h-5 text-background" />
            </div>
          </button>
        ) : (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center gap-0.5"
          >
            <item.icon className={`w-6 h-6 ${location.pathname === item.path ? "text-foreground" : "text-foreground/50"}`} />
            <span className={`text-[10px] font-display ${location.pathname === item.path ? "text-foreground" : "text-foreground/50"}`}>
              {item.label}
            </span>
          </button>
        )
      )}
    </nav>
  );
}
