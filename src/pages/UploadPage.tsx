import { ArrowLeft, Upload, Film, Music, Hash, SunMedium, Contrast, Globe, Lock, Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { mockSounds } from "@/data/sounds";

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
  const [privacy, setPrivacy] = useState<"public" | "private">("public");
  const [captioning, setCaptioning] = useState(false);
  const [autoCaptions, setAutoCaptions] = useState<string | null>(null);
  const [selectedSound, setSelectedSound] = useState<string | null>(null);
  const [showSoundPicker, setShowSoundPicker] = useState(false);

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

  const handleAutoCaption = async () => {
    if (!selectedFile) return;
    setCaptioning(true);
    await new Promise((r) => setTimeout(r, 2500));
    const samples = [
      "Yeh meri zindagi ki sabse best recipe hai 🍳 #cooking #food #pakistan",
      "Dance challenge 2026 🔥 Koi mere saath dance kare? #dance #viral #trending",
      "30 din mein body transformation 💪 #fitness #workout #motivation",
      "Pakistan ke khubsoorat pahad 🏔️ #travel #pakistan #hunza",
      "Aj ka comedy sketch 😂 #comedy #funny #pakistan",
    ];
    const randomCaption = samples[Math.floor(Math.random() * samples.length)];
    setAutoCaptions(randomCaption);
    setCaption(randomCaption);
    setCaptioning(false);
    toast.success("AI ne caption taiyar kar diya! ✨");
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
          toast.success(`Video ${privacy === "private" ? "(Private)" : ""} uploaded successfully! 🎉`);
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

  const selectedSoundObj = mockSounds.find((s) => s.id === selectedSound);

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <button onClick={() => navigate(-1)} data-testid="btn-back-upload">
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
            data-testid="btn-select-video"
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
              <p className="text-xs text-muted-foreground font-body">{(selectedFile.size / 1024 / 1024).toFixed(1)} MB</p>
            </div>
          </div>
        )}

        {selectedFile && (
          <>
            <div className="bg-card border border-border rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-tiktok-cyan" />
                  <span className="font-display font-semibold text-sm">AI Auto-Caption</span>
                </div>
                <button
                  data-testid="btn-auto-caption"
                  onClick={handleAutoCaption}
                  disabled={captioning}
                  className="flex items-center gap-1 bg-tiktok-cyan/20 text-tiktok-cyan border border-tiktok-cyan/30 rounded-lg px-3 py-1 text-xs font-display font-semibold hover:bg-tiktok-cyan hover:text-background transition disabled:opacity-50"
                >
                  {captioning ? <><Loader2 className="w-3 h-3 animate-spin" /> Analyzing...</> : "Generate"}
                </button>
              </div>
              {autoCaptions && (
                <div className="flex items-start gap-2 bg-tiktok-cyan/10 rounded-lg p-2">
                  <CheckCircle2 className="w-4 h-4 text-tiktok-cyan mt-0.5 flex-shrink-0" />
                  <p className="text-xs font-body text-foreground/80">{autoCaptions}</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-muted-foreground" />
                <label className="font-display font-semibold text-sm">Caption</label>
              </div>
              <textarea
                data-testid="input-caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write a caption... #hashtags @mentions"
                rows={3}
                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-tiktok-pink transition resize-none"
              />
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <button
                data-testid="btn-pick-sound"
                onClick={() => setShowSoundPicker((s) => !s)}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-tiktok-pink" />
                  <span className="font-display font-semibold text-sm">
                    {selectedSoundObj ? selectedSoundObj.title : "Add Sound"}
                  </span>
                </div>
                <span className="text-xs text-tiktok-pink font-display">{showSoundPicker ? "Close" : "Browse"}</span>
              </button>
              {showSoundPicker && (
                <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                  {mockSounds.slice(0, 8).map((s) => (
                    <button
                      key={s.id}
                      data-testid={`btn-select-sound-${s.id}`}
                      onClick={() => { setSelectedSound(s.id); setShowSoundPicker(false); toast.success(`"${s.title}" added!`); }}
                      className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition ${selectedSound === s.id ? "bg-muted" : ""}`}
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${s.coverColor} flex-shrink-0`} />
                      <div className="text-left flex-1 min-w-0">
                        <p className="text-xs font-display font-semibold truncate">{s.title}</p>
                        <p className="text-[10px] text-muted-foreground font-body truncate">{s.artist}</p>
                      </div>
                      {selectedSound === s.id && <CheckCircle2 className="w-4 h-4 text-tiktok-pink flex-shrink-0" />}
                    </button>
                  ))}
                  <button onClick={() => { setShowSoundPicker(false); navigate("/sounds"); }} className="w-full text-xs text-tiktok-cyan font-display text-center py-1">
                    View all sounds →
                  </button>
                </div>
              )}
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <p className="font-display font-semibold text-sm mb-3">Who can see this?</p>
              <div className="flex gap-3">
                <button
                  data-testid="btn-privacy-public"
                  onClick={() => setPrivacy("public")}
                  className={`flex-1 flex flex-col items-center gap-2 rounded-xl py-3 border transition ${privacy === "public" ? "border-tiktok-cyan bg-tiktok-cyan/10 text-tiktok-cyan" : "border-border text-muted-foreground"}`}
                >
                  <Globe className="w-5 h-5" />
                  <span className="text-xs font-display font-semibold">Public</span>
                  <span className="text-[10px] font-body text-center opacity-70">Everyone can see</span>
                </button>
                <button
                  data-testid="btn-privacy-private"
                  onClick={() => setPrivacy("private")}
                  className={`flex-1 flex flex-col items-center gap-2 rounded-xl py-3 border transition ${privacy === "private" ? "border-tiktok-pink bg-tiktok-pink/10 text-tiktok-pink" : "border-border text-muted-foreground"}`}
                >
                  <Lock className="w-5 h-5" />
                  <span className="text-xs font-display font-semibold">Private</span>
                  <span className="text-[10px] font-body text-center opacity-70">Only you can see</span>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Contrast className="w-4 h-4 text-muted-foreground" />
                <span className="font-display font-semibold text-sm">Filters</span>
              </div>
              <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
                {filters.map((f, i) => (
                  <button
                    key={f.name}
                    data-testid={`btn-filter-${f.name.toLowerCase()}`}
                    onClick={() => setSelectedFilter(i)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-display font-semibold border transition ${selectedFilter === i ? "bg-tiktok-pink border-tiktok-pink text-primary-foreground" : "bg-card border-border text-muted-foreground hover:text-foreground"}`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SunMedium className="w-4 h-4 text-muted-foreground" />
                    <span className="font-display font-semibold text-sm">Brightness</span>
                  </div>
                  <span className="text-xs text-muted-foreground font-body">{brightness[0]}%</span>
                </div>
                <Slider data-testid="slider-brightness" value={brightness} onValueChange={setBrightness} min={50} max={150} step={1} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Contrast className="w-4 h-4 text-muted-foreground" />
                    <span className="font-display font-semibold text-sm">Contrast</span>
                  </div>
                  <span className="text-xs text-muted-foreground font-body">{contrast[0]}%</span>
                </div>
                <Slider data-testid="slider-contrast" value={contrast} onValueChange={setContrast} min={50} max={150} step={1} />
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <button data-testid="btn-select-thumbnail" onClick={() => thumbRef.current?.click()} className="w-full flex items-center justify-between">
                <span className="font-display font-semibold text-sm">Custom Thumbnail</span>
                <span className="text-xs text-tiktok-pink font-display">{thumbnail ? "Change" : "Upload"}</span>
              </button>
              {thumbnail && <img src={thumbnail} alt="thumbnail" className="w-full rounded-lg mt-3 aspect-video object-cover" />}
            </div>

            {uploading && (
              <div className="space-y-2">
                <Progress value={progress} />
                <p className="text-xs text-center text-muted-foreground font-body">Uploading... {Math.round(progress)}%</p>
              </div>
            )}

            <button
              data-testid="btn-upload-submit"
              onClick={handleUpload}
              disabled={uploading}
              className="w-full bg-tiktok-pink rounded-xl py-3 font-display font-bold text-sm hover:opacity-90 transition disabled:opacity-50"
            >
              {uploading ? "Uploading..." : `Post Video (${privacy === "public" ? "🌐 Public" : "🔒 Private"})`}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
