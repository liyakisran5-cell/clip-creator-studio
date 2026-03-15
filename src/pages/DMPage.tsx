import { ArrowLeft, Send } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { mockMessages, mockChatMessages } from "@/data/mockVideos";
import { useState } from "react";

export default function DMPage() {
  const navigate = useNavigate();
  const { username } = useParams();
  const contact = mockMessages.find((m) => m.username === username) || mockMessages[0];
  const [messages, setMessages] = useState(mockChatMessages);
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { id: `cm-${Date.now()}`, sender: "me", text, time: "now" }]);
    setText("");
  };

  return (
    <div className="dark h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border flex-shrink-0">
        <button onClick={() => navigate("/inbox")}>
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-tiktok-pink to-tiktok-cyan flex items-center justify-center text-foreground font-display font-bold text-sm">
          {contact.displayName.charAt(0)}
        </div>
        <span className="font-display font-bold text-sm">{contact.displayName}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-none">
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

      {/* Input */}
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
