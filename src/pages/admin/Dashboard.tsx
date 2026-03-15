import { Users, Eye, Video, TrendingUp, Calendar } from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import { mockVideos, mockUsers } from "@/data/mockVideos";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const dailyUsers = [
  { day: "Mon", users: 12400, videos: 890 },
  { day: "Tue", users: 18200, videos: 1240 },
  { day: "Wed", users: 15600, videos: 1100 },
  { day: "Thu", users: 21000, videos: 1560 },
  { day: "Fri", users: 25800, videos: 1890 },
  { day: "Sat", users: 31200, videos: 2340 },
  { day: "Sun", users: 28900, videos: 2100 },
];

const monthlyViews = [
  { month: "Sep", views: 4200000 },
  { month: "Oct", views: 6800000 },
  { month: "Nov", views: 8900000 },
  { month: "Dec", views: 11200000 },
  { month: "Jan", views: 14500000 },
  { month: "Feb", views: 16800000 },
  { month: "Mar", views: 18200000 },
];

const topCategories = [
  { name: "Comedy", videos: 1240 },
  { name: "Dance", videos: 980 },
  { name: "Food", videos: 760 },
  { name: "Travel", videos: 540 },
  { name: "Fitness", videos: 430 },
];

export default function Dashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground font-body mt-1">Overview of your platform</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={Users} title="Total Users" value="2.4M" change="+12.5% from last month" changeType="positive" />
        <StatsCard icon={Eye} title="Daily Views" value="18.2M" change="+8.3% from yesterday" changeType="positive" />
        <StatsCard icon={Video} title="Videos Uploaded" value="45.2K" change="+5.1% this week" changeType="positive" />
        <StatsCard icon={TrendingUp} title="Engagement Rate" value="6.8%" change="-0.3% from last week" changeType="negative" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-tiktok-pink" />
            <h2 className="font-display font-semibold text-foreground">Daily New Users & Videos</h2>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={dailyUsers}>
              <defs>
                <linearGradient id="usersGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fe2c55" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#fe2c55" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="videosGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#25f4ee" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#25f4ee" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="users" stroke="#fe2c55" fill="url(#usersGrad)" strokeWidth={2} name="New Users" />
              <Area type="monotone" dataKey="videos" stroke="#25f4ee" fill="url(#videosGrad)" strokeWidth={2} name="Videos" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-4 h-4 text-tiktok-cyan" />
            <h2 className="font-display font-semibold text-foreground">Monthly Views</h2>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyViews}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000000).toFixed(0)}M`} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={(v: number) => [`${(v/1000000).toFixed(1)}M`, "Views"]} />
              <Line type="monotone" dataKey="views" stroke="#25f4ee" strokeWidth={2} dot={{ fill: "#25f4ee", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Video className="w-4 h-4 text-tiktok-pink" />
            <h2 className="font-display font-semibold text-foreground">Top Categories</h2>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topCategories} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="videos" fill="#fe2c55" radius={[0, 4, 4, 0]} name="Videos" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-display font-semibold text-foreground">Recent Videos</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm font-display font-medium text-muted-foreground">Creator</th>
                  <th className="text-left p-4 text-sm font-display font-medium text-muted-foreground">Likes</th>
                  <th className="text-left p-4 text-sm font-display font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockVideos.map((v) => (
                  <tr key={v.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display font-bold text-xs">
                          {v.displayName.charAt(0)}
                        </div>
                        <p className="font-display font-medium text-sm text-foreground">{v.username}</p>
                      </div>
                    </td>
                    <td className="p-4 text-sm font-body text-foreground">{(v.likes / 1000).toFixed(1)}K</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-display font-medium ${v.status === "active" ? "bg-success/10 text-success" : v.status === "flagged" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400" : "bg-destructive/10 text-destructive"}`}>
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

      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-display font-semibold text-foreground mb-4">Recent Users</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {mockUsers.map((u) => (
            <div key={u.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-tiktok-pink to-tiktok-cyan flex items-center justify-center text-foreground font-display font-bold text-sm">
                {u.displayName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-semibold text-sm truncate">{u.displayName}</p>
                <p className="text-xs text-muted-foreground font-body truncate">{u.username}</p>
              </div>
              <span className={`text-[10px] font-display font-semibold px-2 py-0.5 rounded-full ${u.status === "active" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>{u.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
