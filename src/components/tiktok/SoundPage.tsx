import { ArrowLeft, Play, Music } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { mockVideos } from "@/data/mockVideos";

export default function SoundPage() {
  const { songName } = useParams();
  const navigate = useNavigate();
  const decodedSong = decodeURIComponent(songName || "");
  const relatedVideos = mockVideos.filter((v) => v.song === decodedSong);
  const allVideos = relatedVideos.length > 0 ? relatedVideos : mockVideos;

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <Music className="w-5 h-5 text-tiktok-pink" />
        <span className="font-display font-bold text-sm truncate">{decodedSong || "Original Sound"}</span>
      </div>
      <div className="px-4 pb-4">
        <p className="text-sm text-muted-foreground font-body">{allVideos.length} videos</p>
      </div>
      <div className="grid grid-cols-3 gap-0.5 px-0.5">
        {allVideos.map((v) => (
          <div key={v.id} className={`aspect-[9/16] bg-gradient-to-br ${v.videoColor} relative group cursor-pointer`} onClick={() => navigate("/")}>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
            <div className="absolute bottom-1 left-1 flex items-center gap-1">
              <Play className="w-3 h-3 text-foreground fill-foreground" />
              <span className="text-[10px] font-display text-foreground">{(v.likes / 1000).toFixed(0)}K</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
