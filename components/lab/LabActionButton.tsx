interface LabActionButtonProps {
  label: string;
  isFocused: boolean;
  variant?: "default" | "exit" | "back";
  onClick: () => void;
  onMouseEnter: () => void;
}

export function LabActionButton({
  label,
  isFocused,
  variant = "default",
  onClick,
  onMouseEnter,
}: LabActionButtonProps) {
  const isDim = variant === "exit" || variant === "back";

  return (
    <button
      role="menuitem"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${
        isFocused
          ? "bg-elevated text-fg"
          : isDim
          ? "text-fg-muted opacity-40 hover:opacity-70 hover:bg-elevated"
          : "text-fg-muted hover:bg-elevated hover:text-fg"
      }`}
      aria-current={isFocused ? true : undefined}
    >
      {/* Selection indicator — visible only when focused */}
      <span
        className={`w-3 shrink-0 text-primary transition-opacity duration-150 ${
          isFocused ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        ›
      </span>
      {label}
    </button>
  );
}
