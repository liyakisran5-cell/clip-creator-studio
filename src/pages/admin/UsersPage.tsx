import { mockUsers } from "@/data/mockVideos";

export default function UsersPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Users</h1>
        <p className="text-muted-foreground font-body mt-1">Manage platform users</p>
      </div>

      <div className="bg-card rounded-xl border border-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-display font-medium text-muted-foreground">User</th>
                <th className="text-left p-4 text-sm font-display font-medium text-muted-foreground">Followers</th>
                <th className="text-left p-4 text-sm font-display font-medium text-muted-foreground">Videos</th>
                <th className="text-left p-4 text-sm font-display font-medium text-muted-foreground">Total Likes</th>
                <th className="text-left p-4 text-sm font-display font-medium text-muted-foreground">Joined</th>
                <th className="text-left p-4 text-sm font-display font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((u) => (
                <tr key={u.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display font-bold">
                        {u.displayName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-display font-medium text-foreground">{u.displayName}</p>
                        <p className="text-xs font-body text-muted-foreground">{u.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-body text-foreground">{(u.followers / 1000).toFixed(0)}K</td>
                  <td className="p-4 text-sm font-body text-foreground">{u.videos}</td>
                  <td className="p-4 text-sm font-body text-foreground">{(u.likes / 1_000_000).toFixed(1)}M</td>
                  <td className="p-4 text-sm font-body text-muted-foreground">{u.joined}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-display font-medium ${
                      u.status === "active"
                        ? "bg-success/10 text-success"
                        : "bg-destructive/10 text-destructive"
                    }`}>
                      {u.status}
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
