"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

const tones = {
  default: "bg-transparent text-muted border-border-strong",
  solid: "bg-graphite-1000 text-inverse border-graphite-1000",
  accent: "bg-surface-accent-soft text-signal-700 border-signal-200",
  timber: "bg-surface-timber text-timber-700 border-timber-300",
  inverse: "bg-white/10 text-inverse border-border-inverse",
} as const;

export function Tag({
  children,
  tone = "default",
  size = "md",
  interactive = false,
  active = false,
  className = "",
  ...rest
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  size?: "sm" | "md";
  interactive?: boolean;
  active?: boolean;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const skin = tones[active ? "solid" : tone];
  const sizeCls = size === "sm" ? "text-eyebrow px-[9px] py-[5px]" : "text-caption px-3 py-[7px]";
  const hoverCls =
    interactive && !active
      ? "hover:border-graphite-1000 hover:text-strong"
      : "";
  const Tag = interactive ? "button" : "span";
  return (
    <Tag
      className={`inline-flex items-center gap-2 border font-mono ${sizeCls} tracking-eyebrow uppercase rounded-none transition-colors duration-150 ${interactive ? "cursor-pointer" : "cursor-default"} ${skin} ${hoverCls} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
