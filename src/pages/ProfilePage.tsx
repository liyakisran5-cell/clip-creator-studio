import { ArrowLeft, Settings, Play, Grid3X3, Bookmark, Heart } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { mockVideos, mockUsers } from "@/data/mockVideos";
import { useState } from "react";

function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const { username } = useParams();
  const user = mockUsers.find((u) => u.username === username) || mockUsers[0];
  const userVideos = mockVideos.filter((v) => v.username === user.username);
  const allVideos = userVideos.length > 0 ? userVideos : mockVideos;
  const [activeTab, setActiveTab] = useState<"videos" | "liked">("videos");
  const [following, setFollowing] = useState(false);

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <span className="font-display font-bold text-base">{user.username}</span>
        <button onClick={() => navigate("/admin/settings")}>
          <Settings className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Profile info */}
      <div className="flex flex-col items-center px-4 pb-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-tiktok-pink to-tiktok-cyan flex items-center justify-center text-foreground font-display font-bold text-2xl mb-2">
          {user.displayName.charAt(0)}
        </div>
        <h2 className="font-display font-bold text-base">{user.displayName}</h2>

        {/* Stats */}
        <div className="flex gap-8 mt-4">
          <div className="text-center">
            <p className="font-display font-bold text-lg">{formatCount(user.following)}</p>
            <p className="text-xs text-muted-foreground font-body">Following</p>
          </div>
          <div className="text-center">
            <p className="font-display font-bold text-lg">{formatCount(user.followers)}</p>
            <p className="text-xs text-muted-foreground font-body">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-display font-bold text-lg">{formatCount(user.likes)}</p>
            <p className="text-xs text-muted-foreground font-body">Likes</p>
          </div>
        </div>

        {/* Follow button */}
        <button
          onClick={() => setFollowing((f) => !f)}
          className={`mt-4 px-8 py-2 rounded-md font-display font-semibold text-sm transition-colors ${
            following
              ? "bg-muted text-foreground border border-border"
              : "bg-tiktok-pink text-primary-foreground"
          }`}
        >
          {following ? "Following" : "Follow"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab("videos")}
          className={`flex-1 py-2 flex justify-center ${activeTab === "videos" ? "border-b-2 border-foreground" : ""}`}
        >
          <Grid3X3 className={`w-5 h-5 ${activeTab === "videos" ? "text-foreground" : "text-muted-foreground"}`} />
        </button>
        <button
          onClick={() => setActiveTab("liked")}
          className={`flex-1 py-2 flex justify-center ${activeTab === "liked" ? "border-b-2 border-foreground" : ""}`}
        >
          <Heart className={`w-5 h-5 ${activeTab === "liked" ? "text-foreground" : "text-muted-foreground"}`} />
        </button>
      </div>

      {/* 3x3 Grid */}
      <div className="grid grid-cols-3 gap-0.5">
        {allVideos.map((v) => (
          <div key={v.id} className={`aspect-[9/16] bg-gradient-to-br ${v.videoColor} relative group cursor-pointer`} onClick={() => navigate("/")}>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
            <div className="absolute bottom-1 left-1 flex items-center gap-1">
              <Play className="w-3 h-3 text-foreground fill-foreground" />
              <span className="text-[10px] font-display text-foreground">{formatCount(v.likes)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
