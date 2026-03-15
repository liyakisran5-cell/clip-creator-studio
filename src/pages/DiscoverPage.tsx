import { ArrowLeft, Search, TrendingUp } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

const trendingHashtags = [
  { tag: "#viral" },
  { tag: "#dance" },
  { tag: "#cooking" },
  { tag: "#funny" },
  { tag: "#pakistan" },
  { tag: "#travel" },
  { tag: "#fitness" },
  { tag: "#trending" },
];

export default function DiscoverPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setQuery(q);
  }, [searchParams]);

  return (
    <div className="dark min-h-screen bg-background text-foreground pb-20">
      <div className="flex items-center gap-3 px-4 py-3">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search videos, creators, hashtags..."
            className="w-full bg-muted rounded-full pl-10 pr-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
      </div>

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
                {h.tag}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col items-center justify-center py-20 px-6 text-center gap-3">
        <Search className="w-10 h-10 text-muted-foreground" />
        <p className="font-display font-semibold text-foreground">
          {query ? `No results for "${query}"` : "Search for videos or creators"}
        </p>
        <p className="text-xs text-muted-foreground font-body">
          {query ? "Try a different keyword or hashtag." : "Type above to start searching."}
        </p>
      </div>
    </div>
  );
}
