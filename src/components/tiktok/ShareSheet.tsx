import { X, Copy, MessageCircle, Send, Link2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

interface ShareSheetProps {
  open: boolean;
  onClose: () => void;
  videoId: string;
}

const shareOptions = [
  { icon: Send, label: "WhatsApp", color: "bg-green-600" },
  { icon: MessageCircle, label: "Message", color: "bg-primary" },
  { icon: Copy, label: "Copy Link", color: "bg-muted" },
];

export default function ShareSheet({ open, onClose, videoId }: ShareSheetProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async (label: string) => {
    const url = `${window.location.origin}/video/${videoId}`;

    if (label === "Copy Link") {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied!");
      setTimeout(() => setCopied(false), 2000);
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({ title: "Check this video!", url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied!");
    }
    onClose();
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
            className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-2xl p-4"
          >
            <div className="flex justify-center mb-3">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-display font-bold text-sm text-foreground">Share to</span>
              <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <div className="flex gap-6 justify-center pb-4">
              {shareOptions.map((opt) => (
                <button key={opt.label} onClick={() => handleShare(opt.label)} className="flex flex-col items-center gap-2">
                  <div className={`w-14 h-14 rounded-full ${opt.color} flex items-center justify-center`}>
                    {opt.label === "Copy Link" && copied ? (
                      <Check className="w-6 h-6 text-foreground" />
                    ) : (
                      <opt.icon className="w-6 h-6 text-foreground" />
                    )}
                  </div>
                  <span className="text-xs font-display text-muted-foreground">{opt.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
