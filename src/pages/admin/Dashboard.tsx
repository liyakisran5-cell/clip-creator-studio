import { Users, Eye, Video, TrendingUp } from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";

export default function Dashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground font-body mt-1">Overview of your platform</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={Users} title="Total Users" value="0" change="No data yet" changeType="positive" />
        <StatsCard icon={Eye} title="Daily Views" value="0" change="No data yet" changeType="positive" />
        <StatsCard icon={Video} title="Videos Uploaded" value="0" change="No data yet" changeType="positive" />
        <StatsCard icon={TrendingUp} title="Engagement Rate" value="0%" change="No data yet" changeType="positive" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-display font-semibold text-foreground mb-4">Recent Videos</h2>
          <div className="flex flex-col items-center justify-center py-12 gap-2 text-center">
            <Video className="w-8 h-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground font-body">No videos uploaded yet.</p>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-display font-semibold text-foreground mb-4">Recent Users</h2>
          <div className="flex flex-col items-center justify-center py-12 gap-2 text-center">
            <Users className="w-8 h-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground font-body">No users registered yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
