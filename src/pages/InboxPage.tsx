import { ArrowLeft, Bell, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function InboxPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"notifications" | "messages">("notifications");

  return (
    <div className="dark min-h-screen bg-background text-foreground pb-20">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <span className="font-display font-bold text-base">Inbox</span>
      </div>

      <div className="flex border-b border-border">
        <button
          onClick={() => setTab("notifications")}
          className={`flex-1 py-3 text-sm font-display font-semibold text-center ${tab === "notifications" ? "border-b-2 border-foreground text-foreground" : "text-muted-foreground"}`}
        >
          Notifications
        </button>
        <button
          onClick={() => setTab("messages")}
          className={`flex-1 py-3 text-sm font-display font-semibold text-center ${tab === "messages" ? "border-b-2 border-foreground text-foreground" : "text-muted-foreground"}`}
        >
          Messages
        </button>
      </div>

      <div className="flex flex-col items-center justify-center py-24 px-6 text-center gap-3">
        {tab === "notifications" ? (
          <>
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
              <Bell className="w-7 h-7 text-muted-foreground" />
            </div>
            <p className="font-display font-semibold text-foreground">No Notifications</p>
            <p className="text-xs text-muted-foreground font-body">
              When someone likes, comments, or follows you, it will show up here.
            </p>
          </>
        ) : (
          <>
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
              <MessageCircle className="w-7 h-7 text-muted-foreground" />
            </div>
            <p className="font-display font-semibold text-foreground">No Messages</p>
            <p className="text-xs text-muted-foreground font-body">
              Your conversations will appear here.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
