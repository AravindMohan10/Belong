import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

const baseClasses =
  "relative z-10 inline-flex items-center justify-center font-hand leading-tight no-underline transition-all duration-200";

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    "text-[1.2rem] text-ink bg-paper border border-ink/15",
    "rounded-[3px_14px_11px_4px] px-5 py-2.5",
    "shadow-[0_1px_0_rgba(255,255,255,0.45)_inset,0_10px_26px_-14px_rgba(0,0,0,0.55)]",
    "-rotate-[0.5deg] hover:rotate-0 hover:-translate-y-px hover:bg-paper-warm",
    "before:pointer-events-none before:absolute before:-top-1 before:left-3.5 before:h-2.5 before:w-[34px] before:-rotate-2 before:bg-lamp/40 before:content-['']",
  ].join(" "),
  secondary: [
    "text-[1.35rem] text-lamp-soft px-1 py-2",
    "border-b border-dashed border-lamp/35",
    "hover:border-lamp/70 hover:text-lamp",
  ].join(" "),
  ghost: "px-3 py-2 text-[1.2rem] text-cream hover:text-lamp-soft",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`.trim()}
    >
      {children}
    </Link>
  );
}
