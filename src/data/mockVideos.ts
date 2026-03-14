export interface Video {
  id: string;
  username: string;
  displayName: string;
  caption: string;
  song: string;
  likes: number;
  comments: number;
  shares: number;
  avatar: string;
  videoColor: string; // placeholder gradient
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
    caption: "Hunza Valley is heaven on earth 🏔️ #pakistan #travel",
    song: "♫ Mountain Vibes - Nature",
    likes: 67800,
    comments: 2340,
    shares: 5600,
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
    caption: "30 day transformation challenge 💪 #fitness #gym",
    song: "♫ Workout Mix - DJ Pump",
    likes: 23400,
    comments: 678,
    shares: 1200,
    avatar: "",
    videoColor: "from-blue-600 via-sky-500 to-cyan-300",
    verified: false,
    createdAt: "2026-03-10",
    status: "active",
  },
];

export const mockUsers = [
  { id: "u1", username: "@dance_queen", displayName: "Sarah Khan", followers: 1200000, following: 342, videos: 89, likes: 4500000, joined: "2025-06-15", status: "active" as const },
  { id: "u2", username: "@foodie_life", displayName: "Ali Ahmed", followers: 560000, following: 128, videos: 156, likes: 2100000, joined: "2025-08-22", status: "active" as const },
  { id: "u3", username: "@comedy_king", displayName: "Hassan Raza", followers: 3400000, following: 67, videos: 234, likes: 15000000, joined: "2025-03-10", status: "active" as const },
  { id: "u4", username: "@travel_pk", displayName: "Fatima Noor", followers: 890000, following: 245, videos: 67, likes: 3200000, joined: "2025-09-01", status: "suspended" as const },
  { id: "u5", username: "@fitness_guru", displayName: "Omar Fitness", followers: 340000, following: 89, videos: 45, likes: 890000, joined: "2025-11-15", status: "active" as const },
];
