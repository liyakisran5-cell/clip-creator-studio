import { ArrowLeft, Eye, Heart, MessageCircle, Share2, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

const stats = [
  { label: "Total Views", value: 0, icon: Eye, color: "text-tiktok-cyan" },
  { label: "Total Likes", value: 0, icon: Heart, color: "text-tiktok-pink" },
  { label: "Total Comments", value: 0, icon: MessageCircle, color: "text-accent" },
  { label: "Total Shares", value: 0, icon: Share2, color: "text-foreground" },
];

export default function AnalyticsPage() {
  const navigate = useNavigate();

  return (
    <div className="dark min-h-screen bg-background text-foreground pb-20">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <TrendingUp className="w-5 h-5 text-tiktok-pink" />
        <span className="font-display font-bold text-base">Creator Analytics</span>
      </div>

      <div className="grid grid-cols-2 gap-3 p-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-4">
            <s.icon className={`w-6 h-6 ${s.color} mb-2`} />
            <p className="font-display font-bold text-xl">{formatCount(s.value)}</p>
            <p className="text-xs text-muted-foreground font-body">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="px-4">
        <h3 className="font-display font-bold text-sm mb-3">Video Performance</h3>
        <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
          <TrendingUp className="w-10 h-10 text-muted-foreground" />
          <p className="font-display font-semibold text-foreground">No Videos Yet</p>
          <p className="text-xs text-muted-foreground font-body">
            Upload videos to see your analytics here.
          </p>
        </div>
      </div>
    </div>
  );
}
