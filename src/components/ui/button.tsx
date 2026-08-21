import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

const variants = {
  primary: "bg-graphite-1000 text-bone-100 border-graphite-1000 hover:bg-signal-500 hover:border-signal-500 hover:text-graphite-1000",
  accent: "bg-signal-500 text-graphite-1000 border-signal-500 hover:bg-signal-600 hover:border-signal-600 hover:text-bone-100",
  outline: "bg-transparent text-strong border-border-strong hover:bg-graphite-1000 hover:border-graphite-1000 hover:text-bone-100",
  ghost: "bg-transparent text-strong border-transparent px-0! hover:text-signal-600",
  inverse: "bg-bone-100 text-graphite-1000 border-bone-100 hover:bg-signal-500 hover:border-signal-500",
  "inverse-outline": "bg-transparent text-inverse border-border-inverse hover:border-signal-500 hover:text-signal-500",
} as const;

const sizes = {
  sm: "text-eyebrow px-4 py-2.5 min-h-[38px]",
  md: "text-caption px-[22px] py-3.5 min-h-[48px]",
  lg: "text-body-sm px-[30px] py-[18px] min-h-[58px]",
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

const base =
  "group inline-flex items-center justify-center gap-3 font-mono tracking-eyebrow uppercase border rounded-none cursor-pointer no-underline transition-colors duration-150 whitespace-nowrap disabled:opacity-38 disabled:cursor-not-allowed";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  fullWidth = false,
  children,
  className = "",
  href,
  ...rest
}: ButtonAsButton | ButtonAsLink) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`;
  const arrowSpan = arrow ? (
    <span aria-hidden className="inline-block text-[1.1em] leading-none transition-transform duration-150 group-hover:translate-x-[3px]">
      →
    </span>
  ) : null;

  if (href) {
    return (
      <a href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
        {arrowSpan}
      </a>
    );
  }
  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
      {arrowSpan}
    </button>
  );
}
