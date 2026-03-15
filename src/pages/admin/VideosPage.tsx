import { Video } from "lucide-react";

export default function VideosPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Videos</h1>
        <p className="text-muted-foreground font-body mt-1">Content moderation & management</p>
      </div>

      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <Video className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="font-display font-bold text-lg text-foreground">No Videos Yet</h2>
        <p className="text-sm text-muted-foreground font-body">
          Videos uploaded by users will appear here for moderation.
        </p>
      </div>
    </div>
  );
}
