import { mockVideos } from "@/data/mockVideos";

export default function VideosPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Videos</h1>
        <p className="text-muted-foreground font-body mt-1">Content moderation & management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockVideos.map((v) => (
          <div key={v.id} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
            <div className={`h-48 bg-gradient-to-br ${v.videoColor} relative`}>
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                <span className="text-xs font-display font-medium bg-background/20 backdrop-blur-sm px-2 py-1 rounded-full text-foreground">
                  {(v.likes / 1000).toFixed(1)}K ❤️
                </span>
                <span className={`text-xs font-display font-medium px-2 py-1 rounded-full ${
                  v.status === "active" ? "bg-success/80 text-success-foreground" : "bg-amber-500/80 text-foreground"
                }`}>
                  {v.status}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold font-display">
                  {v.displayName.charAt(0)}
                </div>
                <span className="text-sm font-display font-medium text-foreground">{v.username}</span>
              </div>
              <p className="text-sm font-body text-muted-foreground line-clamp-2">{v.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
