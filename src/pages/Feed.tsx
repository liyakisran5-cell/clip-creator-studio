import { useState } from "react";
import VideoCard from "@/components/tiktok/VideoCard";
import BottomNav from "@/components/tiktok/BottomNav";
import { mockVideos } from "@/data/mockVideos";

export default function Feed() {
  const [activeTab, setActiveTab] = useState<"following" | "foryou">("foryou");

  return (
    <div className="dark h-screen w-full bg-background text-foreground overflow-hidden">
      {/* Top tabs */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-6 pt-4 pb-2">
        <button
          onClick={() => setActiveTab("following")}
          className={`font-display font-semibold text-base transition-opacity ${
            activeTab === "following" ? "opacity-100" : "opacity-50"
          }`}
        >
          Following
        </button>
        <div className="w-px h-4 bg-foreground/30" />
        <button
          onClick={() => setActiveTab("foryou")}
          className={`font-display font-semibold text-base transition-opacity ${
            activeTab === "foryou" ? "opacity-100" : "opacity-50"
          }`}
        >
          For You
        </button>
      </div>

      {/* Video Feed */}
      <div className="h-screen overflow-y-scroll snap-mandatory scrollbar-none">
        {mockVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
