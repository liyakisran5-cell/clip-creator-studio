import { ArrowLeft, Upload, Film, Music, Hash, SunMedium, Contrast, Palette, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

const filters = [
  { name: "Normal", class: "" },
  { name: "Warm", class: "sepia(0.3) saturate(1.4)" },
  { name: "Cool", class: "hue-rotate(20deg) saturate(1.2)" },
  { name: "B&W", class: "grayscale(1)" },
  { name: "Vivid", class: "saturate(2) contrast(1.1)" },
  { name: "Fade", class: "contrast(0.8) brightness(1.1)" },
];

export default function UploadPage() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const thumbRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const [brightness, setBrightness] = useState([100]);
  const [contrast, setContrast] = useState([100]);
  const [selectedFilter, setSelectedFilter] = useState(0);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleThumbSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setThumbnail(url);
    }
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

  const filterStyle = {
    filter: `brightness(${brightness[0]}%) contrast(${contrast[0]}%) ${filters[selectedFilter].class}`,
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <span className="font-display font-bold text-base">New Post</span>
        <div className="w-6" />
      </div>

      <div className="px-4 py-6 space-y-5">
        <input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={handleFileSelect} />
        <input ref={thumbRef} type="file" accept="image/*" className="hidden" onChange={handleThumbSelect} />

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
          <div className="w-full aspect-video rounded-xl bg-muted flex items-center justify-center overflow-hidden" style={filterStyle}>
            <Film className="w-12 h-12 text-tiktok-pink" />
            <div className="ml-3">
              <p className="font-display font-semibold text-sm truncate max-w-[200px]">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground">{(selectedFile.size / (1024 * 1024)).toFixed(1)} MB</p>
            </div>
          </div>
        )}

        {/* Video Filters */}
        {selectedFile && (
          <>
            <div>
              <p className="font-display font-semibold text-xs mb-2 text-muted-foreground">Filters</p>
              <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
                {filters.map((f, i) => (
                  <button
                    key={f.name}
                    onClick={() => setSelectedFilter(i)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-display font-semibold transition ${
                      selectedFilter === i
                        ? "bg-tiktok-pink text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Brightness & Contrast */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <SunMedium className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-xs font-display text-muted-foreground w-16">Brightness</span>
                <Slider value={brightness} onValueChange={setBrightness} min={50} max={150} step={1} className="flex-1" />
                <span className="text-xs text-muted-foreground w-8 text-right">{brightness[0]}%</span>
              </div>
              <div className="flex items-center gap-3">
                <Contrast className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-xs font-display text-muted-foreground w-16">Contrast</span>
                <Slider value={contrast} onValueChange={setContrast} min={50} max={150} step={1} className="flex-1" />
                <span className="text-xs text-muted-foreground w-8 text-right">{contrast[0]}%</span>
              </div>
            </div>

            {/* Custom Thumbnail */}
            <button
              onClick={() => thumbRef.current?.click()}
              className="flex items-center gap-2 bg-muted rounded-xl px-4 py-3 w-full"
            >
              {thumbnail ? (
                <img src={thumbnail} className="w-10 h-14 rounded object-cover" alt="Thumbnail" />
              ) : (
                <ImageIcon className="w-5 h-5 text-muted-foreground" />
              )}
              <div className="text-left">
                <p className="text-sm font-display font-semibold">{thumbnail ? "Change Thumbnail" : "Custom Thumbnail"}</p>
                <p className="text-[10px] text-muted-foreground font-body">Select a cover photo</p>
              </div>
            </button>
          </>
        )}

        {/* Caption */}
        <div>
          <label className="font-display font-semibold text-sm mb-2 block">Caption</label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption... use #hashtags and @mentions"
            rows={3}
            className="w-full bg-muted rounded-lg px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground outline-none resize-none"
          />
        </div>

        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 bg-muted rounded-full px-3 py-1.5 text-xs font-display">
            <Hash className="w-3.5 h-3.5 text-tiktok-pink" /> Hashtags
          </button>
          <button className="flex items-center gap-1.5 bg-muted rounded-full px-3 py-1.5 text-xs font-display">
            <Music className="w-3.5 h-3.5 text-tiktok-cyan" /> Add Sound
          </button>
        </div>

        {uploading && (
          <div className="space-y-2">
            <Progress value={Math.min(progress, 100)} className="h-2" />
            <p className="text-xs text-muted-foreground text-center font-body">
              Uploading... {Math.min(Math.round(progress), 100)}%
            </p>
          </div>
        )}

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
