"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLabStore, type LabLocation } from "@/store/labStore";
import { LabShell } from "./LabShell";
import { LabBreadcrumb } from "./LabBreadcrumb";
import { LabCommandMenu, type LabMenuAction } from "./LabCommandMenu";
import { LabDeskPanel } from "./LabDeskPanel";
import { LabNotebookPanel } from "./LabNotebookPanel";
import { LabPanel } from "./LabPanel";
import { LabScene3DLazy } from "./LabScene3DLazy";

// ─── Scene data ───────────────────────────────────────────────────────────────
// Extracted to content/lab/stations.ts in Phase 25.

type PanelPlaceholder = {
  title: string;
  description: string;
  note: string;
};

type SceneConfig = {
  breadcrumb: string;
  title: string;
  copy: string;
  prompt: string;
  actions: LabMenuAction[];
  panel?: PanelPlaceholder;
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
    actions: [
      { id: "notebook-replay",       label: "Replay System" },
      { id: "notebook-localization", label: "Localization" },
      { id: "notebook-tts",          label: "TTS / Captioning" },
      { id: "notebook-npc",          label: "NPC Bots" },
      { id: "notebook-feedback",     label: "Feedback Mode" },
      { id: "return-desk",           label: "Return to Desk", variant: "back" },
    ],
  },
  bed: {
    breadcrumb: "Lab / Room / Bed",
    title: "The nightstand.",
    copy: "A handheld sits there. Game experiments. Playable systems.",
    prompt: "Pick something up?",
    panel: {
      title: "Experiments",
      description: "Playable prototypes and system experiments.",
      note: "Experiment cards building in Phase 17.",
    },
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
    panel: {
      title: "Community",
      description: "RDC, SCAD, IU, talks, workshops, mentorship.",
      note: "Community memory cards building in Phase 19.",
    },
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
    panel: {
      title: "Career Timeline",
      description: "Milestones, talks, partnerships, and work eras.",
      note: "Timeline building in Phase 20.",
    },
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
    panel: {
      title: "Shelf & Records",
      description: "Books, music, tools, and creative influences.",
      note: "Shelf and record player building in Phase 21–22.",
    },
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
    is3DEnabled,
    toggle3D,
  } = useLabStore();

  const [focusedIndex, setFocusedIndex] = useState(0);
  const focusedRef = useRef(0);
  const scene = scenes[location];

  useEffect(() => {
    focusedRef.current = focusedIndex;
  }, [focusedIndex]);

  const handleAction = useCallback(
    (actionId: string) => {
      const go = (loc: LabLocation) => {
        setLocation(loc);
        setFocusedIndex(0);
        focusedRef.current = 0;
      };

      const map: Record<string, () => void> = {
        "use-laptop":            () => go("laptop"),
        "open-notebook":         () => go("notebook"),
        "stand-up":              () => go("room-standing"),
        "exit-lab":              () => router.push("/"),
        "return-desk":           () => go("desk-seated"),
        "return-room":           () => go("room-standing"),
        "go-bed":                () => go("bed"),
        "watch-tv":              () => go("tv"),
        "check-calendar":        () => go("calendar"),
        "browse-shelf":          () => go("shelf"),
        "desk-work":             () => setDeskPanel("work"),
        "desk-terminal":         () => setDeskPanel("terminal"),
        "desk-simulator":        () => setDeskPanel("simulator"),
        "notebook-replay":       () => setNotebookPanel("replay"),
        "notebook-localization": () => setNotebookPanel("localization"),
        "notebook-tts":          () => setNotebookPanel("tts-captioning"),
        "notebook-npc":          () => setNotebookPanel("npc-bots"),
        "notebook-feedback":     () => setNotebookPanel("feedback-mode"),
        "bed-experiments":       () => setBedPanel("overview"),
        "tv-community":          () => setTVPanel("overview"),
        "calendar-timeline":     () => setCalendarPanel("overview"),
        "shelf-books":           () => setShelfPanel("books"),
        "shelf-records":         () => setShelfPanel("records"),
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
    <LabShell
      scene3D={is3DEnabled ? <LabScene3DLazy /> : undefined}
      controls={
        <button
          onClick={toggle3D}
          aria-label={is3DEnabled ? "Switch to 2D mode" : "Switch to 3D mode"}
          className="font-mono text-[10px] text-fg-muted opacity-30 transition-opacity hover:opacity-70"
        >
          {is3DEnabled ? "2D" : "3D"}
        </button>
      }
    >
      <LabBreadcrumb path={scene.breadcrumb} />

      {/* Scene copy — key forces re-mount so CSS animation replays on transition */}
      <div key={location} className="animate-fade-in-up mb-10 w-full max-w-xs">
        <h1 className="mb-2 text-3xl font-bold leading-snug tracking-tight text-fg">
          {scene.title}
        </h1>
        <p className="text-base leading-relaxed text-fg-muted">{scene.copy}</p>
      </div>

      {/* Command menu + station panel */}
      <div
        key={`${location}-menu`}
        className="animate-fade-in-up pointer-events-auto w-full max-w-xs"
        style={{ animationDelay: "60ms" }}
      >
        <LabCommandMenu
          prompt={scene.prompt}
          actions={scene.actions}
          focusedIndex={focusedIndex}
          onAction={handleAction}
          onHover={setFocusedIndex}
        />

        {location === "laptop" ? (
          <LabDeskPanel />
        ) : location === "notebook" ? (
          <LabNotebookPanel />
        ) : (
          scene.panel && (
            <LabPanel
              title={scene.panel.title}
              description={scene.panel.description}
              note={scene.panel.note}
            />
          )
        )}
      </div>
    </LabShell>
  );
}
