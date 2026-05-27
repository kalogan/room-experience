"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLabStore, type LabLocation } from "@/store/labStore";

// ─── Scene data ───────────────────────────────────────────────────────────────
// Will be extracted to content/lab/stations.ts in Phase 25.

type Action = {
  id: string;
  label: string;
  variant?: "exit" | "back";
};

type SceneConfig = {
  breadcrumb: string;
  title: string;
  copy: string;
  prompt: string;
  actions: Action[];
  panelNote?: string;
};

const scenes: Record<LabLocation, SceneConfig> = {
  "desk-seated": {
    breadcrumb: "Lab / Desk",
    title: "It's late.",
    copy: "The monitor is still on.",
    prompt: "What do you want to do?",
    actions: [
      { id: "use-laptop",    label: "Use Laptop" },
      { id: "open-notebook", label: "Open Notebook" },
      { id: "stand-up",      label: "Stand Up" },
      { id: "exit-lab",      label: "Exit Lab", variant: "exit" },
    ],
  },
  "room-standing": {
    breadcrumb: "Lab / Room",
    title: "You stand up.",
    copy: "The room opens around you.",
    prompt: "Where do you want to go?",
    actions: [
      { id: "return-desk",    label: "Return to Desk" },
      { id: "go-bed",         label: "Go to Bed" },
      { id: "watch-tv",       label: "Watch TV" },
      { id: "check-calendar", label: "Check Calendar" },
      { id: "browse-shelf",   label: "Browse Shelf" },
    ],
  },
  laptop: {
    breadcrumb: "Lab / Desk / Laptop",
    title: "Work files. Systems.",
    copy: "Platform design, case studies, developer tools.",
    prompt: "What would you like to open?",
    panelNote: "Full case studies building in Phase 12.",
    actions: [
      { id: "desk-work",      label: "View Work" },
      { id: "desk-terminal",  label: "Open Terminal" },
      { id: "desk-simulator", label: "Run Simulator" },
      { id: "return-desk",    label: "Return to Desk", variant: "back" },
    ],
  },
  notebook: {
    breadcrumb: "Lab / Desk / Notebook",
    title: "Design notebook.",
    copy: "Process, prototypes, branching decisions.",
    prompt: "What would you like to explore?",
    panelNote: "Process cards and concept explorer building in Phase 14–16.",
    actions: [
      { id: "notebook-replay",       label: "Replay System" },
      { id: "notebook-localization", label: "Localization" },
      { id: "notebook-tts",          label: "TTS / Captioning" },
      { id: "notebook-npc",          label: "NPC Bots" },
      { id: "return-desk",           label: "Return to Desk", variant: "back" },
    ],
  },
  bed: {
    breadcrumb: "Lab / Room / Bed",
    title: "The nightstand.",
    copy: "A handheld sits there. Game experiments. Playable systems.",
    prompt: "Pick something up?",
    panelNote: "Playable experiment cards building in Phase 17.",
    actions: [
      { id: "bed-experiments", label: "View Experiments" },
      { id: "return-room",     label: "Return to Room", variant: "back" },
    ],
  },
  tv: {
    breadcrumb: "Lab / Room / TV",
    title: "The couch. The TV.",
    copy: "Community, talks, workshops, partnerships.",
    prompt: "Settle in?",
    panelNote: "Community memory cards building in Phase 19.",
    actions: [
      { id: "tv-community", label: "Browse Community" },
      { id: "return-room",  label: "Return to Room", variant: "back" },
    ],
  },
  calendar: {
    breadcrumb: "Lab / Room / Calendar",
    title: "The wall calendar.",
    copy: "Work eras, milestones, conferences, partnerships.",
    prompt: "Take a look?",
    panelNote: "Career timeline building in Phase 20.",
    actions: [
      { id: "calendar-timeline", label: "View Timeline" },
      { id: "return-room",       label: "Return to Room", variant: "back" },
    ],
  },
  shelf: {
    breadcrumb: "Lab / Room / Shelf",
    title: "Bookshelves and a record player.",
    copy: "Books, music, games, creative inputs.",
    prompt: "What interests you?",
    panelNote: "Shelf and record player building in Phase 21–22.",
    actions: [
      { id: "shelf-books",   label: "Browse Books" },
      { id: "shelf-records", label: "Browse Records" },
      { id: "return-room",   label: "Return to Room", variant: "back" },
    ],
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function LabClient() {
  const router = useRouter();
  const {
    location,
    setLocation,
    setDeskPanel,
    setNotebookPanel,
    setBedPanel,
    setTVPanel,
    setCalendarPanel,
    setShelfPanel,
  } = useLabStore();

  const [focusedIndex, setFocusedIndex] = useState(0);
  // Ref lets the keydown handler always read the current index
  // without being re-registered on every keystroke.
  const focusedRef = useRef(0);

  const scene = scenes[location];

  // Keep ref in sync with state.
  useEffect(() => {
    focusedRef.current = focusedIndex;
  }, [focusedIndex]);

  const handleAction = useCallback(
    (actionId: string) => {
      // Navigate to a new location and reset focus in one step,
      // avoiding the need for a setState-in-effect pattern.
      const go = (loc: LabLocation) => {
        setLocation(loc);
        setFocusedIndex(0);
        focusedRef.current = 0;
      };

      const map: Record<string, () => void> = {
        // location navigation
        "use-laptop":         () => go("laptop"),
        "open-notebook":      () => go("notebook"),
        "stand-up":           () => go("room-standing"),
        "exit-lab":           () => router.push("/"),
        "return-desk":        () => go("desk-seated"),
        "return-room":        () => go("room-standing"),
        "go-bed":             () => go("bed"),
        "watch-tv":           () => go("tv"),
        "check-calendar":     () => go("calendar"),
        "browse-shelf":       () => go("shelf"),
        // desk sub-panels — exercises store; content in Phase 12–13
        "desk-work":          () => setDeskPanel("work"),
        "desk-terminal":      () => setDeskPanel("terminal"),
        "desk-simulator":     () => setDeskPanel("simulator"),
        // notebook sub-panels — content in Phase 14–16
        "notebook-replay":       () => setNotebookPanel("replay"),
        "notebook-localization": () => setNotebookPanel("localization"),
        "notebook-tts":          () => setNotebookPanel("tts-captioning"),
        "notebook-npc":          () => setNotebookPanel("npc-bots"),
        // station placeholders — content in Phase 17–21
        "bed-experiments":    () => setBedPanel("overview"),
        "tv-community":       () => setTVPanel("overview"),
        "calendar-timeline":  () => setCalendarPanel("overview"),
        "shelf-books":        () => setShelfPanel("books"),
        "shelf-records":      () => setShelfPanel("records"),
      };
      map[actionId]?.();
    },
    [
      router,
      setLocation,
      setDeskPanel,
      setNotebookPanel,
      setBedPanel,
      setTVPanel,
      setCalendarPanel,
      setShelfPanel,
    ]
  );

  // Keyboard navigation — registered once per location change.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const actions = scenes[location].actions;
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const next = Math.max(0, focusedRef.current - 1);
        focusedRef.current = next;
        setFocusedIndex(next);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = Math.min(actions.length - 1, focusedRef.current + 1);
        focusedRef.current = next;
        setFocusedIndex(next);
      } else if (e.key === "Enter") {
        handleAction(actions[focusedRef.current].id);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [location, handleAction]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
      {/* Breadcrumb */}
      <p className="mb-10 w-full max-w-xs font-mono text-[10px] uppercase tracking-widest text-fg-muted opacity-40">
        {scene.breadcrumb}
      </p>

      {/* Scene copy — key causes re-mount so the CSS animation replays */}
      <div
        key={location}
        className="animate-fade-in-up mb-10 w-full max-w-xs"
      >
        <h1 className="mb-2 text-3xl font-bold leading-snug tracking-tight text-fg">
          {scene.title}
        </h1>
        <p className="text-base leading-relaxed text-fg-muted">{scene.copy}</p>
      </div>

      {/* Command menu */}
      <div
        key={`${location}-menu`}
        className="animate-fade-in-up w-full max-w-xs"
        style={{ animationDelay: "60ms" }}
      >
        <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-fg-muted opacity-40">
          {scene.prompt}
        </p>

        <ul
          role="menu"
          aria-label="Available actions"
          className="overflow-hidden rounded-lg border border-border bg-surface"
        >
          {scene.actions.map((action, index) => {
            const isFocused = focusedIndex === index;
            const isDim = action.variant === "exit" || action.variant === "back";

            return (
              <li
                key={action.id}
                role="none"
                className="border-b border-border last:border-b-0"
              >
                <button
                  role="menuitem"
                  onClick={() => handleAction(action.id)}
                  onMouseEnter={() => setFocusedIndex(index)}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${
                    isFocused
                      ? "bg-elevated text-fg"
                      : isDim
                      ? "text-fg-muted opacity-40 hover:opacity-70 hover:bg-elevated"
                      : "text-fg-muted hover:bg-elevated hover:text-fg"
                  }`}
                  aria-current={isFocused ? true : undefined}
                >
                  <span
                    className={`w-3 shrink-0 text-primary transition-opacity ${
                      isFocused ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden="true"
                  >
                    ›
                  </span>
                  {action.label}
                </button>
              </li>
            );
          })}
        </ul>

        <p className="mt-3 text-right font-mono text-[10px] text-fg-muted opacity-20">
          ↑↓ navigate &nbsp;·&nbsp; Enter select
        </p>

        {scene.panelNote && (
          <p className="mt-6 text-center font-mono text-[10px] text-fg-muted opacity-25">
            {scene.panelNote}
          </p>
        )}
      </div>
    </div>
  );
}
