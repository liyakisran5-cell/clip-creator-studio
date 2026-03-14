import { Flag, AlertTriangle, CheckCircle } from "lucide-react";

const reports = [
  { id: 1, type: "Inappropriate Content", video: "Dance video #1234", reporter: "@user_123", date: "2026-03-14", severity: "high" },
  { id: 2, type: "Spam", video: "Product promotion #567", reporter: "@mod_team", date: "2026-03-13", severity: "medium" },
  { id: 3, type: "Harassment", video: "Comment on video #890", reporter: "@user_456", date: "2026-03-12", severity: "high" },
  { id: 4, type: "Copyright", video: "Music video #345", reporter: "@artist_official", date: "2026-03-11", severity: "low" },
];

export default function ReportsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground font-body mt-1">Content reports & moderation queue</p>
      </div>

      <div className="space-y-4">
        {reports.map((r) => (
          <div key={r.id} className="bg-card rounded-xl border border-border p-5 flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                r.severity === "high" ? "bg-destructive/10" : r.severity === "medium" ? "bg-amber-100" : "bg-muted"
              }`}>
                {r.severity === "high" ? (
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                ) : (
                  <Flag className="w-5 h-5 text-amber-600" />
                )}
              </div>
              <div>
                <p className="font-display font-medium text-foreground">{r.type}</p>
                <p className="text-sm font-body text-muted-foreground">{r.video} • by {r.reporter}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-body text-muted-foreground">{r.date}</span>
              <button className="p-2 rounded-lg bg-success/10 hover:bg-success/20 transition-colors">
                <CheckCircle className="w-4 h-4 text-success" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
