export interface Sound {
  id: string;
  title: string;
  artist: string;
  duration: string;
  uses: number;
  category: "trending" | "pop" | "hiphop" | "classical" | "desi" | "remix";
  coverColor: string;
  bpm?: number;
}

export const mockSounds: Sound[] = [
  { id: "s1", title: "Kesariya", artist: "Arijit Singh", duration: "3:42", uses: 2400000, category: "pop", coverColor: "from-amber-500 to-orange-600", bpm: 95 },
  { id: "s2", title: "Pasoori", artist: "Ali Sethi & Shae Gill", duration: "4:01", uses: 5600000, category: "desi", coverColor: "from-teal-500 to-emerald-600", bpm: 88 },
  { id: "s3", title: "Savage Love", artist: "Jason Derulo", duration: "2:53", uses: 9800000, category: "pop", coverColor: "from-rose-500 to-pink-600", bpm: 104 },
  { id: "s4", title: "Blinding Lights", artist: "The Weeknd", duration: "3:20", uses: 12000000, category: "pop", coverColor: "from-purple-500 to-violet-600", bpm: 171 },
  { id: "s5", title: "Workout Phonk", artist: "DJ Pump", duration: "2:10", uses: 3400000, category: "hiphop", coverColor: "from-blue-600 to-sky-500", bpm: 140 },
  { id: "s6", title: "Coke Studio Mix", artist: "Various Artists", duration: "3:55", uses: 1800000, category: "desi", coverColor: "from-red-500 to-rose-600", bpm: 92 },
  { id: "s7", title: "Tera Yaar Hoon Main", artist: "Arijit Singh", duration: "4:12", uses: 4200000, category: "desi", coverColor: "from-indigo-500 to-blue-600", bpm: 80 },
  { id: "s8", title: "Trending Beat #1", artist: "Remix Artist", duration: "1:30", uses: 7800000, category: "trending", coverColor: "from-fuchsia-500 to-pink-500", bpm: 128 },
  { id: "s9", title: "Lo-Fi Study", artist: "Chill Beats", duration: "5:00", uses: 890000, category: "classical", coverColor: "from-slate-500 to-zinc-600", bpm: 70 },
  { id: "s10", title: "Original Sound Viral", artist: "@dance_queen", duration: "0:30", uses: 3100000, category: "trending", coverColor: "from-cyan-500 to-teal-500", bpm: 120 },
  { id: "s11", title: "Husn", artist: "Anuv Jain", duration: "3:28", uses: 6700000, category: "pop", coverColor: "from-yellow-500 to-amber-600", bpm: 85 },
  { id: "s12", title: "Prada", artist: "Jass Manak", duration: "3:05", uses: 2900000, category: "desi", coverColor: "from-green-500 to-emerald-500", bpm: 99 },
];
