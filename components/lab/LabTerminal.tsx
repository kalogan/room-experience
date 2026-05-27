"use client";

import { useEffect, useRef, useState } from "react";

// ─── Output types ─────────────────────────────────────────────────────────────

type LineType = "input" | "output" | "error" | "system";
type OutputLine = { type: LineType; text: string };

// ─── Boot sequence ────────────────────────────────────────────────────────────

const BOOT: OutputLine[] = [
  { type: "system", text: "room-experience terminal v1.0" },
  { type: "system", text: "Kevin Logan / Staff Product Designer" },
  { type: "system", text: "────────────────────────────────────" },
  { type: "system", text: "Type 'help' for available commands." },
];

// ─── Virtual filesystem ───────────────────────────────────────────────────────

const FS: Record<string, string> = {
  "README.md": [
    "Staff Product Designer — 10+ years across platform",
    "systems, developer tools, and AI interaction design.",
    "",
    "Currently: Roblox",
    "Previously: Indiana University, SCAD, Crate & Barrel",
  ].join("\n"),

  "work/": [
    "localization-platform/",
    "replay-system/",
    "tts-captioning/",
    "feedback-mode/",
    "npc-bots/",
    "platform-infra/  [NDA]",
    "crate-barrel-configurator/",
  ].join("\n"),

  ".config": [
    "role      Staff Product Designer",
    "company   Roblox",
    "focus     Platform · Tools · AI Interaction",
    "github    github.com/kalogan",
  ].join("\n"),
};

// ─── Command runner ───────────────────────────────────────────────────────────

function exec(raw: string): { lines: OutputLine[]; clear?: boolean } {
  const [cmd, ...args] = raw.trim().split(/\s+/);

  switch (cmd) {
    case "":
      return { lines: [] };

    case "help":
      return {
        lines: [
          { type: "output", text: "Commands:" },
          { type: "output", text: "  help              show this message" },
          { type: "output", text: "  whoami            who is this person" },
          { type: "output", text: "  ls                list directory" },
          { type: "output", text: "  cat <file>        print a file" },
          { type: "output", text: "  clear             clear the terminal" },
        ],
      };

    case "whoami":
      return {
        lines: [{ type: "output", text: "Kevin Logan — Staff Product Designer" }],
      };

    case "ls":
      return {
        lines: [
          { type: "output", text: "work/        notebooks/   experiments/" },
          { type: "output", text: ".config      README.md" },
        ],
      };

    case "cat": {
      const target = args[0] ?? "";
      const file = FS[target];
      if (!file) {
        return {
          lines: [{ type: "error", text: `cat: ${target || "(no file)"}: no such file` }],
        };
      }
      return {
        lines: file.split("\n").map((t) => ({ type: "output" as const, text: t })),
      };
    }

    case "clear":
      return { lines: [], clear: true };

    default:
      return {
        lines: [
          { type: "error", text: `command not found: ${cmd}` },
          { type: "system", text: "Type 'help' to see available commands." },
        ],
      };
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export function LabTerminal() {
  const [lines, setLines] = useState<OutputLine[]>(BOOT);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  // Auto-scroll on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  // Focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    const echo: OutputLine = { type: "input", text: `$ ${trimmed}` };
    const { lines: result, clear } = exec(trimmed);

    if (trimmed) {
      setHistory((h) => [trimmed, ...h]);
    }
    setHistIdx(-1);
    setInput("");

    if (clear) {
      setLines([]);
    } else {
      setLines((prev) => [...prev, echo, ...result]);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent LabClient's window-level arrow/enter handler from firing
    e.stopPropagation();

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : (history[next] ?? ""));
    }
  };

  return (
    <div className="mt-5 w-full overflow-hidden rounded-lg border border-border/50 bg-[#040810]">
      {/* macOS-style window chrome */}
      <div className="flex items-center gap-1.5 border-b border-border/30 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[10px] text-fg-muted opacity-40">
          lab — bash
        </span>
      </div>

      {/* Output */}
      <div
        className="h-44 cursor-text overflow-y-auto px-3 py-2 font-mono text-[11px] leading-relaxed"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={
              line.type === "input"
                ? "text-accent"
                : line.type === "error"
                  ? "text-error"
                  : line.type === "system"
                    ? "text-fg-muted opacity-50"
                    : "text-fg opacity-80"
            }
          >
            {line.text || " "}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={submit}
        className="flex items-center gap-2 border-t border-border/30 px-3 py-2"
      >
        <span className="select-none font-mono text-[11px] text-accent">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1 bg-transparent font-mono text-[11px] text-fg outline-none placeholder:text-fg-muted placeholder:opacity-30"
          placeholder="type a command…"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
}
