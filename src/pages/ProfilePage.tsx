import { ArrowLeft, Settings, Play, Grid3X3, Heart, BadgeCheck, ExternalLink } from "lucide-react";
import { SiInstagram, SiYoutube, SiFacebook } from "react-icons/si";
import { useNavigate, useParams } from "react-router-dom";
import { mockVideos, mockUsers } from "@/data/mockVideos";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import BottomNav from "@/components/tiktok/BottomNav";

function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const { username } = useParams();
  const { user: authUser } = useAuth();

  const isOwn = username === "@you" || (authUser?.username && username === authUser.username);

  const user = isOwn && authUser
    ? {
        id: authUser.uid,
        username: authUser.username || "@you",
        displayName: authUser.displayName || "You",
        followers: 0,
        following: 0,
        videos: 0,
        likes: 0,
        joined: new Date().toISOString().split("T")[0],
        status: "active" as const,
        verified: false,
        bio: "Welcome to your profile!",
        bioLinks: [] as { label: string; url: string }[],
        socialLinks: authUser.socialLinks,
      }
    : mockUsers.find((u) => u.username === username) || mockUsers[0];

  const userVideos = mockVideos.filter((v) => v.username === user.username);
  const allVideos = userVideos.length > 0 ? userVideos : mockVideos;
  const [activeTab, setActiveTab] = useState<"videos" | "liked">("videos");
  const [following, setFollowing] = useState(false);

  return (
    <div className="dark min-h-screen bg-background text-foreground pb-20">
      <div className="flex items-center justify-between px-4 py-3">
        <button data-testid="btn-back-profile" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex items-center gap-1">
          <span className="font-display font-bold text-base">{user.username}</span>
          {user.verified && <BadgeCheck className="w-4 h-4 text-tiktok-cyan" />}
        </div>
        {isOwn ? (
          <button data-testid="btn-settings" onClick={() => navigate("/settings")}>
            <Settings className="w-5 h-5 text-foreground" />
          </button>
        ) : <div className="w-5" />}
      </div>

      <div className="flex flex-col items-center px-4 pb-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-tiktok-pink to-tiktok-cyan flex items-center justify-center text-foreground font-display font-bold text-2xl mb-2">
          {user.displayName.charAt(0)}
        </div>
        <h2 className="font-display font-bold text-base">{user.displayName}</h2>

        {user.bio && (
          <p className="text-xs text-muted-foreground font-body text-center mt-1 max-w-[250px]">{user.bio}</p>
        )}

        {"socialLinks" in user && user.socialLinks && (
          <div className="flex gap-3 mt-2">
            {user.socialLinks.instagram && (
              <a href={user.socialLinks.instagram.startsWith("http") ? user.socialLinks.instagram : `https://${user.socialLinks.instagram}`} target="_blank" rel="noopener noreferrer" data-testid="link-instagram" className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center hover:opacity-80 transition">
                <SiInstagram className="w-4 h-4 text-white" />
              </a>
            )}
            {user.socialLinks.youtube && (
              <a href={user.socialLinks.youtube.startsWith("http") ? user.socialLinks.youtube : `https://${user.socialLinks.youtube}`} target="_blank" rel="noopener noreferrer" data-testid="link-youtube" className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center hover:opacity-80 transition">
                <SiYoutube className="w-4 h-4 text-white" />
              </a>
            )}
            {user.socialLinks.facebook && (
              <a href={user.socialLinks.facebook.startsWith("http") ? user.socialLinks.facebook : `https://${user.socialLinks.facebook}`} target="_blank" rel="noopener noreferrer" data-testid="link-facebook" className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center hover:opacity-80 transition">
                <SiFacebook className="w-4 h-4 text-white" />
              </a>
            )}
          </div>
        )}

        {"bioLinks" in user && user.bioLinks && user.bioLinks.length > 0 && (
          <div className="flex gap-2 mt-2">
            {user.bioLinks.map((link: { label: string; url: string }, i: number) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 bg-muted rounded-full px-3 py-1 text-[10px] font-display text-tiktok-cyan hover:bg-muted-foreground/20 transition">
                <ExternalLink className="w-3 h-3" />
                {link.label}
              </a>
            ))}
          </div>
        )}

        <div className="flex gap-8 mt-4">
          <button data-testid="btn-following-count" onClick={() => navigate(`/follow/${encodeURIComponent(user.username)}?tab=following`)} className="text-center">
            <p className="font-display font-bold text-lg">{formatCount(user.following)}</p>
            <p className="text-xs text-muted-foreground font-body">Following</p>
          </button>
          <button data-testid="btn-followers-count" onClick={() => navigate(`/follow/${encodeURIComponent(user.username)}?tab=followers`)} className="text-center">
            <p className="font-display font-bold text-lg">{formatCount(user.followers)}</p>
            <p className="text-xs text-muted-foreground font-body">Followers</p>
          </button>
          <div className="text-center">
            <p className="font-display font-bold text-lg">{formatCount(user.likes)}</p>
            <p className="text-xs text-muted-foreground font-body">Likes</p>
          </div>
        </div>

        {!isOwn && (
          <div className="flex gap-2 mt-4">
            <button
              data-testid="btn-follow"
              onClick={() => setFollowing((f) => !f)}
              className={`px-8 py-2 rounded-md font-display font-semibold text-sm transition-colors ${following ? "bg-muted text-foreground border border-border" : "bg-tiktok-pink text-primary-foreground"}`}
            >
              {following ? "Following" : "Follow"}
            </button>
            <button
              data-testid="btn-message"
              onClick={() => navigate(`/dm/${encodeURIComponent(user.username)}`)}
              className="px-4 py-2 rounded-md bg-muted text-foreground border border-border font-display font-semibold text-sm"
            >
              Message
            </button>
          </div>
        )}
        {isOwn && (
          <button data-testid="btn-edit-profile" onClick={() => navigate("/settings")} className="mt-4 px-8 py-2 rounded-md bg-muted text-foreground border border-border font-display font-semibold text-sm">
            Edit Profile
          </button>
        )}
      </div>

      <div className="flex border-b border-border">
        <button data-testid="btn-tab-videos" onClick={() => setActiveTab("videos")} className={`flex-1 py-2 flex justify-center ${activeTab === "videos" ? "border-b-2 border-foreground" : ""}`}>
          <Grid3X3 className={`w-5 h-5 ${activeTab === "videos" ? "text-foreground" : "text-muted-foreground"}`} />
        </button>
        <button data-testid="btn-tab-liked" onClick={() => setActiveTab("liked")} className={`flex-1 py-2 flex justify-center ${activeTab === "liked" ? "border-b-2 border-foreground" : ""}`}>
          <Heart className={`w-5 h-5 ${activeTab === "liked" ? "text-foreground" : "text-muted-foreground"}`} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-0.5">
        {allVideos.map((v) => (
          <div key={v.id} data-testid={`video-thumb-${v.id}`} className={`aspect-[9/16] bg-gradient-to-br ${v.videoColor} relative group cursor-pointer`} onClick={() => navigate("/")}>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
            <div className="absolute bottom-1 left-1 flex items-center gap-1">
              <Play className="w-3 h-3 text-foreground fill-foreground" />
              <span className="text-[10px] font-display text-foreground">{formatCount(v.views)}</span>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
