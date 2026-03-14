import { useState } from "react";
import { Heart, MessageCircle, Share2, Music, BadgeCheck, UserPlus, UserCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Video } from "@/data/mockVideos";
import CommentSheet from "./CommentSheet";
import ShareSheet from "./ShareSheet";

function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

export default function VideoCard({ video }: { video: Video }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likes);
  const [showHeart, setShowHeart] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [following, setFollowing] = useState(false);

  const handleDoubleTap = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount((c) => c + 1);
    }
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 800);
  };

  const toggleLike = () => {
    setLiked((l) => !l);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  return (
    <div
      className="relative h-screen w-full snap-start flex-shrink-0 overflow-hidden"
      onDoubleClick={handleDoubleTap}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${video.videoColor} opacity-80`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

      {/* Center heart animation */}
      <AnimatePresence>
        {showHeart && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          >
            <Heart className="w-28 h-28 fill-tiktok-pink text-tiktok-pink" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right side actions */}
      <div className="absolute right-3 bottom-32 flex flex-col items-center gap-5 z-10">
        {/* Avatar + Follow */}
        <div className="relative mb-2">
          <button
            onClick={() => navigate(`/profile/${encodeURIComponent(video.username)}`)}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-tiktok-pink to-tiktok-cyan flex items-center justify-center text-foreground font-display font-bold text-lg"
          >
            {video.displayName.charAt(0)}
          </button>
          <button
            onClick={() => setFollowing((f) => !f)}
            className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center ${
              following ? "bg-muted" : "bg-tiktok-pink"
            }`}
          >
            {following ? (
              <UserCheck className="w-3 h-3 text-foreground" />
            ) : (
              <span className="text-[10px] font-bold text-primary-foreground">+</span>
            )}
          </button>
        </div>

        {/* Like */}
        <button onClick={toggleLike} className="flex flex-col items-center gap-1">
          <motion.div animate={liked ? { scale: [1, 1.4, 1] } : {}} transition={{ duration: 0.3 }}>
            <Heart className={`w-8 h-8 ${liked ? "fill-tiktok-pink text-tiktok-pink" : "text-foreground"}`} />
          </motion.div>
          <span className="text-xs font-display font-semibold text-foreground">{formatCount(likeCount)}</span>
        </button>

        {/* Comment */}
        <button onClick={() => setCommentsOpen(true)} className="flex flex-col items-center gap-1">
          <MessageCircle className="w-8 h-8 text-foreground" />
          <span className="text-xs font-display font-semibold text-foreground">{formatCount(video.comments)}</span>
        </button>

        {/* Share */}
        <button onClick={() => setShareOpen(true)} className="flex flex-col items-center gap-1">
          <Share2 className="w-8 h-8 text-foreground" />
          <span className="text-xs font-display font-semibold text-foreground">{formatCount(video.shares)}</span>
        </button>

        {/* Music disc */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-foreground/30 to-foreground/10 border-2 border-foreground/20 flex items-center justify-center cursor-pointer"
          onClick={() => navigate(`/sound/${encodeURIComponent(video.song)}`)}
        >
          <Music className="w-4 h-4 text-foreground" />
        </motion.div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-20 left-4 right-20 z-10">
        <div className="flex items-center gap-2 mb-2">
          <h3
            className="font-display font-bold text-base text-foreground cursor-pointer"
            onClick={() => navigate(`/profile/${encodeURIComponent(video.username)}`)}
          >
            {video.username}
          </h3>
          {video.verified && <BadgeCheck className="w-4 h-4 text-tiktok-cyan" />}
        </div>
        <p className="font-body text-sm text-foreground/90 mb-3 line-clamp-2">{video.caption}</p>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate(`/sound/${encodeURIComponent(video.song)}`)}
        >
          <Music className="w-3.5 h-3.5 text-foreground" />
          <p className="font-body text-xs text-foreground/80 truncate">{video.song}</p>
        </div>
      </div>

      {/* Sheets */}
      <CommentSheet open={commentsOpen} onClose={() => setCommentsOpen(false)} commentCount={video.comments} />
      <ShareSheet open={shareOpen} onClose={() => setShareOpen(false)} videoId={video.id} />
    </div>
  );
}
