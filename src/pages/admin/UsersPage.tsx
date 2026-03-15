import { Users } from "lucide-react";

export default function UsersPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Users</h1>
        <p className="text-muted-foreground font-body mt-1">Manage platform users & verification badges</p>
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
                <th className="text-left p-4 text-sm font-display font-medium text-muted-foreground">Verified</th>
                <th className="text-left p-4 text-sm font-display font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7} className="p-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <Users className="w-10 h-10 text-muted-foreground" />
                    <p className="font-display font-semibold text-foreground">No Users Yet</p>
                    <p className="text-sm text-muted-foreground font-body">Users who sign up will appear here.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
