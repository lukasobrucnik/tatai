"use client";

import { useId, useState, type InputHTMLAttributes } from "react";

export function Checkbox({
  label,
  description,
  checked,
  defaultChecked,
  onChange,
  ...rest
}: {
  label: string;
  description?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  const [on, setOn] = useState(!!defaultChecked);
  const isOn = checked !== undefined ? checked : on;
  const uid = useId();
  return (
    <label htmlFor={uid} className="grid grid-cols-[18px_1fr] gap-4 items-start cursor-pointer min-h-11 py-3">
      <input
        id={uid}
        type="checkbox"
        checked={isOn}
        onChange={(e) => {
          if (checked === undefined) setOn(e.target.checked);
          onChange?.(e);
        }}
        className="absolute opacity-0 w-0 h-0"
        {...rest}
      />
      <span
        aria-hidden
        className={`w-[18px] h-[18px] mt-0.5 flex-none border grid place-items-center transition-colors duration-150 ${
          isOn ? "bg-signal-500 border-signal-500" : "bg-transparent border-border-strong"
        }`}
      >
        {isOn && <span className="w-2 h-1.5 border-l-[1.5px] border-b-[1.5px] border-graphite-1000 -rotate-45 translate-y-[-1px]" />}
      </span>
      <span className="grid gap-0.5">
        <span className="text-body-md text-strong leading-snug">{label}</span>
        {description && <span className="text-caption text-muted">{description}</span>}
      </span>
    </label>
  );
}
