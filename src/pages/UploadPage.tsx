import { ArrowLeft, Upload, Film, Music, Hash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export default function UploadPage() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    setUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setUploading(false);
          toast.success("Video uploaded successfully! 🎉");
          setTimeout(() => navigate("/"), 1000);
          return 100;
        }
        return p + Math.random() * 15;
      });
    }, 300);
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <span className="font-display font-bold text-base">New Post</span>
        <div className="w-6" />
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* File selector */}
        <input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={handleFileSelect} />

        {!selectedFile ? (
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full aspect-[9/16] max-h-[50vh] rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-3 hover:border-tiktok-pink transition-colors"
          >
            <Upload className="w-12 h-12 text-muted-foreground" />
            <span className="font-display font-semibold text-sm text-muted-foreground">Select Video</span>
            <span className="text-xs text-muted-foreground font-body">MP4, MOV up to 10 min</span>
          </button>
        ) : (
          <div className="w-full aspect-video rounded-xl bg-muted flex items-center justify-center">
            <Film className="w-12 h-12 text-tiktok-pink" />
            <div className="ml-3">
              <p className="font-display font-semibold text-sm truncate max-w-[200px]">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground">{(selectedFile.size / (1024 * 1024)).toFixed(1)} MB</p>
            </div>
          </div>
        )}

        {/* Caption */}
        <div>
          <label className="font-display font-semibold text-sm mb-2 block">Caption</label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption... #hashtags"
            rows={3}
            className="w-full bg-muted rounded-lg px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground outline-none resize-none"
          />
        </div>

        {/* Tags */}
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 bg-muted rounded-full px-3 py-1.5 text-xs font-display">
            <Hash className="w-3.5 h-3.5 text-tiktok-pink" /> Hashtags
          </button>
          <button className="flex items-center gap-1.5 bg-muted rounded-full px-3 py-1.5 text-xs font-display">
            <Music className="w-3.5 h-3.5 text-tiktok-cyan" /> Add Sound
          </button>
        </div>

        {/* Progress bar */}
        {uploading && (
          <div className="space-y-2">
            <Progress value={Math.min(progress, 100)} className="h-2" />
            <p className="text-xs text-muted-foreground text-center font-body">
              Uploading... {Math.min(Math.round(progress), 100)}%
            </p>
          </div>
        )}

        {/* Post button */}
        <button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className="w-full py-3 rounded-md bg-tiktok-pink text-primary-foreground font-display font-bold text-sm disabled:opacity-50 transition-opacity"
        >
          {uploading ? "Uploading..." : "Post"}
        </button>
      </div>
    </div>
  );
}
