import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
}

export default function StatsCard({ title, value, change, changeType, icon: Icon }: StatsCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-body text-muted-foreground">{title}</span>
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
      <p className="text-3xl font-display font-bold text-foreground">{value}</p>
      <p className={`text-sm font-body mt-1 ${
        changeType === "positive" ? "text-success" : changeType === "negative" ? "text-destructive" : "text-muted-foreground"
      }`}>
        {change}
      </p>
    </div>
  );
}
