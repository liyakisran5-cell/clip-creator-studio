import { Users, Eye, Video, TrendingUp } from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import { mockVideos, mockUsers } from "@/data/mockVideos";

export default function Dashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground font-body mt-1">Overview of your platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={Users} title="Total Users" value="2.4M" change="+12.5% from last month" changeType="positive" />
        <StatsCard icon={Eye} title="Daily Views" value="18.2M" change="+8.3% from yesterday" changeType="positive" />
        <StatsCard icon={Video} title="Videos Uploaded" value="45.2K" change="+5.1% this week" changeType="positive" />
        <StatsCard icon={TrendingUp} title="Engagement Rate" value="6.8%" change="-0.3% from last week" changeType="negative" />
      </div>

      {/* Recent Videos */}
      <div className="bg-card rounded-xl border border-border">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-display font-semibold text-foreground">Recent Videos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-display font-medium text-muted-foreground">Creator</th>
                <th className="text-left p-4 text-sm font-display font-medium text-muted-foreground">Caption</th>
                <th className="text-left p-4 text-sm font-display font-medium text-muted-foreground">Likes</th>
                <th className="text-left p-4 text-sm font-display font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockVideos.map((v) => (
                <tr key={v.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display font-bold text-sm">
                        {v.displayName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-display font-medium text-sm text-foreground">{v.displayName}</p>
                        <p className="text-xs font-body text-muted-foreground">{v.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-body text-foreground max-w-xs truncate">{v.caption}</td>
                  <td className="p-4 text-sm font-body text-foreground">{(v.likes / 1000).toFixed(1)}K</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-display font-medium ${
                      v.status === "active"
                        ? "bg-success/10 text-success"
                        : v.status === "flagged"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-destructive/10 text-destructive"
                    }`}>
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
