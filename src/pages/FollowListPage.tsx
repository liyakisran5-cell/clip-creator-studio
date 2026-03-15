import { ArrowLeft, Users } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";

export default function FollowListPage() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "followers";
  const [activeTab, setActiveTab] = useState<"followers" | "following">(tab as "followers" | "following");

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <span className="font-display font-bold text-base">{username}</span>
      </div>

      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab("followers")}
          className={`flex-1 py-3 text-sm font-display font-semibold text-center ${activeTab === "followers" ? "border-b-2 border-foreground text-foreground" : "text-muted-foreground"}`}
        >
          Followers
        </button>
        <button
          onClick={() => setActiveTab("following")}
          className={`flex-1 py-3 text-sm font-display font-semibold text-center ${activeTab === "following" ? "border-b-2 border-foreground text-foreground" : "text-muted-foreground"}`}
        >
          Following
        </button>
      </div>

      <div className="flex flex-col items-center justify-center py-24 gap-3 text-center px-6">
        <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
          <Users className="w-7 h-7 text-muted-foreground" />
        </div>
        <p className="font-display font-semibold text-foreground">
          {activeTab === "followers" ? "No Followers Yet" : "Not Following Anyone"}
        </p>
        <p className="text-xs text-muted-foreground font-body">
          {activeTab === "followers"
            ? "When people follow this account, they will appear here."
            : "Accounts this user follows will appear here."}
        </p>
      </div>
    </div>
  );
}
