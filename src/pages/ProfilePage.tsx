import { ArrowLeft, Settings, Grid3X3, Heart, BadgeCheck } from "lucide-react";
import { SiInstagram, SiYoutube, SiFacebook } from "react-icons/si";
import { useNavigate, useParams } from "react-router-dom";
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
        likes: 0,
        verified: false,
        bio: authUser.bio || "",
        socialLinks: authUser.socialLinks,
      }
    : null;

  const [activeTab, setActiveTab] = useState<"videos" | "liked">("videos");
  const [following, setFollowing] = useState(false);

  if (!user && !isOwn) {
    return (
      <div className="dark min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-muted-foreground font-body">User not found.</p>
      </div>
    );
  }

  const displayUser = user || { username: username || "@user", displayName: username || "User", followers: 0, following: 0, likes: 0, verified: false, bio: "", socialLinks: undefined };

  return (
    <div className="dark min-h-screen bg-background text-foreground pb-20">
      <div className="flex items-center justify-between px-4 py-3">
        <button data-testid="btn-back-profile" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex items-center gap-1">
          <span className="font-display font-bold text-base">{displayUser.username}</span>
          {displayUser.verified && <BadgeCheck className="w-4 h-4 text-tiktok-cyan" />}
        </div>
        {isOwn ? (
          <button data-testid="btn-settings" onClick={() => navigate("/settings")}>
            <Settings className="w-5 h-5 text-foreground" />
          </button>
        ) : <div className="w-5" />}
      </div>

      <div className="flex flex-col items-center px-4 pb-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-tiktok-pink to-tiktok-cyan flex items-center justify-center text-foreground font-display font-bold text-2xl mb-2">
          {displayUser.displayName.charAt(0)}
        </div>
        <h2 className="font-display font-bold text-base">{displayUser.displayName}</h2>

        {displayUser.bio && (
          <p className="text-xs text-muted-foreground font-body text-center mt-1 max-w-[250px]">{displayUser.bio}</p>
        )}

        {displayUser.socialLinks && (
          <div className="flex gap-3 mt-2">
            {displayUser.socialLinks.instagram && (
              <a href={displayUser.socialLinks.instagram.startsWith("http") ? displayUser.socialLinks.instagram : `https://${displayUser.socialLinks.instagram}`} target="_blank" rel="noopener noreferrer" data-testid="link-instagram" className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center hover:opacity-80 transition">
                <SiInstagram className="w-4 h-4 text-white" />
              </a>
            )}
            {displayUser.socialLinks.youtube && (
              <a href={displayUser.socialLinks.youtube.startsWith("http") ? displayUser.socialLinks.youtube : `https://${displayUser.socialLinks.youtube}`} target="_blank" rel="noopener noreferrer" data-testid="link-youtube" className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center hover:opacity-80 transition">
                <SiYoutube className="w-4 h-4 text-white" />
              </a>
            )}
            {displayUser.socialLinks.facebook && (
              <a href={displayUser.socialLinks.facebook.startsWith("http") ? displayUser.socialLinks.facebook : `https://${displayUser.socialLinks.facebook}`} target="_blank" rel="noopener noreferrer" data-testid="link-facebook" className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center hover:opacity-80 transition">
                <SiFacebook className="w-4 h-4 text-white" />
              </a>
            )}
          </div>
        )}

        <div className="flex gap-8 mt-4">
          <div className="text-center">
            <p className="font-display font-bold text-lg">{formatCount(displayUser.following)}</p>
            <p className="text-xs text-muted-foreground font-body">Following</p>
          </div>
          <div className="text-center">
            <p className="font-display font-bold text-lg">{formatCount(displayUser.followers)}</p>
            <p className="text-xs text-muted-foreground font-body">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-display font-bold text-lg">{formatCount(displayUser.likes)}</p>
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
              onClick={() => navigate(`/dm/${encodeURIComponent(displayUser.username)}`)}
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

      <div className="flex flex-col items-center justify-center py-16 px-6 text-center gap-2">
        <Grid3X3 className="w-10 h-10 text-muted-foreground" />
        <p className="font-display font-semibold text-foreground">No Videos Yet</p>
        <p className="text-xs text-muted-foreground font-body">
          {activeTab === "videos"
            ? isOwn ? "Upload your first video!" : "This user has not uploaded any videos yet."
            : isOwn ? "Videos you like will appear here." : "No liked videos to show."}
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
