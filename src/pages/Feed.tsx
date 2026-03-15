import { useState } from "react";
import BottomNav from "@/components/tiktok/BottomNav";
import { Video } from "lucide-react";

export default function Feed() {
  const [activeTab, setActiveTab] = useState<"following" | "foryou">("foryou");

  return (
    <div className="dark h-screen w-full bg-background text-foreground overflow-hidden">
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

      <div className="h-screen flex items-center justify-center flex-col gap-4 px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <Video className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="font-display font-bold text-lg text-foreground">No Videos Yet</h2>
        <p className="text-sm text-muted-foreground font-body">
          {activeTab === "following"
            ? "Follow creators to see their videos here."
            : "Be the first to upload a video!"}
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
