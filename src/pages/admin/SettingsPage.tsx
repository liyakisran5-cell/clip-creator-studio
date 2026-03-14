import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground font-body mt-1">Platform configuration</p>
      </div>

      <div className="space-y-6">
        {[
          { label: "Auto-moderate flagged content", desc: "Automatically remove content flagged by 5+ users", default: true },
          { label: "Email notifications", desc: "Receive email alerts for high-severity reports", default: true },
          { label: "New user verification", desc: "Require email verification for new accounts", default: false },
          { label: "Allow video downloads", desc: "Let users download videos from the platform", default: true },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-xl border border-border p-5 flex items-center justify-between">
            <div>
              <Label className="font-display font-medium text-foreground text-base">{s.label}</Label>
              <p className="text-sm font-body text-muted-foreground mt-1">{s.desc}</p>
            </div>
            <Switch defaultChecked={s.default} />
          </div>
        ))}
      </div>
    </div>
  );
}
