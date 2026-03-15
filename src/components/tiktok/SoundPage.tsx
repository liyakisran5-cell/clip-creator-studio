import { ArrowLeft, Music } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function SoundPage() {
  const { songName } = useParams();
  const navigate = useNavigate();
  const decodedSong = decodeURIComponent(songName || "");

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <Music className="w-5 h-5 text-tiktok-pink" />
        <span className="font-display font-bold text-sm truncate">{decodedSong || "Original Sound"}</span>
      </div>

      <div className="flex flex-col items-center justify-center py-24 gap-3 text-center px-6">
        <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
          <Music className="w-7 h-7 text-muted-foreground" />
        </div>
        <p className="font-display font-semibold text-foreground">No Videos Yet</p>
        <p className="text-xs text-muted-foreground font-body">
          No videos using this sound have been uploaded yet.
        </p>
      </div>
    </div>
  );
}
