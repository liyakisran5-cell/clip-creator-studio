export interface Video {
  id: string;
  username: string;
  displayName: string;
  caption: string;
  song: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  avatar: string;
  videoColor: string;
  verified: boolean;
  createdAt: string;
  status: "active" | "flagged" | "removed";
}

export const mockVideos: Video[] = [
  {
    id: "1",
    username: "@dance_queen",
    displayName: "Sarah Khan",
    caption: "New dance trend 🔥 #viral #dance #trending",
    song: "♫ Original Sound - dance_queen",
    likes: 45200,
    comments: 1230,
    shares: 890,
    views: 1250000,
    avatar: "",
    videoColor: "from-rose-600 via-pink-500 to-orange-400",
    verified: true,
    createdAt: "2026-03-14",
    status: "active",
  },
  {
    id: "2",
    username: "@foodie_life",
    displayName: "Ali Ahmed",
    caption: "Best biryani recipe ever! 🍚 #food #cooking #biryani",
    song: "♫ Cooking Beats - DJ Chef",
    likes: 32100,
    comments: 856,
    shares: 2100,
    views: 890000,
    avatar: "",
    videoColor: "from-amber-500 via-yellow-400 to-lime-400",
    verified: false,
    createdAt: "2026-03-13",
    status: "active",
  },
  {
    id: "3",
    username: "@comedy_king",
    displayName: "Hassan Raza",
    caption: "When your mom calls during gaming 😂 #funny #relatable",
    song: "♫ Funny BGM - Memes",
    likes: 98700,
    comments: 4560,
    shares: 12300,
    views: 5600000,
    avatar: "",
    videoColor: "from-violet-600 via-purple-500 to-indigo-400",
    verified: true,
    createdAt: "2026-03-12",
    status: "active",
  },
  {
    id: "4",
    username: "@travel_pk",
    displayName: "Fatima Noor",
    caption: "Hunza Valley is heaven on earth 🏔️ #pakistan #travel #nature",
    song: "♫ Mountain Vibes - Nature",
    likes: 67800,
    comments: 2340,
    shares: 5600,
    views: 3200000,
    avatar: "",
    videoColor: "from-emerald-500 via-teal-400 to-cyan-400",
    verified: true,
    createdAt: "2026-03-11",
    status: "flagged",
  },
  {
    id: "5",
    username: "@fitness_guru",
    displayName: "Omar Fitness",
    caption: "30 day transformation challenge 💪 #fitness #gym #workout",
    song: "♫ Workout Mix - DJ Pump",
    likes: 23400,
    comments: 678,
    shares: 1200,
    views: 670000,
    avatar: "",
    videoColor: "from-blue-600 via-sky-500 to-cyan-300",
    verified: false,
    createdAt: "2026-03-10",
    status: "active",
  },
];

export const mockUsers = [
  { id: "u1", username: "@dance_queen", displayName: "Sarah Khan", followers: 1200000, following: 342, videos: 89, likes: 4500000, joined: "2025-06-15", status: "active" as const, verified: true, bio: "💃 Dance is life | Content Creator", bioLinks: [{ label: "Instagram", url: "https://instagram.com/dance_queen" }, { label: "YouTube", url: "https://youtube.com/@dance_queen" }] },
  { id: "u2", username: "@foodie_life", displayName: "Ali Ahmed", followers: 560000, following: 128, videos: 156, likes: 2100000, joined: "2025-08-22", status: "active" as const, verified: false, bio: "🍳 Food blogger | Recipes daily", bioLinks: [{ label: "YouTube", url: "https://youtube.com/@foodie_life" }] },
  { id: "u3", username: "@comedy_king", displayName: "Hassan Raza", followers: 3400000, following: 67, videos: 234, likes: 15000000, joined: "2025-03-10", status: "active" as const, verified: true, bio: "😂 Making Pakistan laugh | DM for collabs", bioLinks: [{ label: "Instagram", url: "https://instagram.com/comedy_king" }] },
  { id: "u4", username: "@travel_pk", displayName: "Fatima Noor", followers: 890000, following: 245, videos: 67, likes: 3200000, joined: "2025-09-01", status: "suspended" as const, verified: true, bio: "🏔️ Exploring Pakistan one mountain at a time", bioLinks: [] },
  { id: "u5", username: "@fitness_guru", displayName: "Omar Fitness", followers: 340000, following: 89, videos: 45, likes: 890000, joined: "2025-11-15", status: "active" as const, verified: false, bio: "💪 Certified Trainer | Transform your body", bioLinks: [{ label: "Website", url: "https://omarfitness.com" }] },
];

export const mockMessages = [
  { id: "m1", username: "@dance_queen", displayName: "Sarah Khan", lastMessage: "Hey! Love your content 🔥", time: "2m", unread: 2 },
  { id: "m2", username: "@comedy_king", displayName: "Hassan Raza", lastMessage: "Collab karte hain bro?", time: "15m", unread: 0 },
  { id: "m3", username: "@foodie_life", displayName: "Ali Ahmed", lastMessage: "Recipe bhejo please!", time: "1h", unread: 1 },
  { id: "m4", username: "@travel_pk", displayName: "Fatima Noor", lastMessage: "Hunza trip plan kar rahe hain", time: "3h", unread: 0 },
  { id: "m5", username: "@fitness_guru", displayName: "Omar Fitness", lastMessage: "Workout plan ready hai 💪", time: "1d", unread: 0 },
];

export const mockChatMessages = [
  { id: "cm1", sender: "them", text: "Hey! Love your content 🔥", time: "10:30 AM" },
  { id: "cm2", sender: "me", text: "Thank you so much! 😊", time: "10:31 AM" },
  { id: "cm3", sender: "them", text: "Collab karte hain?", time: "10:32 AM" },
  { id: "cm4", sender: "me", text: "Sure, DM me the details!", time: "10:33 AM" },
  { id: "cm5", sender: "them", text: "Great! I'll send the plan tomorrow", time: "10:35 AM" },
];
