import { create } from "zustand";

// ─── Location ─────────────────────────────────────────────────────────────────

export type LabLocation =
  | "desk-seated"
  | "room-standing"
  | "laptop"
  | "notebook"
  | "bed"
  | "tv"
  | "calendar"
  | "shelf";

// ─── Panel types ──────────────────────────────────────────────────────────────

export type DeskPanel = "home" | "work" | "terminal" | "simulator";

export type NotebookPanel =
  | "overview"
  | "replay"
  | "localization"
  | "tts-captioning"
  | "npc-bots"
  | "feedback-mode";

export type BedPanel =
  | "overview"
  | "air-hockey"
  | "npc-simulation"
  | "godot"
  | "webgl";

export type TVPanel =
  | "overview"
  | "rdc"
  | "scad"
  | "iu"
  | "talks"
  | "mentorship";

export type CalendarPanel =
  | "overview"
  | "work"
  | "community"
  | "talks"
  | "experiments";

export type ShelfPanel =
  | "overview"
  | "books"
  | "records"
  | "tools"
  | "inspirations";

// ─── State shape ──────────────────────────────────────────────────────────────

interface LabState {
  location: LabLocation;
  deskPanel: DeskPanel;
  notebookPanel: NotebookPanel;
  bedPanel: BedPanel;
  tvPanel: TVPanel;
  calendarPanel: CalendarPanel;
  shelfPanel: ShelfPanel;
  soundEnabled: boolean;
  is3DEnabled: boolean;
  visitedLocations: LabLocation[];
}

// ─── Actions ──────────────────────────────────────────────────────────────────

interface LabActions {
  setLocation: (location: LabLocation) => void;
  setDeskPanel: (panel: DeskPanel) => void;
  setNotebookPanel: (panel: NotebookPanel) => void;
  setBedPanel: (panel: BedPanel) => void;
  setTVPanel: (panel: TVPanel) => void;
  setCalendarPanel: (panel: CalendarPanel) => void;
  setShelfPanel: (panel: ShelfPanel) => void;
  toggleSound: () => void;
  toggle3D: () => void;
  resetLab: () => void;
}

// ─── Initial state ────────────────────────────────────────────────────────────

const initialState: LabState = {
  location: "desk-seated",
  deskPanel: "home",
  notebookPanel: "overview",
  bedPanel: "overview",
  tvPanel: "overview",
  calendarPanel: "overview",
  shelfPanel: "overview",
  soundEnabled: false,
  is3DEnabled: true,
  visitedLocations: [],
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useLabStore = create<LabState & LabActions>((set) => ({
  ...initialState,

  setLocation: (location) =>
    set((state) => ({
      location,
      visitedLocations: state.visitedLocations.includes(location)
        ? state.visitedLocations
        : [...state.visitedLocations, location],
    })),

  setDeskPanel: (deskPanel) => set({ deskPanel }),
  setNotebookPanel: (notebookPanel) => set({ notebookPanel }),
  setBedPanel: (bedPanel) => set({ bedPanel }),
  setTVPanel: (tvPanel) => set({ tvPanel }),
  setCalendarPanel: (calendarPanel) => set({ calendarPanel }),
  setShelfPanel: (shelfPanel) => set({ shelfPanel }),

  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  toggle3D: () => set((state) => ({ is3DEnabled: !state.is3DEnabled })),

  resetLab: () => set(initialState),
}));
