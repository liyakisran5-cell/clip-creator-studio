import { useState } from "react";
import { X, Heart, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Comment {
  id: string;
  username: string;
  text: string;
  likes: number;
  time: string;
  liked: boolean;
}

const mockComments: Comment[] = [
  { id: "c1", username: "@dance_queen", text: "This is amazing! 🔥🔥", likes: 234, time: "2h", liked: false },
  { id: "c2", username: "@foodie_life", text: "Love this content!", likes: 89, time: "4h", liked: false },
  { id: "c3", username: "@comedy_king", text: "Haha so relatable 😂", likes: 567, time: "6h", liked: false },
  { id: "c4", username: "@travel_pk", text: "Where is this place?", likes: 12, time: "8h", liked: false },
  { id: "c5", username: "@fitness_guru", text: "Keep it up bro 💪", likes: 45, time: "12h", liked: false },
  { id: "c6", username: "@music_lover", text: "Song name please? 🎵", likes: 156, time: "1d", liked: false },
  { id: "c7", username: "@art_vibes", text: "Beautiful shots!", likes: 78, time: "1d", liked: false },
  { id: "c8", username: "@gamer_zone", text: "POV: me watching this at 3am", likes: 890, time: "2d", liked: false },
];

interface CommentSheetProps {
  open: boolean;
  onClose: () => void;
  commentCount: number;
}

export default function CommentSheet({ open, onClose, commentCount }: CommentSheetProps) {
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState("");

  const toggleCommentLike = (id: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 } : c
      )
    );
  };

  const addComment = () => {
    if (!newComment.trim()) return;
    setComments((prev) => [
      { id: `c-new-${Date.now()}`, username: "@you", text: newComment, likes: 0, time: "now", liked: false },
      ...prev,
    ]);
    setNewComment("");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/40"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-2xl flex flex-col"
            style={{ maxHeight: "60vh" }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <span className="font-display font-bold text-sm text-foreground">
                {commentCount} Comments
              </span>
              <button onClick={onClose}>
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Comments list */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 scrollbar-none">
              {comments.map((c) => (
                <div key={c.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-display font-bold text-muted-foreground flex-shrink-0">
                    {c.username.charAt(1).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-display font-semibold text-muted-foreground">{c.username}</p>
                    <p className="text-sm font-body text-foreground mt-0.5">{c.text}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] text-muted-foreground">{c.time}</span>
                      <button className="text-[10px] font-display font-semibold text-muted-foreground">Reply</button>
                    </div>
                  </div>
                  <button onClick={() => toggleCommentLike(c.id)} className="flex flex-col items-center gap-0.5 pt-2">
                    <Heart className={`w-3.5 h-3.5 ${c.liked ? "fill-tiktok-pink text-tiktok-pink" : "text-muted-foreground"}`} />
                    <span className="text-[10px] text-muted-foreground">{c.likes}</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 px-4 py-3 border-t border-border">
              <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addComment()}
                placeholder="Add a comment..."
                className="flex-1 bg-muted rounded-full px-4 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground outline-none"
              />
              <button onClick={addComment} className="text-tiktok-pink">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
