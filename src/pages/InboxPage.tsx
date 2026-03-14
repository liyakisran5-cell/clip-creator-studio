import { ArrowLeft, Heart, MessageCircle, UserPlus, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const notifications = [
  { id: "n1", type: "like" as const, user: "@dance_queen", text: "liked your video", time: "2m", videoColor: "from-rose-600 to-pink-500" },
  { id: "n2", type: "comment" as const, user: "@comedy_king", text: 'commented: "So funny 😂"', time: "15m", videoColor: "from-violet-600 to-purple-500" },
  { id: "n3", type: "follow" as const, user: "@travel_pk", text: "started following you", time: "1h", videoColor: "" },
  { id: "n4", type: "like" as const, user: "@foodie_life", text: "liked your video", time: "2h", videoColor: "from-amber-500 to-yellow-400" },
  { id: "n5", type: "comment" as const, user: "@fitness_guru", text: 'commented: "Great work 💪"', time: "4h", videoColor: "from-blue-600 to-sky-500" },
  { id: "n6", type: "follow" as const, user: "@music_lover", text: "started following you", time: "6h", videoColor: "" },
  { id: "n7", type: "like" as const, user: "@art_vibes", text: "liked your video", time: "8h", videoColor: "from-emerald-500 to-teal-400" },
  { id: "n8", type: "comment" as const, user: "@gamer_zone", text: 'commented: "Amazing!"', time: "1d", videoColor: "from-rose-600 to-pink-500" },
  { id: "n9", type: "follow" as const, user: "@street_food", text: "started following you", time: "1d", videoColor: "" },
  { id: "n10", type: "like" as const, user: "@dance_queen", text: "and 5 others liked your video", time: "2d", videoColor: "from-violet-600 to-purple-500" },
];

const iconMap = {
  like: Heart,
  comment: MessageCircle,
  follow: UserPlus,
};

const colorMap = {
  like: "text-tiktok-pink",
  comment: "text-tiktok-cyan",
  follow: "text-primary",
};

export default function InboxPage() {
  const navigate = useNavigate();

  return (
    <div className="dark min-h-screen bg-background text-foreground pb-20">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <span className="font-display font-bold text-base">Notifications</span>
      </div>

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
    </div>
  );
}
