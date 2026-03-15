import { useState } from "react";
import { ArrowLeft, Search, Play, Music2, TrendingUp, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockSounds, Sound } from "@/data/sounds";
import BottomNav from "@/components/tiktok/BottomNav";
import { toast } from "sonner";

function formatUses(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

const CATEGORIES = ["All", "Trending", "Pop", "Desi", "HipHop", "Classical", "Remix"] as const;

export default function SoundsLibraryPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [playing, setPlaying] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const filtered = mockSounds.filter((s) => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) || s.artist.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || s.category.toLowerCase() === activeCategory.toLowerCase();
    return matchSearch && matchCat;
  });

  const togglePlay = (id: string) => {
    setPlaying((p) => (p === id ? null : id));
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast.success("Removed from favorites");
      } else {
        next.add(id);
        toast.success("Added to favorites ❤️");
      }
      return next;
    });
  };

  const useSound = (sound: Sound) => {
    toast.success(`"${sound.title}" selected for your video!`);
    navigate("/upload");
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground pb-20">
      <div className="sticky top-0 z-30 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => navigate(-1)} data-testid="btn-back-sounds">
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <span className="font-display font-bold text-base flex-1">Sounds Library</span>
          <Music2 className="w-5 h-5 text-tiktok-pink" />
        </div>

        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              data-testid="input-sounds-search"
              type="text"
              placeholder="Search sounds, artists..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm font-body focus:outline-none focus:border-tiktok-pink transition"
            />
          </div>
        </div>

        <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              data-testid={`btn-category-${cat.toLowerCase()}`}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-display font-semibold transition ${
                activeCategory === cat
                  ? "bg-tiktok-pink text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {activeCategory === "All" && search === "" && (
        <div className="px-4 py-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-tiktok-pink" />
            <span className="font-display font-semibold text-sm">Trending Now</span>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2">
            {mockSounds.filter(s => s.category === "trending").map((s) => (
              <div key={s.id} className="flex-shrink-0 w-28">
                <div className={`w-28 h-28 rounded-2xl bg-gradient-to-br ${s.coverColor} flex items-center justify-center mb-2 relative cursor-pointer`} onClick={() => togglePlay(s.id)}>
                  {playing === s.id ? (
                    <div className="flex gap-0.5 items-end h-8">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className="w-1.5 bg-white rounded-full animate-pulse" style={{ height: `${20 + i * 4}px`, animationDelay: `${i * 100}ms` }} />
                      ))}
                    </div>
                  ) : (
                    <Music2 className="w-8 h-8 text-white" />
                  )}
                </div>
                <p className="text-xs font-display font-semibold truncate">{s.title}</p>
                <p className="text-[10px] text-muted-foreground font-body truncate">{formatUses(s.uses)} uses</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="px-4 space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground font-body">
            <Music2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No sounds found</p>
          </div>
        )}
        {filtered.map((sound) => (
          <div key={sound.id} data-testid={`sound-card-${sound.id}`} className="bg-card border border-border rounded-xl p-3 flex items-center gap-3">
            <button onClick={() => togglePlay(sound.id)} data-testid={`btn-play-${sound.id}`} className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sound.coverColor} flex items-center justify-center flex-shrink-0 relative`}>
              {playing === sound.id ? (
                <div className="flex gap-0.5 items-end h-5">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-1 bg-white rounded-full animate-pulse" style={{ height: `${8 + i * 3}px`, animationDelay: `${i * 100}ms` }} />
                  ))}
                </div>
              ) : (
                <Play className="w-5 h-5 text-white fill-white" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <p className="font-display font-semibold text-sm truncate">{sound.title}</p>
              <p className="text-xs text-muted-foreground font-body truncate">{sound.artist}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-tiktok-pink font-display">{formatUses(sound.uses)} videos</span>
                <span className="text-[10px] text-muted-foreground font-body">{sound.duration}</span>
                {sound.bpm && <span className="text-[10px] text-muted-foreground font-body">{sound.bpm} BPM</span>}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                data-testid={`btn-fav-${sound.id}`}
                onClick={() => toggleFavorite(sound.id)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition ${favorites.has(sound.id) ? "text-tiktok-pink" : "text-muted-foreground hover:text-foreground"}`}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </button>
              <button
                data-testid={`btn-use-sound-${sound.id}`}
                onClick={() => useSound(sound)}
                className="flex items-center gap-1 bg-tiktok-pink/20 text-tiktok-pink border border-tiktok-pink/30 rounded-lg px-3 py-1.5 text-xs font-display font-semibold hover:bg-tiktok-pink hover:text-white transition"
              >
                <Plus className="w-3 h-3" />
                Use
              </button>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
