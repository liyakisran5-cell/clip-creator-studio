import { X, Flag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface ReportSheetProps {
  open: boolean;
  onClose: () => void;
  videoId: string;
}

const reasons = [
  "Inappropriate Content",
  "Spam or Misleading",
  "Harassment or Bullying",
  "Hate Speech",
  "Violence",
  "Copyright Violation",
  "Other",
];

export default function ReportSheet({ open, onClose, videoId }: ReportSheetProps) {
  const handleReport = (reason: string) => {
    toast.success(`Reported: ${reason}. We'll review this video.`);
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
              <div className="flex items-center gap-2">
                <Flag className="w-5 h-5 text-destructive" />
                <span className="font-display font-bold text-sm text-foreground">Report Video</span>
              </div>
              <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <div className="space-y-2 pb-4">
              {reasons.map((reason) => (
                <button
                  key={reason}
                  onClick={() => handleReport(reason)}
                  className="w-full text-left py-3 px-4 bg-muted rounded-xl text-sm font-body text-foreground hover:bg-muted-foreground/20 transition"
                >
                  {reason}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
