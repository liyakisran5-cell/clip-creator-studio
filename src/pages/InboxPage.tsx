import { ArrowLeft, Heart, MessageCircle, UserPlus, Play, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockMessages } from "@/data/mockVideos";
import { useState } from "react";

const notifications = [
  { id: "n1", type: "like" as const, user: "@dance_queen", text: "liked your video", time: "2m", videoColor: "from-rose-600 to-pink-500" },
  { id: "n2", type: "comment" as const, user: "@comedy_king", text: 'commented: "So funny 😂"', time: "15m", videoColor: "from-violet-600 to-purple-500" },
  { id: "n3", type: "follow" as const, user: "@travel_pk", text: "started following you", time: "1h", videoColor: "" },
  { id: "n4", type: "like" as const, user: "@foodie_life", text: "liked your video", time: "2h", videoColor: "from-amber-500 to-yellow-400" },
  { id: "n5", type: "comment" as const, user: "@fitness_guru", text: 'commented: "Great work 💪"', time: "4h", videoColor: "from-blue-600 to-sky-500" },
  { id: "n6", type: "follow" as const, user: "@music_lover", text: "started following you", time: "6h", videoColor: "" },
];

const iconMap = { like: Heart, comment: MessageCircle, follow: UserPlus };
const colorMap = { like: "text-tiktok-pink", comment: "text-tiktok-cyan", follow: "text-primary" };

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

      {/* Tabs */}
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

      {tab === "notifications" ? (
        <div className="divide-y divide-border">
          {notifications.map((n) => {
            const Icon = iconMap[n.type];
            return (
              <div key={n.id} className="flex items-center gap-3 px-4 py-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <Icon className={`w-5 h-5 ${colorMap[n.type]}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body">
                    <span className="font-display font-semibold">{n.user}</span>{" "}
                    <span className="text-muted-foreground">{n.text}</span>
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{n.time}</p>
                </div>
                {n.videoColor && (
                  <div className={`w-10 h-14 rounded bg-gradient-to-br ${n.videoColor} flex-shrink-0`} />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="divide-y divide-border">
          {mockMessages.map((m) => (
            <button
              key={m.id}
              onClick={() => navigate(`/dm/${encodeURIComponent(m.username)}`)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition text-left"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-tiktok-pink to-tiktok-cyan flex items-center justify-center text-foreground font-display font-bold text-sm flex-shrink-0">
                {m.displayName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-display font-semibold text-sm">{m.displayName}</p>
                  <span className="text-[10px] text-muted-foreground">{m.time}</span>
                </div>
                <p className="text-xs text-muted-foreground font-body truncate">{m.lastMessage}</p>
              </div>
              {m.unread > 0 && (
                <div className="w-5 h-5 rounded-full bg-tiktok-pink flex items-center justify-center">
                  <span className="text-[10px] text-primary-foreground font-display font-bold">{m.unread}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
