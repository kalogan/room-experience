import { LabActionButton } from "./LabActionButton";

export type LabMenuAction = {
  id: string;
  label: string;
  variant?: "exit" | "back";
};

interface LabCommandMenuProps {
  prompt: string;
  actions: LabMenuAction[];
  focusedIndex: number;
  onAction: (id: string) => void;
  onHover: (index: number) => void;
}

export function LabCommandMenu({
  prompt,
  actions,
  focusedIndex,
  onAction,
  onHover,
}: LabCommandMenuProps) {
  return (
    <div className="w-full">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-fg-muted opacity-40">
        {prompt}
      </p>

      <ul
        role="menu"
        aria-label="Available actions"
        className="overflow-hidden rounded-lg border border-border bg-surface"
      >
        {actions.map((action, index) => (
          <li
            key={action.id}
            role="none"
            className="border-b border-border last:border-b-0"
          >
            <LabActionButton
              label={action.label}
              isFocused={focusedIndex === index}
              variant={action.variant}
              onClick={() => onAction(action.id)}
              onMouseEnter={() => onHover(index)}
            />
          </li>
        ))}
      </ul>

      <p className="mt-3 text-right font-mono text-[10px] text-fg-muted opacity-20">
        ↑↓ navigate &nbsp;·&nbsp; Enter select
      </p>
    </div>
  );
}
