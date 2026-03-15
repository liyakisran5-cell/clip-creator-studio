import { X, Copy, Send, Link2, Check, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface ShareSheetProps {
  open: boolean;
  onClose: () => void;
  videoId: string;
  videoColor?: string;
}

export default function ShareSheet({ open, onClose, videoId, videoColor = "from-tiktok-pink to-tiktok-cyan" }: ShareSheetProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const { user } = useAuth();

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

  const handleWatermarkDownload = async () => {
    setDownloading(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 720;
      canvas.height = 1280;
      const ctx = canvas.getContext("2d")!;

      const gradient = ctx.createLinearGradient(0, 0, 720, 1280);
      gradient.addColorStop(0, "#fe2c55");
      gradient.addColorStop(1, "#25f4ee");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 720, 1280);

      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fillRect(0, 1100, 720, 180);

      ctx.fillStyle = "rgba(255,255,255,0.15)";
      ctx.font = "bold 60px Arial";
      ctx.textAlign = "center";
      ctx.fillText("TikTok", 360, 640);

      ctx.fillStyle = "white";
      ctx.font = "bold 36px Arial";
      ctx.textAlign = "left";
      ctx.fillText("TikTok", 30, 1150);

      ctx.font = "24px Arial";
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      const handle = user?.username ? `@${user.username.replace("@", "")}` : "@tiktok_user";
      ctx.fillText(handle, 30, 1190);

      ctx.font = "20px Arial";
      ctx.textAlign = "right";
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.fillText(`#${videoId}`, 690, 1240);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `tiktok_${videoId}_watermarked.png`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success("Video downloaded with watermark! 🎬");
      }, "image/png");
    } catch (e) {
      toast.error("Download failed");
    } finally {
      setDownloading(false);
    }
    onClose();
  };

  const shareOptions = [
    { icon: Send, label: "WhatsApp", color: "bg-green-600", action: () => handleShare("WhatsApp") },
    { icon: Link2, label: "Copy Link", color: "bg-muted", action: () => handleShare("Copy Link") },
    { icon: Download, label: "Download", color: "bg-tiktok-pink", action: handleWatermarkDownload },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-background/40" onClick={onClose} />
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
              <button onClick={onClose} data-testid="btn-close-share"><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <div className="flex gap-6 justify-center pb-2">
              {shareOptions.map((opt) => (
                <button key={opt.label} data-testid={`btn-share-${opt.label.toLowerCase().replace(" ", "-")}`} onClick={opt.action} disabled={downloading && opt.label === "Download"} className="flex flex-col items-center gap-2">
                  <div className={`w-14 h-14 rounded-full ${opt.color} flex items-center justify-center transition`}>
                    {opt.label === "Copy Link" && copied ? (
                      <Check className="w-6 h-6 text-foreground" />
                    ) : downloading && opt.label === "Download" ? (
                      <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    ) : (
                      <opt.icon className="w-6 h-6 text-foreground" />
                    )}
                  </div>
                  <span className="text-xs font-display text-muted-foreground">{opt.label}</span>
                </button>
              ))}
            </div>
            <p className="text-center text-[10px] text-muted-foreground font-body pb-2 mt-2">
              Downloaded videos will include TikTok watermark + your ID
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
