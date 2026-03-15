import { ArrowLeft, Send } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function DMPage() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [messages, setMessages] = useState<{ id: string; sender: string; text: string; time: string }[]>([]);
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: `cm-${Date.now()}`, sender: "me", text, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
    ]);
    setText("");
  };

  return (
    <div className="dark h-screen bg-background text-foreground flex flex-col">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border flex-shrink-0">
        <button onClick={() => navigate("/inbox")}>
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-tiktok-pink to-tiktok-cyan flex items-center justify-center text-foreground font-display font-bold text-sm">
          {(username || "?").replace("@", "").charAt(0).toUpperCase()}
        </div>
        <span className="font-display font-bold text-sm">{username || "User"}</span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-none">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-center">
            <p className="text-sm text-muted-foreground font-body">No messages yet. Say hi!</p>
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
              m.sender === "me"
                ? "bg-tiktok-pink text-primary-foreground rounded-br-sm"
                : "bg-muted text-foreground rounded-bl-sm"
            }`}>
              <p className="text-sm font-body">{m.text}</p>
              <p className={`text-[10px] mt-1 ${m.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{m.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 px-4 py-3 border-t border-border flex-shrink-0">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Message..."
          className="flex-1 bg-muted rounded-full px-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground outline-none"
        />
        <button onClick={sendMessage} className="text-tiktok-pink">
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
