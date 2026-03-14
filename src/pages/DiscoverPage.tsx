import { ArrowLeft, Search, TrendingUp, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockVideos } from "@/data/mockVideos";
import { useState } from "react";

const trendingHashtags = [
  { tag: "#viral", views: "2.5B" },
  { tag: "#dance", views: "1.8B" },
  { tag: "#cooking", views: "900M" },
  { tag: "#funny", views: "3.1B" },
  { tag: "#pakistan", views: "450M" },
  { tag: "#travel", views: "1.2B" },
  { tag: "#fitness", views: "780M" },
  { tag: "#trending", views: "5B" },
];

export default function DiscoverPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filtered = query
    ? mockVideos.filter(
        (v) =>
          v.caption.toLowerCase().includes(query.toLowerCase()) ||
          v.username.toLowerCase().includes(query.toLowerCase())
      )
    : mockVideos;

  return (
    <div className="dark min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search videos, creators..."
            className="w-full bg-muted rounded-full pl-10 pr-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
      </div>

      {/* Trending hashtags */}
      {!query && (
        <div className="px-4 mb-4">
          <h3 className="font-display font-bold text-sm mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-tiktok-pink" />
            Trending
          </h3>
          <div className="flex flex-wrap gap-2">
            {trendingHashtags.map((h) => (
              <button
                key={h.tag}
                onClick={() => setQuery(h.tag.replace("#", ""))}
                className="bg-muted rounded-full px-3 py-1.5 text-xs font-display text-foreground hover:bg-muted-foreground/20 transition"
              >
                {h.tag} <span className="text-muted-foreground ml-1">{h.views}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Video grid */}
      <div className="grid grid-cols-2 gap-1 px-1">
        {filtered.map((v) => (
          <div key={v.id} className={`aspect-[9/16] bg-gradient-to-br ${v.videoColor} relative rounded-lg overflow-hidden group cursor-pointer`} onClick={() => navigate("/")}>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-xs font-body text-foreground line-clamp-2 mb-1">{v.caption}</p>
              <div className="flex items-center gap-1">
                <Play className="w-3 h-3 text-foreground fill-foreground" />
                <span className="text-[10px] font-display text-foreground">{(v.likes / 1000).toFixed(0)}K</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
