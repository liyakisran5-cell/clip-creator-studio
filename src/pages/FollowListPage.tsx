import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { mockUsers } from "@/data/mockVideos";
import { useState } from "react";

function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

export default function FollowListPage() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "followers";
  const [activeTab, setActiveTab] = useState<"followers" | "following">(tab as "followers" | "following");
  const [followState, setFollowState] = useState<Record<string, boolean>>({});

  const toggleFollow = (id: string) => {
    setFollowState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <span className="font-display font-bold text-base">{username}</span>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab("followers")}
          className={`flex-1 py-3 text-sm font-display font-semibold text-center ${activeTab === "followers" ? "border-b-2 border-foreground text-foreground" : "text-muted-foreground"}`}
        >
          Followers
        </button>
        <button
          onClick={() => setActiveTab("following")}
          className={`flex-1 py-3 text-sm font-display font-semibold text-center ${activeTab === "following" ? "border-b-2 border-foreground text-foreground" : "text-muted-foreground"}`}
        >
          Following
        </button>
      </div>

      {/* List */}
      <div className="divide-y divide-border">
        {mockUsers.map((u) => (
          <div key={u.id} className="flex items-center gap-3 px-4 py-3">
            <button
              onClick={() => navigate(`/profile/${encodeURIComponent(u.username)}`)}
              className="w-11 h-11 rounded-full bg-gradient-to-br from-tiktok-pink to-tiktok-cyan flex items-center justify-center text-foreground font-display font-bold text-sm flex-shrink-0"
            >
              {u.displayName.charAt(0)}
            </button>
            <div className="flex-1 min-w-0" onClick={() => navigate(`/profile/${encodeURIComponent(u.username)}`)}>
              <p className="font-display font-semibold text-sm truncate">{u.username}</p>
              <p className="text-xs text-muted-foreground font-body truncate">{u.displayName} · {formatCount(u.followers)} followers</p>
            </div>
            <button
              onClick={() => toggleFollow(u.id)}
              className={`px-4 py-1.5 rounded-md text-xs font-display font-semibold transition ${
                followState[u.id]
                  ? "bg-muted text-foreground border border-border"
                  : "bg-tiktok-pink text-primary-foreground"
              }`}
            >
              {followState[u.id] ? "Following" : "Follow"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
