import { ArrowLeft, Eye, Heart, MessageCircle, Share2, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockVideos } from "@/data/mockVideos";

function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const totalViews = mockVideos.reduce((a, v) => a + v.views, 0);
  const totalLikes = mockVideos.reduce((a, v) => a + v.likes, 0);
  const totalComments = mockVideos.reduce((a, v) => a + v.comments, 0);
  const totalShares = mockVideos.reduce((a, v) => a + v.shares, 0);

  const stats = [
    { label: "Total Views", value: totalViews, icon: Eye, color: "text-tiktok-cyan" },
    { label: "Total Likes", value: totalLikes, icon: Heart, color: "text-tiktok-pink" },
    { label: "Total Comments", value: totalComments, icon: MessageCircle, color: "text-accent" },
    { label: "Total Shares", value: totalShares, icon: Share2, color: "text-foreground" },
  ];

  return (
    <div className="dark min-h-screen bg-background text-foreground pb-20">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <TrendingUp className="w-5 h-5 text-tiktok-pink" />
        <span className="font-display font-bold text-base">Creator Analytics</span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 p-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-4">
            <s.icon className={`w-6 h-6 ${s.color} mb-2`} />
            <p className="font-display font-bold text-xl">{formatCount(s.value)}</p>
            <p className="text-xs text-muted-foreground font-body">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Per video breakdown */}
      <div className="px-4">
        <h3 className="font-display font-bold text-sm mb-3">Video Performance</h3>
        <div className="space-y-3">
          {mockVideos.map((v) => (
            <div key={v.id} className="bg-card rounded-xl border border-border p-3 flex gap-3">
              <div className={`w-14 h-20 rounded-lg bg-gradient-to-br ${v.videoColor} flex-shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="font-body text-xs text-foreground line-clamp-1 mb-2">{v.caption}</p>
                <div className="grid grid-cols-2 gap-1">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground font-display">{formatCount(v.views)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground font-display">{formatCount(v.likes)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground font-display">{formatCount(v.comments)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Share2 className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground font-display">{formatCount(v.shares)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
