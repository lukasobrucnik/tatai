import type { ReactNode } from "react";

export function Field({
  label,
  hint,
  required,
  children,
  htmlFor,
}: {
  label?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <div className="grid gap-2">
      {label && (
        <label htmlFor={htmlFor} className="font-mono text-eyebrow tracking-eyebrow uppercase text-muted">
          {label}
          {required && <span className="text-signal-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {hint && <span className="text-caption text-faint">{hint}</span>}
    </div>
  );
}

// placeholder:text-muted (not the browser default, which varies and often fails 4.5:1)
export const inputSkin =
  "w-full font-body text-body-lg text-strong placeholder:text-muted bg-transparent border-0 border-b border-border-strong rounded-none py-3 min-h-12 outline-none transition-colors duration-150 focus:border-signal-500 focus:border-b-2";
