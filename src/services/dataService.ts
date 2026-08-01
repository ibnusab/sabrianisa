import { supabase, isSupabaseConfigured } from "../lib/supabase";
import {
  Memory,
  Note,
  JournalEntry,
  Song,
  FavoriteItem,
  Milestone,
  CoupleSettings,
} from "../types";

// Default initial seeds with valid PostgreSQL UUIDs
const DEFAULT_SETTINGS: CoupleSettings = {
  partner1_name: "Alex",
  partner2_name: "Emma",
  partner1_avatar:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
  partner2_avatar:
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400",
  cover_photo:
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1200",
  relationship_start_date: "2023-05-20",
  hero_title: "sabrianisa",
  hero_subtitle:
    "A sweet corner of the cosmos made entirely of our love, quiet laughs, and endless memories.",
  bg_music_url:
    "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3",
  particle_type: "hearts",
};

const DEFAULT_MEMORIES: Memory[] = [
  {
    id: "a1111111-0000-4000-a000-000000000001",
    title: "Our Very First Date",
    description:
      "We sat at the quiet corner café for four hours straight. The coffee went cold, but neither of us wanted the night to end.",
    date: "2023-05-20",
    photo_url:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1200",
    location: "Rosetta Café, Downtown",
    category: "first_date",
  },
  {
    id: "a1111111-0000-4000-a000-000000000002",
    title: "Stargazing by the Coast",
    description:
      "Under a night blanket full of shooting stars, we wrapped ourselves in a cozy wool blanket and made a promise for tomorrow.",
    date: "2023-08-14",
    photo_url:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200",
    location: "Whispering Cliffs Lookout",
    category: "travel",
  },
  {
    id: "a1111111-0000-4000-a000-000000000003",
    title: "First Anniversary Celebration",
    description:
      "A candlelit picnic with homemade strawberry tart and endless laughter as we opened our handwritten memory scrapbook.",
    date: "2024-05-20",
    photo_url:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=1200",
    location: "Rosewood Botanical Garden",
    category: "anniversary",
  },
  {
    id: "a1111111-0000-4000-a000-000000000004",
    title: "Cozy Rainy Sunday",
    description:
      "Baking matcha cookies together while listening to jazz vinyls as rain pitter-pattered gently against the bedroom windows.",
    date: "2024-11-10",
    photo_url:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=1200",
    location: "Our Cozy Apartment",
    category: "daily",
  },
];

const DEFAULT_NOTES: Note[] = [
  {
    id: "b2222222-0000-4000-a000-000000000001",
    sender: "Alex",
    receiver: "Emma",
    message:
      "Good morning my sunshine! 💖 I packed your favorite matcha latte in your thermal flask. Hope today treats you as wonderfully as you treat me!",
    is_pinned: true,
    theme: "rose",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "b2222222-0000-4000-a000-000000000002",
    sender: "Emma",
    receiver: "Alex",
    message:
      "Thank you for holding my hand when I was anxious yesterday. Having you in my life makes every heavy day feel ten times lighter. Love you endlessly! ✨",
    is_pinned: true,
    theme: "blush",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "b2222222-0000-4000-a000-000000000003",
    sender: "Alex",
    receiver: "Emma",
    message:
      "Can’t wait for our weekend trip! I hid a little surprise in your handbag drawer... open it when you read this! 🌹",
    is_pinned: false,
    theme: "gold",
    created_at: new Date().toISOString(),
  },
];

const DEFAULT_JOURNAL: JournalEntry[] = [
  {
    id: "c3333333-0000-4000-a000-000000000001",
    title: "The Day We Adopted Mochi 🐾",
    content:
      "Today we brought home our little golden pup, Mochi! He fell asleep right on Emma’s lap during the drive back. Our apartment feels complete now.",
    mood: "joy",
    author: "Alex",
    photo_url:
      "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800",
    created_at: "2024-09-15T14:30:00Z",
  },
  {
    id: "c3333333-0000-4000-a000-000000000002",
    title: "Midnight Pancakes & Deep Talk 🥞",
    content:
      "Neither of us could sleep so we cooked fluffy blueberry pancakes at 1 AM. We talked about where we see ourselves in ten years.",
    mood: "cozy",
    author: "Emma",
    photo_url:
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&q=80&w=800",
    created_at: "2024-12-01T01:15:00Z",
  },
];

const DEFAULT_SONGS: Song[] = [
  {
    id: "d4444444-0000-4000-a000-000000000001",
    title: "Golden Hour Serenade",
    artist: "Acoustic Love Strings",
    cover_url:
      "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=400",
    music_url:
      "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3",
    duration: "3:45",
    dedication: "Our sunset song from Santorin beach trip",
  },
  {
    id: "d4444444-0000-4000-a000-000000000002",
    title: "Soft Rain & Warm Coffee",
    artist: "Velvet Jazz Quartet",
    cover_url:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=400",
    music_url:
      "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a1e284.mp3?filename=sweet-piano-lullaby-10832.mp3",
    duration: "4:12",
    dedication: "The song playing during our first kiss in the rain",
  },
  {
    id: "d4444444-0000-4000-a000-000000000003",
    title: "Whispering Stars",
    artist: "Luna Acoustic",
    cover_url:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=400",
    music_url:
      "https://cdn.pixabay.com/download/audio/2021/11/25/audio_9185a67605.mp3?filename=romantic-love-1234.mp3",
    duration: "2:58",
    dedication: "For slow dancing in the living room at midnight",
  },
];

const DEFAULT_FAVORITES: FavoriteItem[] = [
  {
    id: "e5555555-0000-4000-a000-000000000001",
    category: "movies",
    title: "About Time",
    description:
      "Our favorite movie to re-watch on rainy nights with warm cider.",
    rating: 5,
    image_url:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "e5555555-0000-4000-a000-000000000002",
    category: "places",
    title: "Kyoto Bamboo Forest in Spring",
    description:
      "The place where time stood still as cherry blossoms showered over us.",
    rating: 5,
    image_url:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "e5555555-0000-4000-a000-000000000003",
    category: "foods",
    title: "Homemade Truffle Mushroom Pasta",
    description: "The signature recipe Alex mastered just to make Emma smile.",
    rating: 5,
    image_url:
      "https://images.unsplash.com/photo-1621996346565-e3d5d6281292?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "e5555555-0000-4000-a000-000000000004",
    category: "dreams",
    title: "Glass House Cottage in Iceland",
    description:
      "To watch the Northern Lights together from under a warm fluffy duvet.",
    rating: 5,
    image_url:
      "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=600",
  },
];

const DEFAULT_MILESTONES: Milestone[] = [
  {
    id: "f6666666-0000-4000-a000-000000000001",
    targetDays: 100,
    label: "100 Days Together",
    description: "First major centennial milestone",
  },
  {
    id: "f6666666-0000-4000-a000-000000000002",
    targetDays: 365,
    label: "1 Year Anniversary",
    description: "365 days of warm smiles and growth",
  },
  {
    id: "f6666666-0000-4000-a000-000000000003",
    targetDays: 500,
    label: "500 Days Together",
    description: "Halfway to a thousand",
  },
  {
    id: "f6666666-0000-4000-a000-000000000004",
    targetDays: 730,
    label: "2 Years Anniversary",
    description: "Two beautiful revolutions around the sun",
  },
  {
    id: "f6666666-0000-4000-a000-000000000005",
    targetDays: 1000,
    label: "1,000 Days Together",
    description: "A thousand days in love",
  },
  {
    id: "f6666666-0000-4000-a000-000000000006",
    targetDays: 1825,
    label: "5 Years Golden Anniversary",
    description: "Half a decade of shared life",
  },
];

// Helper for generating UUIDs compatible with PostgreSQL UUID columns
const generateUUID = (): string => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const isValidUUID = (id?: string): boolean => {
  return (
    typeof id === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
  );
};

const ensureUUID = (id?: string): string => {
  if (id && isValidUUID(id)) return id;
  return generateUUID();
};

const cleanPayload = (obj: Record<string, any>): Record<string, any> => {
  const clean: Record<string, any> = {};
  for (const [key, val] of Object.entries(obj)) {
    if (val !== undefined) {
      clean[key] = val;
    }
  }
  if (clean.id) {
    clean.id = ensureUUID(clean.id);
  }
  return clean;
};

// Helper for localStorage key persistence
const getLocalRaw = <T>(
  key: string,
): { data: T | null; isFirstLoad: boolean } => {
  try {
    const data = localStorage.getItem(`olu_${key}`);
    if (data !== null) {
      return { data: JSON.parse(data), isFirstLoad: false };
    }
  } catch (e) {
    // ignore
  }
  return { data: null, isFirstLoad: true };
};

const getLocal = <T>(key: string, fallback: T): T => {
  const { data, isFirstLoad } = getLocalRaw<T>(key);
  if (!isFirstLoad && data !== null) {
    return data;
  }
  setLocal(key, fallback);
  return fallback;
};

const setLocal = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(`olu_${key}`, JSON.stringify(data));
  } catch (e) {
    console.warn("LocalStorage save failed", e);
  }
};

const mergeLocalAndRemote = <T extends { id: string }>(
  local: T[],
  remote: T[],
): T[] => {
  if (!remote || remote.length === 0) return local;
  if (!local || local.length === 0) return remote;

  const map = new Map<string, T>();
  remote.forEach((r) => {
    if (r.id) map.set(r.id, r);
  });
  local.forEach((l) => {
    if (l.id && !map.has(l.id)) map.set(l.id, l);
  });
  return Array.from(map.values());
};

// Data service operations
export const dataService = {
  // SETTINGS
  async getSettings(): Promise<CoupleSettings> {
    const { data: localData, isFirstLoad } =
      getLocalRaw<CoupleSettings>("settings");
    let local = localData || DEFAULT_SETTINGS;

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from("settings")
          .select("*")
          .limit(1);
        if (error) {
          console.error("Supabase getSettings error:", error);
        } else if (data && data.length > 0) {
          const res = { ...DEFAULT_SETTINGS, ...data[0] };
          if (
            !res.hero_title ||
            res.hero_title === "Our Little Universe" ||
            res.hero_title === "Our Universe"
          ) {
            res.hero_title = "sabrianisa";
          }
          setLocal("settings", res);
          return res;
        } else if (data && data.length === 0) {
          // Seed default settings to Supabase
          const payload = { id: "default", ...local };
          await supabase.from("settings").insert([payload]);
        }
      } catch (err) {
        console.warn("Supabase getSettings failed, using local:", err);
      }
    }

    if (
      !local.hero_title ||
      local.hero_title === "Our Little Universe" ||
      local.hero_title === "Our Universe"
    ) {
      local = { ...local, hero_title: "sabrianisa" };
    }
    if (isFirstLoad) {
      setLocal("settings", local);
    }
    return local;
  },

  async updateSettings(settings: CoupleSettings): Promise<CoupleSettings> {
    const payload = { id: "default", ...settings };
    setLocal("settings", payload);
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from("settings").upsert([payload]);
        if (error) {
          console.error("Supabase updateSettings error:", error);
        }
      } catch (err) {
        console.warn("Supabase updateSettings failed:", err);
      }
    }
    return payload;
  },

  // MEMORIES
  async getMemories(): Promise<Memory[]> {
    const { data: localData, isFirstLoad } = getLocalRaw<Memory[]>("memories");
    let local = (localData ?? DEFAULT_MEMORIES).map((m) => ({
      ...m,
      id: ensureUUID(m.id),
    }));
    if (isFirstLoad) {
      setLocal("memories", local);
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from("memories")
          .select("*")
          .order("date", { ascending: false });
        if (error) {
          console.error("Supabase getMemories error:", error);
        } else if (data) {
          if (data.length === 0 && local.length > 0) {
            const payloads = local.map(cleanPayload);
            await supabase.from("memories").insert(payloads);
          }
          if (isFirstLoad && data.length > 0) {
            setLocal("memories", data);
            return data;
          }
          const merged = mergeLocalAndRemote(local, data);
          setLocal("memories", merged);
          return merged;
        }
      } catch (err) {
        console.warn("Supabase getMemories failed, using local:", err);
      }
    }
    return local;
  },

  async addMemory(memory: Omit<Memory, "id">): Promise<Memory> {
    const newMemory: Memory = { ...memory, id: generateUUID() };
    const current = getLocal<Memory[]>("memories", DEFAULT_MEMORIES).map(
      (m) => ({ ...m, id: ensureUUID(m.id) }),
    );
    const updated = [newMemory, ...current];
    setLocal("memories", updated);

    if (isSupabaseConfigured && supabase) {
      try {
        const payload = cleanPayload(newMemory);
        const { data, error } = await supabase
          .from("memories")
          .insert([payload])
          .select()
          .single();
        if (error) {
          console.error("Supabase addMemory error:", error);
        } else if (data) {
          return data as Memory;
        }
      } catch (err) {
        console.warn("Supabase addMemory failed:", err);
      }
    }
    return newMemory;
  },

  async updateMemory(memory: Memory): Promise<Memory> {
    const cleanMem = { ...memory, id: ensureUUID(memory.id) };
    const current = getLocal<Memory[]>("memories", DEFAULT_MEMORIES).map(
      (m) => ({ ...m, id: ensureUUID(m.id) }),
    );
    const updated = current.map((m) => (m.id === cleanMem.id ? cleanMem : m));
    setLocal("memories", updated);

    if (isSupabaseConfigured && supabase) {
      try {
        const payload = cleanPayload(cleanMem);
        const { data, error } = await supabase
          .from("memories")
          .upsert([payload])
          .select()
          .single();
        if (error) {
          console.error("Supabase updateMemory error:", error);
        } else if (data) {
          return data as Memory;
        }
      } catch (err) {
        console.warn("Supabase updateMemory failed:", err);
      }
    }
    return cleanMem;
  },

  async deleteMemory(id: string): Promise<void> {
    const current = getLocal<Memory[]>("memories", DEFAULT_MEMORIES);
    const updated = current.filter((m) => m.id !== id);
    setLocal("memories", updated);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from("memories").delete().eq("id", id);
        if (error) console.error("Supabase deleteMemory error:", error);
      } catch (err) {
        console.warn("Supabase deleteMemory failed:", err);
      }
    }
  },

  // LOVE NOTES
  async getNotes(): Promise<Note[]> {
    const { data: localData, isFirstLoad } = getLocalRaw<Note[]>("notes");
    let local = (localData ?? DEFAULT_NOTES).map((n) => ({
      ...n,
      id: ensureUUID(n.id),
    }));
    if (isFirstLoad) {
      setLocal("notes", local);
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from("notes")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) {
          console.error("Supabase getNotes error:", error);
        } else if (data) {
          if (data.length === 0 && local.length > 0) {
            const payloads = local.map(cleanPayload);
            await supabase.from("notes").insert(payloads);
          }
          if (isFirstLoad && data.length > 0) {
            setLocal("notes", data);
            return data;
          }
          const merged = mergeLocalAndRemote(local, data);
          setLocal("notes", merged);
          return merged;
        }
      } catch (err) {
        console.warn("Supabase getNotes failed, using local:", err);
      }
    }
    return local;
  },

  async addNote(note: Omit<Note, "id" | "created_at">): Promise<Note> {
    const newNote: Note = {
      ...note,
      id: generateUUID(),
      created_at: new Date().toISOString(),
    };
    const current = getLocal<Note[]>("notes", DEFAULT_NOTES).map((n) => ({
      ...n,
      id: ensureUUID(n.id),
    }));
    const updated = [newNote, ...current];
    setLocal("notes", updated);

    if (isSupabaseConfigured && supabase) {
      try {
        const payload = cleanPayload(newNote);
        const { data, error } = await supabase
          .from("notes")
          .insert([payload])
          .select()
          .single();
        if (error) {
          console.error("Supabase addNote error:", error);
        } else if (data) {
          return data as Note;
        }
      } catch (err) {
        console.warn("Supabase addNote failed:", err);
      }
    }
    return newNote;
  },

  async updateNote(note: Note): Promise<Note> {
    const cleanNote = { ...note, id: ensureUUID(note.id) };
    const current = getLocal<Note[]>("notes", DEFAULT_NOTES).map((n) => ({
      ...n,
      id: ensureUUID(n.id),
    }));
    const updated = current.map((n) => (n.id === cleanNote.id ? cleanNote : n));
    setLocal("notes", updated);

    if (isSupabaseConfigured && supabase) {
      try {
        const payload = cleanPayload(cleanNote);
        const { data, error } = await supabase
          .from("notes")
          .upsert([payload])
          .select()
          .single();
        if (error) {
          console.error("Supabase updateNote error:", error);
        } else if (data) {
          return data as Note;
        }
      } catch (err) {
        console.warn("Supabase updateNote failed:", err);
      }
    }
    return cleanNote;
  },

  async togglePinNote(id: string, is_pinned: boolean): Promise<void> {
    const current = getLocal<Note[]>("notes", DEFAULT_NOTES);
    setLocal(
      "notes",
      current.map((n) => (n.id === id ? { ...n, is_pinned } : n)),
    );
    if (isSupabaseConfigured && supabase && isValidUUID(id)) {
      try {
        const { error } = await supabase
          .from("notes")
          .update({ is_pinned })
          .eq("id", id);
        if (error) console.error("Supabase togglePinNote error:", error);
      } catch (err) {
        console.warn("Supabase togglePinNote failed:", err);
      }
    }
  },

  async deleteNote(id: string): Promise<void> {
    const current = getLocal<Note[]>("notes", DEFAULT_NOTES);
    const updated = current.filter((n) => n.id !== id);
    setLocal("notes", updated);

    if (isSupabaseConfigured && supabase && isValidUUID(id)) {
      try {
        const { error } = await supabase.from("notes").delete().eq("id", id);
        if (error) console.error("Supabase deleteNote error:", error);
      } catch (err) {
        console.warn("Supabase deleteNote failed:", err);
      }
    }
  },

  // JOURNAL
  async getJournalEntries(): Promise<JournalEntry[]> {
    const { data: localData, isFirstLoad } =
      getLocalRaw<JournalEntry[]>("journal");
    let local = (localData ?? DEFAULT_JOURNAL).map((j) => ({
      ...j,
      id: ensureUUID(j.id),
    }));
    if (isFirstLoad) {
      setLocal("journal", local);
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from("journal_entries")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) {
          console.error("Supabase getJournalEntries error:", error);
        } else if (data) {
          if (data.length === 0 && local.length > 0) {
            const payloads = local.map(cleanPayload);
            await supabase.from("journal_entries").insert(payloads);
          }
          if (isFirstLoad && data.length > 0) {
            setLocal("journal", data);
            return data;
          }
          const merged = mergeLocalAndRemote(local, data);
          setLocal("journal", merged);
          return merged;
        }
      } catch (err) {
        console.warn("Supabase getJournalEntries failed, using local:", err);
      }
    }
    return local;
  },

  async addJournalEntry(
    entry: Omit<JournalEntry, "id" | "created_at">,
  ): Promise<JournalEntry> {
    const newEntry: JournalEntry = {
      ...entry,
      id: generateUUID(),
      created_at: new Date().toISOString(),
    };
    const current = getLocal<JournalEntry[]>("journal", DEFAULT_JOURNAL).map(
      (j) => ({ ...j, id: ensureUUID(j.id) }),
    );
    const updated = [newEntry, ...current];
    setLocal("journal", updated);

    if (isSupabaseConfigured && supabase) {
      try {
        const payload = cleanPayload(newEntry);
        const { data, error } = await supabase
          .from("journal_entries")
          .insert([payload])
          .select()
          .single();
        if (error) {
          console.error("Supabase addJournalEntry error:", error);
        } else if (data) {
          return data as JournalEntry;
        }
      } catch (err) {
        console.warn("Supabase addJournalEntry failed:", err);
      }
    }
    return newEntry;
  },

  async updateJournalEntry(entry: JournalEntry): Promise<JournalEntry> {
    const cleanEntry = { ...entry, id: ensureUUID(entry.id) };
    const current = getLocal<JournalEntry[]>("journal", DEFAULT_JOURNAL).map(
      (j) => ({ ...j, id: ensureUUID(j.id) }),
    );
    const updated = current.map((j) =>
      j.id === cleanEntry.id ? cleanEntry : j,
    );
    setLocal("journal", updated);

    if (isSupabaseConfigured && supabase) {
      try {
        const payload = cleanPayload(cleanEntry);
        const { data, error } = await supabase
          .from("journal_entries")
          .upsert([payload])
          .select()
          .single();
        if (error) {
          console.error("Supabase updateJournalEntry error:", error);
        } else if (data) {
          return data as JournalEntry;
        }
      } catch (err) {
        console.warn("Supabase updateJournalEntry failed:", err);
      }
    }
    return cleanEntry;
  },

  async deleteJournalEntry(id: string): Promise<void> {
    const current = getLocal<JournalEntry[]>("journal", DEFAULT_JOURNAL);
    const updated = current.filter((j) => j.id !== id);
    setLocal("journal", updated);

    if (isSupabaseConfigured && supabase && isValidUUID(id)) {
      try {
        const { error } = await supabase
          .from("journal_entries")
          .delete()
          .eq("id", id);
        if (error) console.error("Supabase deleteJournalEntry error:", error);
      } catch (err) {
        console.warn("Supabase deleteJournalEntry failed:", err);
      }
    }
  },

  // MUSIC / SONGS
  async getSongs(): Promise<Song[]> {
    const { data: localData, isFirstLoad } = getLocalRaw<Song[]>("songs");
    let local = (localData ?? DEFAULT_SONGS).map((s) => ({
      ...s,
      id: ensureUUID(s.id),
    }));
    if (isFirstLoad) {
      setLocal("songs", local);
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from("songs")
          .select("*")
          .order("created_at", { ascending: true });
        if (error) {
          console.error("Supabase getSongs error:", error);
        } else if (data) {
          if (data.length === 0 && local.length > 0) {
            const payloads = local.map(cleanPayload);
            await supabase.from("songs").insert(payloads);
          }
          if (isFirstLoad && data.length > 0) {
            setLocal("songs", data);
            return data;
          }
          const merged = mergeLocalAndRemote(local, data);
          setLocal("songs", merged);
          return merged;
        }
      } catch (err) {
        console.warn("Supabase getSongs failed, using local:", err);
      }
    }
    return local;
  },

  async addSong(song: Omit<Song, "id">): Promise<Song> {
    const newSong: Song = {
      ...song,
      id: generateUUID(),
      created_at: new Date().toISOString(),
    };
    const current = getLocal<Song[]>("songs", DEFAULT_SONGS).map((s) => ({
      ...s,
      id: ensureUUID(s.id),
    }));
    const updated = [...current, newSong];
    setLocal("songs", updated);

    if (isSupabaseConfigured && supabase) {
      try {
        const payload = cleanPayload(newSong);
        const { data, error } = await supabase
          .from("songs")
          .insert([payload])
          .select()
          .single();
        if (error) {
          console.error("Supabase addSong error:", error);
        } else if (data) {
          return data as Song;
        }
      } catch (err) {
        console.warn("Supabase addSong failed:", err);
      }
    }
    return newSong;
  },

  async updateSong(song: Song): Promise<Song> {
    const cleanSong = { ...song, id: ensureUUID(song.id) };
    const current = getLocal<Song[]>("songs", DEFAULT_SONGS).map((s) => ({
      ...s,
      id: ensureUUID(s.id),
    }));
    const updated = current.map((s) => (s.id === cleanSong.id ? cleanSong : s));
    setLocal("songs", updated);

    if (isSupabaseConfigured && supabase) {
      try {
        const payload = cleanPayload(cleanSong);
        const { data, error } = await supabase
          .from("songs")
          .upsert([payload])
          .select()
          .single();
        if (error) {
          console.error("Supabase updateSong error:", error);
        } else if (data) {
          return data as Song;
        }
      } catch (err) {
        console.warn("Supabase updateSong failed:", err);
      }
    }
    return cleanSong;
  },

  async deleteSong(id: string): Promise<void> {
    const current = getLocal<Song[]>("songs", DEFAULT_SONGS);
    const updated = current.filter((s) => s.id !== id);
    setLocal("songs", updated);

    if (isSupabaseConfigured && supabase && isValidUUID(id)) {
      try {
        const { error } = await supabase.from("songs").delete().eq("id", id);
        if (error) console.error("Supabase deleteSong error:", error);
      } catch (err) {
        console.warn("Supabase deleteSong failed:", err);
      }
    }
  },

  // FAVORITES
  async getFavorites(): Promise<FavoriteItem[]> {
    const { data: localData, isFirstLoad } =
      getLocalRaw<FavoriteItem[]>("favorites");
    let local = (localData ?? DEFAULT_FAVORITES).map((f) => ({
      ...f,
      id: ensureUUID(f.id),
    }));
    if (isFirstLoad) {
      setLocal("favorites", local);
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from("favorites").select("*");
        if (error) {
          console.error("Supabase getFavorites error:", error);
        } else if (data) {
          if (data.length === 0 && local.length > 0) {
            const payloads = local.map(cleanPayload);
            await supabase.from("favorites").insert(payloads);
          }
          if (isFirstLoad && data.length > 0) {
            setLocal("favorites", data);
            return data;
          }
          const merged = mergeLocalAndRemote(local, data);
          setLocal("favorites", merged);
          return merged;
        }
      } catch (err) {
        console.warn("Supabase getFavorites failed, using local:", err);
      }
    }
    return local;
  },

  async addFavorite(item: Omit<FavoriteItem, "id">): Promise<FavoriteItem> {
    const newItem: FavoriteItem = {
      ...item,
      id: generateUUID(),
      created_at: new Date().toISOString(),
    };
    const current = getLocal<FavoriteItem[]>(
      "favorites",
      DEFAULT_FAVORITES,
    ).map((f) => ({ ...f, id: ensureUUID(f.id) }));
    const updated = [newItem, ...current];
    setLocal("favorites", updated);

    if (isSupabaseConfigured && supabase) {
      try {
        const payload = cleanPayload(newItem);
        const { data, error } = await supabase
          .from("favorites")
          .insert([payload])
          .select()
          .single();
        if (error) {
          console.error("Supabase addFavorite error:", error);
        } else if (data) {
          return data as FavoriteItem;
        }
      } catch (err) {
        console.warn("Supabase addFavorite failed:", err);
      }
    }
    return newItem;
  },

  async updateFavorite(item: FavoriteItem): Promise<FavoriteItem> {
    const cleanItem = { ...item, id: ensureUUID(item.id) };
    const current = getLocal<FavoriteItem[]>(
      "favorites",
      DEFAULT_FAVORITES,
    ).map((f) => ({ ...f, id: ensureUUID(f.id) }));
    const updated = current.map((f) => (f.id === cleanItem.id ? cleanItem : f));
    setLocal("favorites", updated);

    if (isSupabaseConfigured && supabase) {
      try {
        const payload = cleanPayload(cleanItem);
        const { data, error } = await supabase
          .from("favorites")
          .upsert([payload])
          .select()
          .single();
        if (error) {
          console.error("Supabase updateFavorite error:", error);
        } else if (data) {
          return data as FavoriteItem;
        }
      } catch (err) {
        console.warn("Supabase updateFavorite failed:", err);
      }
    }
    return cleanItem;
  },

  async deleteFavorite(id: string): Promise<void> {
    const current = getLocal<FavoriteItem[]>("favorites", DEFAULT_FAVORITES);
    const updated = current.filter((f) => f.id !== id);
    setLocal("favorites", updated);

    if (isSupabaseConfigured && supabase && isValidUUID(id)) {
      try {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("id", id);
        if (error) console.error("Supabase deleteFavorite error:", error);
      } catch (err) {
        console.warn("Supabase deleteFavorite failed:", err);
      }
    }
  },

  // MILESTONES
  async getMilestones(): Promise<Milestone[]> {
    const { data: localData, isFirstLoad } =
      getLocalRaw<Milestone[]>("milestones");
    let local = (localData ?? DEFAULT_MILESTONES).map((m) => ({
      ...m,
      id: ensureUUID(m.id),
    }));
    if (isFirstLoad) {
      setLocal("milestones", local);
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from("milestones").select("*");
        if (error) {
          console.error("Supabase getMilestones error:", error);
        } else if (data) {
          const formatted = data.map((m) => ({
            id: m.id,
            label: m.label,
            description: m.description,
            targetDays: m.target_days ?? m.targetDays ?? 100,
          }));
          if (data.length === 0 && local.length > 0) {
            const payloads = local.map((ms) => {
              const p = cleanPayload(ms);
              p.target_days = ms.targetDays;
              delete p.targetDays;
              return p;
            });
            await supabase.from("milestones").insert(payloads);
          }
          if (isFirstLoad && formatted.length > 0) {
            setLocal("milestones", formatted);
            return formatted;
          }
          const merged = mergeLocalAndRemote(local, formatted);
          setLocal("milestones", merged);
          return merged;
        }
      } catch (err) {
        console.warn("Supabase getMilestones failed, using local:", err);
      }
    }
    return local;
  },

  async addMilestone(ms: Omit<Milestone, "id">): Promise<Milestone> {
    const newMs: Milestone = {
      ...ms,
      id: generateUUID(),
    };
    const current = getLocal<Milestone[]>("milestones", DEFAULT_MILESTONES).map(
      (m) => ({ ...m, id: ensureUUID(m.id) }),
    );
    const updated = [...current, newMs].sort(
      (a, b) => a.targetDays - b.targetDays,
    );
    setLocal("milestones", updated);

    if (isSupabaseConfigured && supabase) {
      try {
        const payload = cleanPayload(newMs);
        payload.target_days = newMs.targetDays;
        delete payload.targetDays;
        const { data, error } = await supabase
          .from("milestones")
          .insert([payload])
          .select()
          .single();
        if (error) {
          console.error("Supabase addMilestone error:", error);
        } else if (data) {
          return {
            id: data.id,
            label: data.label,
            description: data.description,
            targetDays: data.target_days ?? data.targetDays ?? newMs.targetDays,
          };
        }
      } catch (err) {
        console.warn("Supabase addMilestone failed:", err);
      }
    }
    return newMs;
  },

  async updateMilestone(ms: Milestone): Promise<Milestone> {
    const cleanMs = { ...ms, id: ensureUUID(ms.id) };
    const current = getLocal<Milestone[]>("milestones", DEFAULT_MILESTONES).map(
      (m) => ({ ...m, id: ensureUUID(m.id) }),
    );
    const updated = current
      .map((m) => (m.id === cleanMs.id ? cleanMs : m))
      .sort((a, b) => a.targetDays - b.targetDays);
    setLocal("milestones", updated);

    if (isSupabaseConfigured && supabase) {
      try {
        const payload = cleanPayload(cleanMs);
        payload.target_days = cleanMs.targetDays;
        delete payload.targetDays;
        const { data, error } = await supabase
          .from("milestones")
          .upsert([payload])
          .select()
          .single();
        if (error) {
          console.error("Supabase updateMilestone error:", error);
        } else if (data) {
          return {
            id: data.id,
            label: data.label,
            description: data.description,
            targetDays:
              data.target_days ?? data.targetDays ?? cleanMs.targetDays,
          };
        }
      } catch (err) {
        console.warn("Supabase updateMilestone failed:", err);
      }
    }
    return cleanMs;
  },

  async deleteMilestone(id: string): Promise<void> {
    const current = getLocal<Milestone[]>("milestones", DEFAULT_MILESTONES);
    const updated = current.filter((m) => m.id !== id);
    setLocal("milestones", updated);

    if (isSupabaseConfigured && supabase && isValidUUID(id)) {
      try {
        const { error } = await supabase
          .from("milestones")
          .delete()
          .eq("id", id);
        if (error) console.error("Supabase deleteMilestone error:", error);
      } catch (err) {
        console.warn("Supabase deleteMilestone failed:", err);
      }
    }
  },

  // FILE UPLOADER (SUPABASE STORAGE + BASE64 DATA URL FALLBACK FOR LOCAL PERSISTENCE)
  async uploadFile(
    file: File,
    bucket: "photos" | "videos" | "music" | "notes-attachments" = "photos",
    onProgress?: (pct: number) => void,
  ): Promise<string> {
    if (isSupabaseConfigured && supabase) {
      try {
        if (onProgress) onProgress(20);
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

        if (onProgress) onProgress(50);
        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(fileName, file, {
            cacheControl: "3600",
            upsert: true,
          });

        if (error) {
          console.error(
            `Supabase Storage upload error for bucket ${bucket}:`,
            error,
          );
          throw error;
        }

        if (onProgress) onProgress(90);
        const { data: publicData } = supabase.storage
          .from(bucket)
          .getPublicUrl(data.path);
        if (onProgress) onProgress(100);
        return publicData.publicUrl;
      } catch (err) {
        console.warn(
          "Falling back to local Data URL due to Supabase upload issue:",
          err,
        );
      }
    }

    // Fallback: convert file to base64 Data URL so it persists in localStorage across reloads
    return new Promise((resolve) => {
      if (onProgress) onProgress(30);
      const reader = new FileReader();
      reader.onload = () => {
        if (onProgress) onProgress(100);
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        if (onProgress) onProgress(100);
        resolve(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
    });
  },
};
