import { reading } from "@/lib/design/tokens";

export type ReaderState = {
  visited: string[];
  bookmarks: string[];
  /** Per-slug scroll ratio 0–1 */
  positions: Record<string, number>;
  lastSlug?: string;
  updatedAt: number;
};

const EMPTY: ReaderState = {
  visited: [],
  bookmarks: [],
  positions: {},
  updatedAt: 0,
};

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function loadReaderState(): ReaderState {
  if (!canUseStorage()) return EMPTY;
  try {
    const raw = localStorage.getItem(reading.storageKey);
    if (!raw) {
      // migrate prior visit-only keys
      const legacy =
        localStorage.getItem("zz-lookback-progress-v2") ??
        localStorage.getItem("zz-lookback-progress-v1");
      if (legacy) {
        const visited = JSON.parse(legacy) as string[];
        if (Array.isArray(visited)) {
          return {
            visited,
            bookmarks: [],
            positions: {},
            updatedAt: Date.now(),
          };
        }
      }
      return EMPTY;
    }
    const parsed = JSON.parse(raw) as Partial<ReaderState>;
    return {
      visited: Array.isArray(parsed.visited) ? parsed.visited : [],
      bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks : [],
      positions:
        parsed.positions && typeof parsed.positions === "object"
          ? parsed.positions
          : {},
      lastSlug: typeof parsed.lastSlug === "string" ? parsed.lastSlug : undefined,
      updatedAt: typeof parsed.updatedAt === "number" ? parsed.updatedAt : 0,
    };
  } catch {
    return EMPTY;
  }
}

export function saveReaderState(state: ReaderState): void {
  if (!canUseStorage()) return;
  try {
    localStorage.setItem(
      reading.storageKey,
      JSON.stringify({ ...state, updatedAt: Date.now() }),
    );
  } catch {
    /* quota / private mode */
  }
}

export function markVisited(slug: string): ReaderState {
  const state = loadReaderState();
  if (!state.visited.includes(slug)) {
    state.visited = [...state.visited, slug];
  }
  state.lastSlug = slug;
  saveReaderState(state);
  return state;
}

export function toggleBookmark(slug: string): ReaderState {
  const state = loadReaderState();
  state.bookmarks = state.bookmarks.includes(slug)
    ? state.bookmarks.filter((s) => s !== slug)
    : [...state.bookmarks, slug];
  saveReaderState(state);
  return state;
}

export function saveScrollPosition(slug: string, ratio: number): void {
  const state = loadReaderState();
  const clamped = Math.max(0, Math.min(1, ratio));
  state.positions = { ...state.positions, [slug]: clamped };
  state.lastSlug = slug;
  saveReaderState(state);
}
